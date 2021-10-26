---
title: How To Generate A Sitemap For Your SvelteKit Website
description: Learn how to generate a sitemap for your sveltekit website
image: https://kudadam.sirv.com/blog/generate-sitemap-for-sveltekit-website/hero.jpg
category: Programming
keywords:
  - rss
  - rss feed
  - sapper
  - sveltekit rss feed
  - generate rss sveltekit
  - sveltekit generate sitemap
date: 2021-10-26 06:59
---

<p class="intro">
  Generating a sitemap for your SvelteKit website is very easy. It requires no coding at all.
</p>

By default, SvelteKit has no sitemap generator at all. But there is a node module which can help you generate a `sitemap.xml` file for you website. It's called [sitemap-generator](https://github.com/lgraubner/sitemap-generator). It's a module which helps us to generate sitemaps. It is able to builld sitemaps for websites and even SPA's.

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

* Build and deploy your website. 
  I know this sounds weird but it's actually the right thing.
  The sitemap generator needs a live website in order to generate the sitemap.

* Use SSH to connect to your server and navigate to the root directory of your website.
  You need to connect to your server through SSH and navigate to the root directory in which the build folder is location. __NB:__ Not the `build` folder, but the folder in which the `build` folder resides in.

* Execute the code below

```bash
 npx sitemap-generator-cli %your_website_url% --last-mod --change-freq daily --priority-map "1.0"
```

where `%your_website_url%` is the url to your website. The arguments are self explanatory so there will be no need for me to explain them. 
This command will create a `sitemap.xml` file inside the website root folder.

* Open your browser and navigate to `%your_website_url`/sitemap.xml and the sitemap should be there.


## Conclusion

So fellas, that is how you can create a sitemap for your sveltekit website. If you faced any challenges, please leave a comment below.