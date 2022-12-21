/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
	maxFailures: 5,

	fullyParallel: true,
	workers: "100%",
	webServer: {
		command: "npm run build && npm run preview",
		port: 4173
	},
	testDir: "tests"
};

export default config;
