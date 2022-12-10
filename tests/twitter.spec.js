import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';

const { paths } = JSON.parse(readFileSync(new URL('./urls.json', import.meta.url)).toString());

test.describe.configure({ mode: 'parallel' });
test.describe('Testing twitter meta tags on all pages', () => {
	for (const path of paths) {
		test(`Testing path '${path}'`, async ({ page }) => {
			await page.goto(path);

			const card = page.locator("meta[name='twitter:card']");
			(await card.count()) > 1
				? expect(await card.last().getAttribute('content')).toBeDefined()
				: expect(await card.getAttribute('contentw')).toBeDefined();

			const site = page.locator("meta[name='twitter:site']");
			(await site.count()) > 1
				? expect(await site.first().getAttribute('content')).toBe('@kudadam_')
				: expect(await site.getAttribute('content')).toBe('@kudadam_');

			const creator = page.locator("meta[name='twitter:creator']");
			(await site.count()) > 1
				? expect(await creator.first().getAttribute('content')).toBe('@kudadam_')
				: expect(await creator.getAttribute('content')).toBe('@kudadam_');

			expect(
				await page.locator("meta[name='twitter:description']").getAttribute('content'),
				'Must have twitter:description tag'
			).toBeDefined();
			expect(
				await page.locator("meta[name='twitter:title']").getAttribute('content'),
				'Must have twitter:title tag'
			).toBeDefined();

			const image = page.locator("meta[name='twitter:image']");
			(await image.count()) > 1
				? expect(await image.last().getAttribute('content')).toBeDefined()
				: expect(await image.getAttribute('content')).toBeDefined();

			const imageAlt = page.locator("meta[name='twitter:image:alt']");
			(await image.count()) > 1
				? expect(await imageAlt.last().getAttribute('content')).toBeDefined()
				: expect(await image.getAttribute('content')).toBeDefined();

			await page.close();
		});
	}
});
