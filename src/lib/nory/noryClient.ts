import QuickLRU from "quick-lru";

export interface UserStatistics {
	joinedClass: number;
	ownedClass: number;
}

export interface User {
	userId: string;
	createdAt: Date | string;

	username: string;
	name: string;
	email: string;

	userStatistics?: UserStatistics;
}

export interface Class {
	classId: string;
	ownerId: string;
	createdAt: Date | string;

	name: string;
	description: string;
}

export interface ClassTask {
	classId: string;
	taskId: string;
	authorId: string;
	createdAt: Date | string;

	authorDisplayName: string;
	name: string;
	description: string;
	dueDate: Date | string;
}

export interface ClassMember {
	classId: string;
	userId: string;

	level: string;
}

export interface ClassSchedule {
	scheduleId: string
	classId: string
	authorId: string
	createdAt: string

	name: string
	startAt: Date | string
	duration: number
	day: number
}

export interface NoryResponse<Data> {
	code: number;
	message?: string;
	data: Data;
	errors?: Record<string, string[]>;
}

export class NoryError extends Error {
	body: NoryResponse<null>;
	constructor(body: NoryResponse<null>) {
		super(body.message || "");
		this.body = body;
	}
}

export interface NoryRequestInit extends RequestInit {
	path: string;
	searchParams?: Record<string, string>
	json?: unknown;
	lru?: boolean
}

export class NoryClient {
	endpoint: string
	accessToken: string | null
	lru: QuickLRU<string, NoryResponse<any>> | null
	
	constructor(endpoint: string, accessToken: string | null, cache = false) {
		this.endpoint = endpoint
		this.accessToken = accessToken
		this.lru = null
		if (cache) {
			this.lru = new QuickLRU<string, NoryResponse<any>>({
				maxSize: 11_08,
				maxAge: 300,
			})
		}
	}

	async fetch<Data>(init: NoryRequestInit): Promise<NoryResponse<Data>> {
		init.method ||= "GET"
		if (this.lru && init.lru && init.method === "GET") {
			const body = this.lru.get(init.path)
			if (body) {
				return body
			}
		}

		const url = new URL(init.path, this.endpoint);
		if (init.searchParams) {
			for (const [k, v] of Object.entries(init.searchParams)) {
				url.searchParams.set(k, v)
			}
		}
		init.headers = new Headers(init.headers);
		if (this.accessToken) {
			init.headers.set("authorization", `Bearer ${this.accessToken}`);
		}
		if (init.json) {
			init.headers.set("content-type", "application/json");
			init.body = JSON.stringify(init.json);
		}

		const res = await fetch(url.href, init);
		if (res.status > 499) {
			const text = await res.text();
			throw new NoryError({ message: text, code: res.status });
		}
		if (res.status === 204) {
			await res.arrayBuffer();
			return { status: 204, data: null };
		}

		const body = await res.json();
		if (!res.ok) {
			throw new NoryError(body);
		}

		if (this.lru && init.lru && init.method === "GET") {
			this.lru.set(init.path, body)
		}

		return body;
	}

	invalidate(paths: string[]) {
		for (const key of paths) {
			this.lru?.delete(key)
		}
	}

	getClasses() {
		return this.fetch<Class[]>({ 
			path: "/user/class",
			lru: true,
		});
	}

	getClassByName(ownerUsername: string, name: string) {
		return this.fetch<Class>({
			path: "/class/info",
			searchParams: { ownerUsername, name },
			lru: true,
		})
	}

	getJoinedClasses() {
		return this.fetch<ClassMember[]>({ 
			path: "/user/joined",
			lru: true,
		});
	}

	createClass(c: Omit<Class, "createdAt" | "classId" | "ownerId">) {
		this.invalidate(["/user/joined", "/user/class"])
		return this.fetch<null>({
			path: "/class/create",
			method: "POST",
			json: c
		});
	}

	getProfile() {
		return this.fetch<User>({
			path:  "/user/profile",
		});
	}

	getProfileById(userId: string) {
		return this.fetch<User>({
			path:  `/user/id/${userId}/profile`,
			lru: true,
		});
	}

	getProfileByUsername(username: string) {
		return this.fetch<User>({
			path: `/user/username/${username}/profile`,
			lru: true,
		});
	}

	updateProfile(user: { username?: string; name?: string }) {
		return this.fetch<null>({
			path: "/user/profile",
			method: "PATCH",
			json: user,
		});
	}

	getClassInfo(classId: string) {
		return this.fetch<Class>({
			path: `/class/${classId}/info`,
			lru: true
		});
	}

	getClassTask(classId: string) {
		return this.fetch<ClassTask[]>({
			path: `/class/${classId}/task`,
			lru: true
		});
	}

	getClassMember(classId: string) {
		return this.fetch<ClassMember[]>({
			path: `/class/${classId}/member`,
			lru: true
		});
	}

	addClassMember(classId: string, username: string) {
		this.invalidate([`/class/${classId}/member`])
		return this.fetch<null>({
			path: `/class/${classId}/member`,
			method: "POST",
			json: { username },
		});
	}

	updateClassMember(classId: string, memberId: string, member: { level: string }) {
		this.invalidate([`/class/${classId}/member`])
		return this.fetch<null>({
			path: `/class/${classId}/member/${memberId}`,
			method: "PATCH",
			json: member,
		});
	}

	removeClassMember(classId: string, memberId: string) {
		this.invalidate([`/class/${classId}/member`])
		return this.fetch<null>({
			path: `/class/${classId}/member/${memberId}`,
			method: "DELETE",
		});
	}

	createClassTask(task: { classId: string; name: string; dueDate: Date; description: string }) {
		this.invalidate([`/class/${task.classId}/task`])
		return this.fetch<null>({
			path: `/class/${task.classId}/task`,
			method: "POST",
			json: task,
		});
	}

	deleteClassTask(classId: string, taskId: string) {
		this.invalidate([`/class/${classId}/task`])
		return this.fetch<null>({
			path: `/class/${classId}/task/${taskId}`,
			method: "DELETE",
		});
	}

	createClassSchedule(schedule: { classId: string; name: string; startAt: string; day: number; duration: number}) {
		this.invalidate([`/class/${schedule.classId}/schedule`])
		return this.fetch<null>({
			path: `/class/${schedule.classId}/schedule`,
			method: "POST",
			json: schedule,
		})
	}

	getClassSchedule(classId: string) {
		return this.fetch<ClassSchedule[]>({
			path: `/class/${classId}/schedule`,
			lru: true,
		})
	}

	deleteClassSchedule(classId: string, scheduleId: string) {
		this.invalidate([`/class/${classId}/schedule`])
		return this.fetch<null>({
			path: `/class/${classId}/schedule/${scheduleId}`,
			method: "DELETE",
		})
	}
}
