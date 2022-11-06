import { noryClient } from "$lib/nory";

export const load = async ({ params }) => {
	const { data: info } = await noryClient.getClassInfo(params.classId);
	const { data: task } = await noryClient.getClassTask(params.classId);
	const { data: member } = await noryClient.getClassMember(params.classId);
	return { info, task, member };
};
