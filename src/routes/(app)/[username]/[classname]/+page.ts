import { noryClient} from "$lib/nory"
export const prerender = true

export const load = async ({ params }) => {
	const { data: classInfo } = await noryClient.getClassByName(params.username, params.classname)
	return { classInfo }
}