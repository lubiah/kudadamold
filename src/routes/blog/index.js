import { noCase } from "$utils";

/** The max number of articles per page */
export const PER_PAGE = 10;

/**
 * This function returns the files metadata
 * @returns {Promise<BlogPost[]>} - An array of files metadata
 */
export const getFiles = async () => {
	let data = import.meta.glob("./content/**/*.md", {
		import: "metadata"
	});

	let files = [];

	for (const path in data) {
		/**@type {any} */
		let current = await data[path]();
		const slug = path.split("/")[2];
		/** @type {BlogPost} */
		const metadata = { ...current, slug };
		files.push(metadata);
	}
	files.sort((a, b) => {
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});
	return files;
};

/**
 * Returns the categories
 * @typedef {{name: string, slug: string}} Category
 *
 * @returns {Promise<Category[]>}
 */
export const getCategories = async () => {
	const files = await getFiles();
	const categories = new Set();
	files.forEach((file) => {
		categories.add(file.category.toLowerCase());
	});
	const category = [...categories].map((category) => {
		return { name: noCase(category), slug: category };
	});

	return category;
};

/**
 * This function returns an array of object containing tags
 * @returns {Promise<String[]>} array containing the tags
 */
export const getTags = async () => {
	const files = await getFiles();
	/** @type {Set<string>} */
	const tags = new Set();
	files.forEach((file) => {
		file.tags.forEach((fileTag) => {
			tags.add(fileTag.toLocaleLowerCase());
		});
	});

	return [...tags];
};
