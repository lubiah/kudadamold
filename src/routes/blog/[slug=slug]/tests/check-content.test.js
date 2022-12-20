import { describe, test, expect } from "vitest";
import { validateDate } from "$utils";

const CATEGORIES = ["web-development", "personal", "programming", "tips-and-tricks"];

const getFiles = () => {
	let files = import.meta.glob("/src/routes/blog/content/**/*.md", { eager: true });
	let array = [];

	for (const path in files) {
		array.push({
			path,
			// @ts-ignore
			metadata: files[path].metadata,
			// @ts-ignore
			component: files[path].default
		});
	}
	return array;
};

describe.each(getFiles())("Checking blog article - $path", ({ metadata }) => {
	test("Has a title", () => {
		expect(metadata.title).toBeDefined();
	});

	test("Has description", () => {
		expect(metadata.description).toBeDefined();
	});

	test("Has lengthy descripiton", () => {
		expect(metadata.description.split(" ").length).toBeGreaterThan(6);
	});

	test("Has required category", () => {
		expect(CATEGORIES.includes(metadata.category)).toBeTruthy();
	});

	test("Has date", () => {
		expect(metadata.date).toBeDefined();
	});

	test("Has valid date", () => {
		expect(validateDate(metadata.date)).toBeTruthy();
	});

	test("Has an excerpt", () => {
		expect(metadata.excerpt).toBeDefined();
	});

	test("Has a lengthy excerpt", () => {
		expect(metadata.excerpt.split(" ").length).toBeGreaterThanOrEqual(6);
	});

	test("Has keywords", () => {
		expect(metadata.keywords).toBeDefined();
	});

	test("Has a minimum of 3 keywords", () => {
		expect(metadata.keywords.length).toBeGreaterThanOrEqual(3);
	});

	test("Has expiry date", () => {
		expect(metadata.expiry).toBeDefined();
	});

	test("Has valid expiry date", () => {
		expect(validateDate(metadata.expiry)).toBeTruthy();
	});

	test("Article has not expired", () => {
		let today = new Date();
		expect(today < new Date(metadata.expiry)).toBeTruthy();
	});

	test("Must have at least one tag", () => {
		expect(metadata.tags.length).toBeGreaterThanOrEqual(1);
	});
});
