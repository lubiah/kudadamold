import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		files: {
			hooks: {
				server: 'src/hooks/server.js'
			}
		},
		alias: {
			$components: 'src/components',
			$utils: 'src/utils'
		}
	},
	preprocess: [
		preprocess({
			postcss: true
		})
	]
};

export default config;
