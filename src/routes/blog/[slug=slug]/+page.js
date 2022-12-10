/** @type {import('./$types').PageLoad} */
export const load = async ({ params, data }) => {
	const { slug } = params;
	const article = await import(`../content/${slug}/index.md`);
	const component = await article.default;
	const metadata = { ...article.metadata, ...data, slug };
	return {
		component,
		metadata
	};
};
