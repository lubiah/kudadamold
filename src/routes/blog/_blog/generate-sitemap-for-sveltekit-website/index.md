---
title: How To Generate A Sitemap For Your SvelteKit Website
description: Learn how to generate a sitemap for your sveltekit website
category: Programming
keywords:
  - rss
  - rss feed
  - sapper
  - sveltekit rss feed
  - generate rss sveltekit
  - sveltekit generate sitemap
date: 2021-10-26 06:59
draft: true
---

<p class="intro">
  Generating a sitemap for your SvelteKit website is very easy. It requires no coding at all.
</p>

By default, SvelteKit has no sitemap generator at all. But there is an node module which can help you generate a `sitemap.xml` file for you website. It's called [sitemap-generator](https://github.com/lgraubner/sitemap-generator). It's a module which helps us to generate sitemaps. It is able to builld sitemaps for websites and even SPA's.

It comes along with a CLI _(Command Line TooL)_ which makes sitemap generation easier.

## Generating Sitemap For Your Website

* Inside the root of your `src/routes` folder, create a `sitemap.xml.js` file
This is the file which will read the contents of the xml file and display it to the user

* Inide the file you created, paste the following code inside

```javascript
import fs from 'fs';

export async function get() {
  try {
    const data = fs.readFileSync('sitemap.xml', 'utf8');

    return {
      headers: {
        'Content-Type': 'application/xml'
      },
      body: data
    };
  } catch (e) {
    return {
      body: 'Error'
    };
  }
}
```
