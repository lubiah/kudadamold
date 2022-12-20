import { test, expect } from "@playwright/test";
import { readFileSync } from "fs";

const { paths } = JSON.parse(readFileSync(new URL("./urls.json", import.meta.url)).toString());

test.describe.configure({ mode: "parallel" });
test.describe("Testing basic seo", () => {
	for (const path of paths) {
		test(`Testing path '${path}'`, async ({ page }) => {
			await page.goto(path);
			await expect(page, "Title must contain the domain name Kudadam").toHaveTitle(/kudadam/i);
			expect(await page.locator("meta[name='description']").getAttribute("content")).toBeDefined();
			expect(await page.locator("link[rel='canonical']").getAttribute("href")).toBe(
				new URL(path, "https://kudadam.com").href.replace(/\/+$/, "")
			);
			expect(await page.locator("h1").count(), "Only one h1 tag must exist").toBe(1);
		});
	}
});
