import { redirect } from "@sveltejs/kit";
import { QUERY } from "$lib/constant";

export async function load({ locals, url }) {
	const { noryClient } = locals;
	if (!noryClient) {
		console.log("hh");
		const login = new URL("/login", url);
		login.searchParams.set(QUERY.AFTER_LOGIN, url.href);
		throw redirect(302, login.href);
	}
	const { data: user } = await noryClient.getProfile();
	const { data: members } = await noryClient.getJoinedClasses();
	return { user, members };
}
