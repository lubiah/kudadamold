/**@type {import("./$types").PageServerLoad} */
export const load = async () => {
	const projects = await (await import("./index")).getProjets();

	return {
		projects
	};
};
