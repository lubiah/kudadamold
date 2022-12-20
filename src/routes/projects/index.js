// @ts-nocheck
/**
 * @returns {Promise<Project[]>}
 */
export const getProjets = async () => {
	/**@type {Project[]} */
	let project;
	const json = import.meta.glob("./projects.json", {
		as: "json"
	});
	for (const file in json) {
		await json[file]().then((data) => (project = data.default));
	}
	return project;
};
