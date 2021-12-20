---
title: How To Generate RSS Feed For Your Sapper Website
description: How to generate an RSS feed for your sapper based website using javascript
category: Programming
excerpt: Learn how to generate an RSS feed for your Svelte/Sapper website
image: https://kudadam.sirv.com/blog/generate_rss_feed_sapper/hero.jpg
keywords:
  - rss
  - rss feed
  - sapper
date: 2021-07-18
---

<p class="intro">
  Adding an RSS feed to your website is a great way to get your readers notified when you create new blog posts.
</p>

## What is an RSS Feed?

It is simply a file which is used to publish frequently updated works. Mostly, it's used for blogs as it allows readers to be notified when new blog posts are created

## Creating an RSS For Your Sapper Based Website

After learning the importance of RSS Feeds, I decided to add one to the blog section of my website. All the user has to do is to subscribe and they will be notified when new blog posts are made.

## Creating the File

Inside the root of my blog folder `/src/routes/blog`, I created a file named `feed.js`. This is going to be the file which will return the RSS contents in XML format.

## Writing the code

First of all, you will need to install the `node-fetch` module, you can simply install it by entering `npm i node-fetch` in your terminal.
After that, we open our `feed.js` file and write the following code.
I will explain below

```js
import fetch from 'node-fetch';

const get_items = async () => {
	let res = await fetch('https://kudadam.com/blog.json?all=true');
	let posts = await res.json();
	return posts;
};

const sort_items = async () => {
	let posts = await get_items();
	let rss = ``;
	posts.forEach((post) => {
		rss += `\n
<item>
  <title>${post.title}</title>
  <link>https://www.kudadam.com/blog/${post.slug}</link>
  <description>${post.description}</description>
  <category>${post.category}</category>
  <pubDate>${post.date}</pubDate>
</item>
    \n
    `;
	});
	return rss;
};

export function get(req, res, next) {
	let rss = sort_items().then((items) => {
		let feed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Kudadam Blog</title>
      <link>https://www.kudadam.com/blog</link>
      <language>en-us</language>
      <description>Lucretius' personal blog on tech, programming and stuff</description>
       <category>Technology</category>
       <image>
          <url>https://kudadam.sirv.com/logo/logo.png</url>
          <title>Kudadam Blog logo</title>
          <link>https://www.kudadam.com/blog</link>
        </image>
      ${items}
    </channel>
  </rss>

    `;
		res.setHeader('Content-Type', 'application/xml');
		res.end(feed);
	});
}
```

So that's all the code for the RSS Feed file.

## Explaining the code

First of all, I defined an asynchronous function called `get_items`. This function performs a fetch call to `https://www.kudadam.com/blog.json?all=true` and this returns all the blog posts in a JSON format.

Then I defined another function called `sort_items` which fetches the posts using the `get_items` functions, it then iterates through the metadata of each post and creates RSS tags for each metadata and returns all the blog posts containing the RSS tags.

Then the final function is the `get` function, this function is called when a request is made to the `feed.js` file, it first calls the `sort_items` function which also internally calls the `get_items` function, then it returns all the blog posts with their RSS tags.
Then, the returned results are placed in the RSS header template and returned to the user with content type as 'xml'.
