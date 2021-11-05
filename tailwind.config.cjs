const colors = require("tailwindcss/colors");

const config = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				trueGray: colors.trueGray
			}
		}
	},
	plugins: []
};

module.exports = config;
