import { noryClient, NoryError } from "$lib/nory";
import { error } from "@sveltejs/kit"

export const load = async ({ params, setHeaders }) => {
	try {
		const { data: classInfo } = await noryClient.getClassByName(params.username, params.classname);
		setHeaders({ "cache-control": "public, max-age=1800" })
		return {
			classInfo,
			schedules: noryClient.getClassSchedule(classInfo.classId).then((res) => res.data)
		};
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
