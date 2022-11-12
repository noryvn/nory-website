import { noryClient } from "$lib/nory";

export const load = async ({ params }) => {
	return {
		info: noryClient.getClassInfo(params.classId).then(res => res.data), 
		task: noryClient.getClassTask(params.classId).then(res => res.data), 
		member: noryClient.getClassMember(params.classId).then(res => res.data), 
		schedule: noryClient.getClassSchedule(params.classId).then(res => res.data),
	};
};
