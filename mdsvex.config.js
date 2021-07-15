const remark_slug = require("remark-slug");
const remark_emoji = require("remark-emoji");
const remark_attr = require("remark-attr");

const rehype_toc = require("rehype-toc");

module.exports = {
	extension: ".md",
	rehypePlugins: [
		rehype_toc
	],
	remarkPlugins: [
		[remark_attr, {scope:"every"}],
		remark_slug,
		remark_emoji
		
	]
}

