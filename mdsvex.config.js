import remark_slug from 'remark-slug';
import remark_emoji from 'remark-emoji';
import remark_attr from 'remark-attr';
import remark_breaks from "remark-breaks";

import rehype_toc from 'rehype-toc';

const settings = {
	extension: '.md',
	rehypePlugins: [rehype_toc],
	remarkPlugins: [[remark_attr, { scope: 'every' }], remark_slug, remark_emoji,remark_breaks]
};

export default settings;