/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
	const { slug } = params;
	const readingTimeModule = await import("$utils/reading-time").then((module) => module.default);
	const content = await import(`../content/${slug}/index.md`).then((module) => module.default);
	const html = content.render()["html"];
	const readingTime = readingTimeModule(html);
	return {
		readingTime
	};
};
