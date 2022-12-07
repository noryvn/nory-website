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
	scheduleId: string;
	classId: string;
	authorId: string;
	createdAt: string;

	name: string;
	startAt: Date | string;
	duration: number;
	day: number;
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
	searchParams?: Record<string, string>;
	json?: unknown;
	lru?: boolean;
}

export class NoryClient {
	endpoint: string;
	accessToken: string | null;

	constructor(endpoint: string, accessToken: string | null) {
		this.endpoint = endpoint;
		this.accessToken = accessToken;
	}

	async fetch<Data>(init: NoryRequestInit): Promise<NoryResponse<Data>> {
		init.method ||= "GET";

		const url = new URL(init.path, this.endpoint);
		if (init.searchParams) {
			for (const [k, v] of Object.entries(init.searchParams)) {
				url.searchParams.set(k, v);
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

		return body;
	}

	getClasses() {
		return this.fetch<Class[]>({
			path: "/user/class"
		});
	}

	getClassByName(ownerUsername: string, name: string) {
		return this.fetch<Class>({
			path: "/class/info",
			searchParams: { ownerUsername, name }
		});
	}

	getJoinedClasses() {
		return this.fetch<ClassMember[]>({
			path: "/user/joined"
		});
	}

	createClass(c: Omit<Class, "createdAt" | "classId" | "ownerId">) {
		return this.fetch<null>({
			path: "/class/create",
			method: "POST",
			json: c
		});
	}

	deleteClass(classId: string) {
		return this.fetch<null>({
			path: `/class/${classId}`,
			method: "DELETE"
		});
	}

	updateClass(classInfo: Class) {
		return this.fetch<null>({
			path: `/class/${classInfo.classId}`,
			method: "PATCH",
			json: classInfo,
		})
	}

	getProfile() {
		return this.fetch<User>({
			path: "/user/profile"
		});
	}

	getProfileById(userId: string) {
		return this.fetch<User>({
			path: `/user/id/${userId}/profile`
		});
	}

	getProfileByUsername(username: string) {
		return this.fetch<User>({
			path: `/user/username/${username}/profile`
		});
	}

	updateProfile(user: { username?: string; name?: string }) {
		return this.fetch<null>({
			path: "/user/profile",
			method: "PATCH",
			json: user
		});
	}

	getClassInfo(classId: string) {
		return this.fetch<Class>({
			path: `/class/${classId}/info`,
		});
	}

	getClassTask(classId: string) {
		return this.fetch<ClassTask[]>({
			path: `/class/${classId}/task`,
		});
	}

	getClassTaskAt(classId: string, date: Date) {
		const to = new Date(date.getTime() + 86400_000)
		return this.fetch<ClassTask[]>({
			path: `/class/${classId}/task?from=${date.toISOString()}&to=${to.toISOString()}`,
		});
	}

	getClassMember(classId: string) {
		return this.fetch<ClassMember[]>({
			path: `/class/${classId}/member`,
		});
	}

	addClassMember(classId: string, username: string) {
		return this.fetch<null>({
			path: `/class/${classId}/member`,
			method: "POST",
			json: { username }
		});
	}

	updateClassMember(classId: string, memberId: string, member: { level: string }) {
		return this.fetch<null>({
			path: `/class/${classId}/member/${memberId}`,
			method: "PATCH",
			json: member
		});
	}

	removeClassMember(classId: string, memberId: string) {
		return this.fetch<null>({
			path: `/class/${classId}/member/${memberId}`,
			method: "DELETE"
		});
	}

	createClassTask(task: { classId: string; name: string; dueDate: Date; description: string }) {
		return this.fetch<null>({
			path: `/class/${task.classId}/task`,
			method: "POST",
			json: task
		});
	}

	deleteClassTask(classId: string, taskId: string) {
		return this.fetch<null>({
			path: `/class/${classId}/task/${taskId}`,
			method: "DELETE"
		});
	}

	createClassSchedule(schedule: {
		classId: string;
		name: string;
		startAt: string;
		day: number;
		duration: number;
	}) {
		return this.fetch<null>({
			path: `/class/${schedule.classId}/schedule`,
			method: "POST",
			json: schedule
		});
	}

	getClassSchedule(classId: string) {
		return this.fetch<ClassSchedule[]>({
			path: `/class/${classId}/schedule`
		});
	}

	deleteClassSchedule(classId: string, scheduleId: string) {
		return this.fetch<null>({
			path: `/class/${classId}/schedule/${scheduleId}`,
			method: "DELETE"
		});
	}
}
