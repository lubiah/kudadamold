import { error } from '@sveltejs/kit';

/**
 * Checks if a category is valid
 * @typedef {{
 *  name: string,
 *  slug: string
 * }} categories
 * @param {string} category
 * @param {categories[]} categories
 * @returns {Boolean} boolean
 */
const match = (category, categories) => {
	let slugs = new Array();
	for (const key in categories) {
		slugs.push(categories[key].slug);
	}
	return slugs.includes(category);
};

/** @type {import("./$types").PageServerLoad} */
export const load = async ({ params }) => {
	const { category } = params;
	const categories = await (await import('../..')).getCategories();
	const valid = match(category, categories);

	if (!valid) throw error(404, `cannot find a category with the name ${category}`);

	const files = await (await import('../..')).getFiles();
	const articles = files.filter((post) => post.category === category);

	return {
		articles,
		category
	};
};
