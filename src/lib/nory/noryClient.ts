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

	name: string;
	description: string;
	dueDate: Date | string;
}

export interface NoryBody<Data> {
	code: number;
	message?: string;
	data: Data;
	errors?: Record<string, string[]>;
}

export class NoryError extends Error {
	body: NoryBody<null>;
	constructor(body: NoryBody<null>) {
		super(body.message || "");
		this.body = body;
	}
}

export interface NoryRequestInit extends RequestInit {
	path: string;
	json?: unknown;
}

export class NoryClient {
	constructor(public endpoint: string, public accessToken: string | null) {}

	async fetch<Data>(init: NoryRequestInit): Promise<NoryBody<Data>> {
		const url = new URL(init.path, this.endpoint);
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
		return this.fetch<Class[]>({ path: "/user/class" });
	}

	createClass(c: Omit<Class, "createdAt" | "classId" | "ownerId">) {
		return this.fetch<null>({
			path: "/class/create",
			method: "POST",
			json: c
		});
	}

	getProfile(path = "/user/profile") {
		return this.fetch<User>({ path });
	}

	getProfileById(userId: string) {
		return this.getProfile(`/user/id/${userId}/profile`);
	}

	getProfileByUsername(username: string) {
		return this.getProfile(`/user/username/${username}/profile`);
	}

	updateProfile(user: { username?: string; name?: string }) {
		return this.fetch<null>({
			path: "/user/profile",
			method: "PATCH",
			json: user
		});
	}

	getClassInfo(classId: string) {
		return this.fetch<Class>({ path: `/class/${classId}/info` });
	}

	getClassTask(classId: string) {
		return this.fetch<Class>({ path: `/class/${classId}/task` });
	}

	createClassTask(task: { classId: string; name: string; dueDate: Date; description: string }) {
		return this.fetch<null>({
			path: `/class/${task.classId}/task`,
			method: "POST",
			json: task
		});
	}
}
