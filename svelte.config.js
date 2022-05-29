import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js'; 
import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],
	kit: {
		adapter: adapter(),
		trailingSlash: 'never',
		prerender: {
<<<<<<< HEAD
			default: true
		},
		alias: {
			$components: "src/components"
=======
			default: true	
>>>>>>> 2518255b4396641205a3287b84c08140a7712b73
		}
	},
	preprocess: [
		mdsvex(mdsvexConfig),
		preprocess({
			postcss: true
		})
	]
};

export default config;
