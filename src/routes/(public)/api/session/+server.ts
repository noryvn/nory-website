import { COOKIE } from "$lib/constant";
import { dev } from "$app/environment";

export const PUT = async ({ cookies, request }) => {
	const { accessToken } = await request.json();
	if (!accessToken) {
		return new Response("empty accessToken", { status: 400 });
	}
	cookies.set(COOKIE.ACCESS_TOKEN, accessToken, {
		httpOnly: true,
		secure: !dev,
		path: "/"
	});
	return new Response("ok");
};
