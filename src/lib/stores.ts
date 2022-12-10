import type { Writable } from "svelte/store";
import { writable } from "svelte/store";
import { browser } from "$app/environment";

export function persist<T>(key: string, defaultValue: T): Writable<T> {
	const w = writable(defaultValue);
	const stored: false | string = browser && localStorage.getItem(key);
	try {
		stored && w.set(JSON.parse(stored));
	} catch {
		localStorage.setItem(key, "");
	}
	browser &&
		w.subscribe((value) => {
			localStorage.setItem(key, JSON.stringify(value));
		});
	return w;
}
