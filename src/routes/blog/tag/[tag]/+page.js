import { error } from "@sveltejs/kit";

/** @type {import("./$types").PageLoad} */
export const load = async ({ params }) => {
	const { tag } = params;
	const tags = await (await import("../../")).getTags();
	const valid = tags.includes(tag);

	if (!valid) throw error(404, `cannot find a tag with the name ${tag}`);

	const files = await (await import("../../")).getFiles();
	const articles = files.filter((post) => post.tags.includes(tag));

	return {
		articles,
		tag
	};
};
