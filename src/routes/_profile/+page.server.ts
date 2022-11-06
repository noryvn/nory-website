import { noryClient } from "$lib/nory";
import { COOKIE } from "$lib/constant";

export const load = async (event) => {
	const userId = event.cookies.get(COOKIE.USER_ID);
	if (!userId) {
		return {};
	}
	const { data: userData } = await noryClient.getProfileById(userId);
	return { userData };
};
