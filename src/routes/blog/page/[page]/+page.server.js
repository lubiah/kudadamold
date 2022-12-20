import { error, redirect } from "@sveltejs/kit";

/** @type {import("./$types").PageServerLoad} */
export const load = async ({ params }) => {
	const page = parseInt(params.page);
	const mod = await import("../../index.js");
	const chunk = (await import("$utils")).chunk;
	const files = await mod.getFiles();
	const total = files.length;
	const PER_PAGE = mod.PER_PAGE;
	const chunks = chunk(files, PER_PAGE);
	if (page === 1) throw redirect(301, "/blog");
	else if (page <= 0 || page > chunks.length || !Number.isInteger(page))
		throw error(404, `Cannot find page ${page}`);
	return {
		/**@type {BlogPost[]} */
		articles: chunks[page - 1],
		page,
		total,
		PER_PAGE
	};
};
