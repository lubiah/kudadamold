const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

const config = {
	plugins: [
		require("tailwindcss/nesting")(require("postcss-nesting")),
		//Some plugins, like tailwindcss/nesting, need to run before Tailwind,
		tailwindcss(),
		//But others, like autoprefixer, need to run after,
		autoprefixer,
		cssnano
	]
};

module.exports = config;
