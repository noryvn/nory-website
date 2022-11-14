import { noryClient } from "$lib/nory";

export const load = async ({ params, setHeaders }) => {
	const { data: classInfo } = await noryClient.getClassByName(params.username, params.classname);
	setHeaders({ "cache-control": "public, max-age=300" });
	return {
		classInfo,
		schedules: noryClient.getClassSchedule(classInfo.classId).then((res) => res.data)
	};
};
