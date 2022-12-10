import { chunk } from '$utils';

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
	const mod = await import('./index.js');
	const total = (await mod.getFiles()).length;
	const PER_PAGE = mod.PER_PAGE;
	let articles = chunk(await mod.getFiles(), mod.PER_PAGE)[0];
	const categories = await mod.getCategories();
	const tags = await mod.getTags();

	return {
		articles,
		categories,
		tags,
		total,
		PER_PAGE
	};
};
