---
title: How To Generate A Sitemap For Your SvelteKit Website
description: Learn how to generate a sitemap for your sveltekit website
excerpt: Generating a sitemap for your svelte site is very easy
category: web-development
keywords:
  - sveltekit sitemap
  - generate sitemap sveltekit
  - sveltekit sitemap generator
  - generate sitemap for sveltekit
tags:
  - svelte
  - sveltekit
date: 2021-10-26 06:59
modified: 2022-10-24
expiry: 2023-05-05
---

<!-- TODO: Rewrite this article -->

Generating a sitemap for your SvelteKit website is very easy. It requires no coding at all.

By default, SvelteKit has no sitemap generator at all. But there is a node module which can help you generate a `sitemap.xml` file for you website. It's called [sitemap-generator](https://github.com/lgraubner/sitemap-generator). It's a module which helps us to generate sitemaps. It is able to builld sitemaps for websites and even SPA's.

It comes along with a CLI _(Command Line TooL)_ which makes sitemap generation easier.

## Generating Sitemap For Your Website

- Inside the root of your `src/routes` folder, create a `sitemap.xml` folder and inside the folder, create a `+server.js` file
  This is the file which will read the contents of the xml file and display it to the user

- Inside the file you created, paste the following code inside

```javascript
import fs from 'fs';

export const GET = async () => {
	const sitemap = fs.readFileSync('sitemap.xml', 'utf-8');

	return {
		headers: {
			'Content-Type': 'application/xml'
		},
		body: sitemap
	};
};
```

- Build and deploy your website.
  I know this sounds weird but it's actually the right thing.
  The sitemap generator needs a live website in order to generate the sitemap.

- Use SSH to connect to your server and navigate to the root directory of your website.
  You need to connect to your server through SSH and navigate to the root directory in which the build folder is location. **NB:** Not the `build` folder, but the folder in which the `build` folder resides in.

- Execute the code below

```bash
 npx sitemap-generator-cli %your_website_url% --last-mod --change-freq daily --priority-map "1.0"
```

where `%your_website_url%` is the url to your website. The arguments are self explanatory so there will be no need for me to explain them.
This command will create a `sitemap.xml` file inside the website root folder.

- Open your browser and navigate to `%your_website_url`/sitemap.xml and the sitemap should be there.

## Conclusion

So fellas, that is how you can create a sitemap for your sveltekit website. If you faced any challenges, please leave a comment below.
