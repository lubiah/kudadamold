import { chunk } from "$utils";

/** @type {import("./$types").PageServerLoad} */
export const load = async () => {
	const data = await (await import("./blog")).getFiles();
	const projects = (await import("./projects")).getProjets();
	/**@type {BlogPost[]} */
	const articles = chunk(data, 3)[0];

	return {
		articles,
		projects
	};
};
