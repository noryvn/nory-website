import { noryClient } from "$lib/nory";

export const prerender = "auto"
export const load = async ({ params, setHeaders }) => {
	try {
		const { data: user } = await noryClient.getProfileByUsername(params.username);
		setHeaders({ "cache-control": "public, max-age=1800" })
		return { user };
	} catch (e) {
		if (!(e instanceof NoryError)) {
			throw e
		}
		if (e.body.code === 404) {
			throw error(404, "Class Not Found")
		}
		throw e
	}
};
