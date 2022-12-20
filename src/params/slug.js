/** @type {import('@sveltejs/kit').ParamMatcher} */
export const match = (params) => {
	const data = import.meta.glob("../routes/blog/content/**/*.md", {
		import: "metadata"
	});
	let paths = new Array();
	for (const path in data) {
		let slugMatch = /\.\.\/routes\/blog\/content\/([a-z0-9]+(?:-[a-z0-9]+)*)\/index.md/i.exec(path);
		paths.push(slugMatch ? slugMatch[1] : undefined);
	}
	return paths.find((path) => path === params);
};
