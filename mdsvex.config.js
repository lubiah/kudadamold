import { defineMDSveXConfig as defineConfig } from "mdsvex";

import remark_containers from "remark-containers";
import remark_gfm from "remark-gfm";
import remark_breaks from "remark-breaks";
import remark_slug from "remark-slug";
import remark_emoji from "remark-emoji";
import remark_attr from "remark-attr";

import external_links from "rehype-external-links";

const config = defineConfig({
	extensions: [".md"],

	smartypants: {
		dashes: "oldschool"
	},

	remarkPlugins: [
		remark_containers,
		remark_gfm,
		remark_attr,
		remark_breaks,
		remark_slug,
		[remark_emoji, { padSpaceAfter: true }]
	],

	rehypePlugins: [
		[
			external_links,
			{
				target: (element) => {
					try {
						return ["www.kudadam.com", "kudadam.com"].includes(
							new URL(element.properties.href).host
						)
							? undefined
							: "_blank";
					} catch (error) {
						return undefined;
					}
				},
				rel: "noreferrer"
			}
		]
	]
});

export default config;
