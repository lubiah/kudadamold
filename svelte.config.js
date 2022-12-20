import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";
import { vitePreprocess } from "@sveltejs/kit/vite";
import adapter from "@sveltejs/adapter-node";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: [".svelte", ...mdsvexConfig.extensions],

	kit: {
		adapter: adapter(),
		files: {
			hooks: {
				server: "src/hooks/server.js"
			}
		},
		alias: {
			$components: "src/components",
			$utils: "src/utils"
		}
	},

	preprocess: [
		vitePreprocess({
			postcss: true
		}),
		mdsvex(mdsvexConfig)
	]
};

export default config;
