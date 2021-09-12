import preprocess from "svelte-preprocess";
import { mdsvex} from "mdsvex";
import mdsvexOptions from "./mdsvex.config.js";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	},
    extensions: [".svelte",".md"],
    preprocess: [
    mdsvex(mdsvexOptions),
    preprocess({
        "postcss": true
    })
    ]
};

export default config;
