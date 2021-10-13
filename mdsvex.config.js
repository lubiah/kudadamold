import remark_slug from 'remark-slug';
import remark_emoji from 'remark-emoji';
import remark_attr from 'remark-attr';
import remark_breaks from "remark-breaks";

import rehype_toc from 'rehype-toc';
import rehype_external_links from 'rehype-external-links'

const settings = {
	extension: '.md',
	rehypePlugins: [rehype_toc,
	[rehype_external_links,{
		target: "_blank"
	}]
	],
	remarkPlugins: [[remark_attr, { scope: 'every' }], remark_slug, remark_emoji, remark_breaks]
};

export default settings;