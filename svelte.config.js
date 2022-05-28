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
			default: true	
		},
		csp: {
			directives: {
				'script-src': ['self']
			}
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
