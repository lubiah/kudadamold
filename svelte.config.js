import preprocess from "svelte-preprocess";
import adapter from '@sveltejs/adapter-node';
import { mdsvex} from "mdsvex";
import mdsvexOptions from "./mdsvex.config.js";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
        adapter: adapter()
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
