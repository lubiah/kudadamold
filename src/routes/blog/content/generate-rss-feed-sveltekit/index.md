---
title: How To Generate RSS Feed For Your Sveltekit Website
description: How to generate an RSS feed for your sapper based website using javascript
category: web-development
excerpt: Learn how to generate an RSS feed for your Svelte/Sapper website
keywords:
  - rss
  - rss feed
  - sapper
tags:
  - svelte
  - sveltekit
date: 2021-07-18
expiry: 2023-05-05
---

Adding an RSS feed to your website is an excellent way to notify readers when new blog posts are published.

## Creating an RSS for your SvelteKit-based website

After learning about the importance of RSS feeds, I decided to add one to the blog section of my website. All the user has to do is subscribe, and they will be notified when new blog posts are made.

## Creating the File

Now, you need to create the file wherever you want the RSS feed to appear. Inside my `src/routes/blog` directory, I made a folder called "feed.xml". Take note of the folder name.
Inside the folder that you created, place a `+server.js` file; this is the file that will return the contents.

## Writing the code

Paste the following code inside your `+server.js` file.

```javascript
/**
 *
 * @param {Array<any>} files
 * @returns {Promise<string>}
 */
const sort_items = async (files) => {
	let rss = ``;
	files.forEach((post) => {
		rss += `
<item>
	<title>${post.title}</title>
	<link>https://www.kudadam.com/blog/${post.slug}</link>
	<description>${encodeHtml(post.html)}</description>
	<category>${post.category}</category>
	<guid>https://www.kudadam.com/blog/${post.slug}</guid>
	<pubDate>${new Date(post.date)}</pubDate>
</item>`;
	});

	return rss;
};

/**@type {import("./$types").RequestHandler} */
export const GET = async () => {
	const files = await getFilesHtml();
	let sorted = sort_items(files);
	let rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
	<channel>
		<title>Kudadam Blog</title>
		<link>https://wwww.kudadam.com/blog</link>
		<language>en-us</language>
		<description>Lucretius' personal blog on tech, programming and stuff</description>
		<category>Technology</category>
		<image>
			<url>https://ik.imagekit.io/kudadam/assets/logo.png</url>
			<title>Kudadam Blog</title>
			<link>https://www.kudadam.com/blog</link>
		</image>
		${await sorted}
		<copyright>2021 - Now, Lucretius Biah.</copyright>
	</channel>
</rss>`;
	return new Response(rss, {
		headers: {
			"Content-Type": "application/xml"
		}
	});
};
```

## Explaining the code

The code above is the one I use for my website; I will explain how it works so you can adopt a similar approach when making your RSS feed.
So, as we all know in Sveltekit, the `GET` function handles all "get" requests to the path. First, I get a json file containing metadata for all of the blog posts. I then assign it to a constant "files." Then I pass the object from the "files" constant into a function called `sort_items`; this function takes the files and returns an RSS equivalent of them.
Finally, I create a template literal and insert the contents of the `sort_items` function. We then return a new response with its header’s content type as "application/xml."
