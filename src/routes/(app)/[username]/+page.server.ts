import { noryClient } from "$lib/nory";

export const load = async ({ params }) => {
	const { data: user } = await noryClient.getProfileByUsername(params.username);
	console.log(user);
	return { user };
};
