import { COOKIE } from "$lib/constant";

export const PUT = async ({ cookies, request }) => {
	const { accessToken } = await request.json();
	if (!accessToken) {
		return new Response("empty accessToken", { status: 400 });
	}
	cookies.set(COOKIE.ACCESS_TOKEN, accessToken, {
		httpOnly: true,
		maxAge: 7200,
		secure: false,
		path: "/"
	});
	return new Response("ok");
};
