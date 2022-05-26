---
title: Another Website Redesign, But with Sapper
description: Migrating my website from HTML and PHP to Sapper, a JavaScript framework for building web apps
category: Personal
image: https://ik.imagekit.io/kudadam/blog/another_website_redesign_with_svelte/hero.jpg
excerpt: Finally, I re-designed my website with a framework called Svelte
keywords:
  - website
  - redesign
  - redesign website
date: 2021-05-13
tags:
  - svelte
  - sapper
---

I thought I had finished re-designing my website and everything was perfect, till one day, I was browsing the internet and I stumbled upon [svelte](https://svelte.dev)

On the 16th of April, I made a new re-design to my website. I made it look really cool. I was impressed with myself.
After the re-design, I resorted to using my spare time to learn [React](https://reactjs.org). It was kinda hard for me but I was trying to get the grasp of it. I really wanted to create a SPA (Single Page Application) and I realized React was just the framework to help me to accomplish that task. Well, this wasn't the first time I was learning React, I just don't get it. It kinda seems complicated (to me).

## When did I meet Svelte?

So one day, I was just browsing the internet as usual, looking for the cool stuff people are making and I found Svelte. I realized it was another SPA framework which makes it an alternative to React. So I decided to visit their website, just for exploration sake.
I started reading the homepage and honestly speaking, their homepage is captivating.
What kept me for long was that, they provided a REPL on their homepage showing how easy Svelte really was, I was able to run some simple codes even though I had not used the framework before. That was when I realized I had to delete `create-react-app` and `npm install svelte`.

## Learning the framework

Right away, I decided to try my hands on the framework, I was already having [node](https://www.nodejs.dev) and [npm](https://www.npmjs.com) so I drew up my terminal and typed `npx degit sveltejs/template trial && cd trial && npm install && npm run dev`(I name every new thing 'trial') and I was done, Svelte was running on localhost port 3000. Pretty easy huh!
Reading their docs, I was able to code a few stuff like a number counter and other stuff but I really needed to understand it deeply to unleash my creativity so I went to youtube and looked for tutorials on Svelte. Luckily, I found one from [Code Ninja's](https://www.codeninjas.com) channel on youtube. It was 35 videos and they were short also. In the tutorial, I was thought how to create a basic poll app. Halfway through the course, I already felt like I understood svelte because, trust me, it's really easy to learn.
I decided to replicate my website in Svelte just for fun. But then, I wanted some server side rending.

## Sapper, Svelte's server side renderer

Since I wanted my website to be rendered server-side, I had to opt in for Sapper, it's helps you to render your Svelte site on the server. Well, learning it wasn't that hard since it uses Svelte's syntax. I was able to create a template and I just copied and pasted my files from my svelte folder to my sapper folder and made some few adjustments and my site was now server rendered.

## Sapper Is A Dead

When I started using Sapper, I realized that it is dead. It is no longer in active development and it's new replacement is [SvelteKit](https://kit.svelte.dev). So why am I using Sapper? Well, it's because SvelteKit is still in early development and there might be some changes so am just waiting for the version 1 of SvelteKit before migrating to it.
Also, they have a migration guide which helps you to migrate from Sapper to SvelteKit so it's not a big deal. But maybe, I might switch to SvelteKit before they hit version 1, it looks promising.

## How Blog Contents are rendered

In the previous version of my website, the blog posts were stored in a database. They are initially written in markdown, then compiled to HTML, minified and then stored in a database, however, with Sapper, I decided to change the method. With this site, the contents are read directly from the markdown files and then converted on each request. Meaning, I do not need to compile to HTML after writing a blog post, I just need to store it in my blog folder and upon a request to the page, the contents will be converted to HTML before rendering it to the user. I know you are thinking this slows down the page, in fact, it does not, it happens within the twinkle of an eye.
Upon a request to a page with a URL say `http://kudadam.com/blog/getting-a-diary`, the slug is extracted from the URL (everything after https://kudadam.com/blog/**) is considered a slug. Then, all the files in the blog directory are crawled with their extension removed, then a filter function finds the right file. Snippet bellow

```js
const crawler = new fdir().glob('*.md');
const files = crawler.crawl('blog').sync();
file = files.map((file) => file.slug === slug);
```

If the slug is valid, it will then return a markdown file which will then be processed and returned in a JSON format, so actually, any blog URL plus '.json' will return the JSON form of the blog post. For example, if you visit https://www.kudadam.com/blog/gettting-a-diary.json, you will receive the JSON form of the blog post. Or, if you visit https://wwww.kudadam.com/blog.json, you will receive a JSON format of all the blog posts on the homepage.
After the URL is processed, the HTML and other important information such as title and description is appended in a JSON and returned to the page and rendered. Very Cool!

## Wrapping up...

I think Svelte is really cool and you should really try it out. It helps you to build applications blazing fast. Just head over to their [site](https://svelte.dev) and try it out.
Besides, am going to move my site to Svelte.
