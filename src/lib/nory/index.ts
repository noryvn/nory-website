import { writable, derived } from "svelte/store";
import { PUBLIC_NORY_ENDPOINT } from "$env/static/public";
import { browser } from "$app/environment";
import type { User } from "./noryClient";
import { NoryClient } from "./noryClient";
import { supabaseClient } from "../supabaseClient";

export const noryClient = new NoryClient(PUBLIC_NORY_ENDPOINT, null);
export const user = writable<User | null>(null);
export const accessToken = writable<string | null>(null);
export const loggedIn = derived(user, ($user) => $user !== null);
export const refreshUser = async () => {
	if (!noryClient.accessToken) {
		user.set(null);
		return;
	}
	const { data } = await noryClient.getProfile();
	user.set(data);
};

if (browser) {
	supabaseClient.auth.getSession().then(async ({ data, error }) => {
		const $accessToken = data.session?.access_token || null;
		if ($accessToken) {
			accessToken.set($accessToken);
		}
	});

	accessToken.subscribe(($accessToken) => {
		noryClient.accessToken = $accessToken;
		refreshUser();
	});
}

export * from "./noryClient";
