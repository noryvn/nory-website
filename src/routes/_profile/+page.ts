import { noryClient } from "$lib/nory";
import { browser } from "$app/environment";

export const load = async (event) => {
	if (!browser) {
		return {};
	}
	const { data: userData } = await noryClient.getProfile();
	return { userData };
};
