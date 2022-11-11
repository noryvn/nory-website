import { noryClient } from "$lib/nory"

export async function load({ params }) {
	const { data: user } = await noryClient.getProfile();
	const { data: members } = await noryClient.getJoinedClasses();
	return { 
		user: noryClient.getProfileByUsername(params.username), 
		members,
	};
}
