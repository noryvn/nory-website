import { COOKIE } from "$lib/constant";
import { NoryClient } from "$lib/nory";
import { PUBLIC_NORY_ENDPOINT } from "$env/static/public";

export const handle = async ({ event, resolve }) => {
	const { cookies, locals } = event;
	const accessToken = cookies.get(COOKIE.ACCESS_TOKEN);

	locals.noryClient = null;
	if (accessToken) {
		locals.noryClient = new NoryClient(PUBLIC_NORY_ENDPOINT, accessToken);
	}

	return resolve(event).catch((e) => console.log(e));
};
