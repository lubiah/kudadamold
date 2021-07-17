import remark_slug  from "remark-slug";
import remark_emoji from "remark-emoji";
import remark_attr from "remark-attr";

import rehype_toc from "rehype-toc";

const settings = {
	extension: ".md",
	highlight: (code,lang) =>{
		console.log(code);
		return `<pre><code>${code}</code></pre>`;
	},
	rehypePlugins: [
		rehype_toc
	],
	remarkPlugins: [
		[remark_attr, {scope:"every"}],
		remark_slug,
		remark_emoji
		
	]
}

export default settings