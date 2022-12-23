---
title: Another Website Redesign, But with Sapper
description: Migrating my website from HTML and PHP to Sapper, a JavaScript framework for building web apps
category: personal
excerpt: Finally, I re-designed my website with a framework called Svelte
keywords:
  - website
  - redesign
  - redesign website
date: 2021-05-13
expiry: 2025-01-01
tags:
  - svelte
  - sapper
---

I believed I had finished re-designing my website and that everything was perfect until one day, when perusing the internet, I came upon [Svelte](https://svelte.dev/).

After the redesign, I resorted to learning [React](https://reactjs.org/) in my spare time. It was difficult for me, but I was attempting to understand it. I wanted to make a SPA (single-page application), and I realised React was the perfect framework to assist me. This was not my first attempt at learning React. I’m just not getting it. It appears to be difficult (to me).

## When did I meet Svelte?

So one day, I was browsing the internet, as usual, looking for the cool stuff people were making, and I found Svelte. I realised it was another SPA framework, which makes it an alternative to React. So I decided to visit their website, just for exploration's sake.
I started reading the homepage, and honestly speaking, their homepage is captivating.
What kept me for so long was that they provided a REPL on their homepage, showing how easy Svelte really was. I was able to run some simple codes even though I had never used the framework before. That was when I realised I had to delete `create-react-app` and run `npm install svelte`.

## Learning the framework

Right away, I decided to try my hands on the framework. I already had node and npm installed, so I drew up my terminal and typed `npx degit sveltejs/template trial && cd trial && npm install && npm run dev` and I was done. Svelte was running on localhost port 3000. Pretty easy, huh? 
Reading their docs, I was able to code a few things, like a number counter and other stuff, but I really needed to understand it deeply to unleash my creativity, so I went to YouTube and looked for tutorials on Svelte. Luckily, I found one from [The Net Ninja's](https://netninja.dev/) channel on YouTube. There were 35 videos, and they were short. In the tutorial, I learned how to create a basic poll app. Halfway through the course, I already felt like I understood Svelte because, trust me, it’s really easy to learn. 
I decided to replicate my website in Svelte just for fun. But then, I wanted some server-side rendering.

## Sapper, Svelte's server-side renderer

Since I wanted my website to be rendered server-side, I had to opt in for [Sapper](https://github.com/sveltejs/sapper). It helps you render your svelte site on the server. Well, learning it wasn’t that hard since it uses Svelte’s syntax. I was able to create a template, and I just copied and pasted my files from my svelte folder to my sapper folder, made a few adjustments, and my site was now server-rendered.

## Sapper is dead

When I started using Sapper, I realised that it was dead. It is no longer in active development and its new replacement is SvelteKit. So why am I using Sapper? Well, it’s because SvelteKit is still in early development and there might be some changes, so I'm just waiting for version 1 of SvelteKit before migrating to it. 
Also, they have a migration guide which helps you migrate from Sapper to SvelteKit, so it’s not a big deal. But maybe I might switch to SvelteKit before they hit version 1. It looks promising.

## How blog contents are rendered

In the previous version of my website, the blog posts were stored in a database. They are initially written in markdown, then compiled to HTML, minified, and then stored in a database. However, with Sapper, I decided to change the method. With this site, the contents are read directly from the markdown files and then converted on each request. Meaning, I do not need to compile a blog post to HTML after writing it; I just need to store it in my blog folder and, upon a request to the page, the contents will be converted to HTML before rendering it to the user. You're probably thinking that this slows down the page.In fact, it does not. It happens in the twinkle of an eye.
Upon a request to a page with a URL like [/blog/getting-a-diary](/blog/getting-a-diary), the slug is extracted from the URL (everything after https://www.kudadam.com/blog/**) is considered a slug. Then, all the files in the blog directory are crawled with their extensions removed, and a filter function finds the right file. Snippet bellow

```js
const crawler = new fdir().glob("*.md");
const files = crawler.crawl("blog").sync();
file = files.map((file) => file.slug === slug);
```

If the slug is valid, it will then return a markdown file, which will be processed and returned in JSON format, so actually, any blog URL plus ‘.json’ will return the JSON form of the blog post. For example, if you visit [/blog/gettting-a-diary.json](https://www.kudadam.com/blog/gettting-a-diary.json), you will receive the JSON form of the blog post. Or, if you visit /blog.json, you will receive a JSON format of all the blog posts on the homepage. 
After the URL is processed, the HTML and other important information, such as the title and description, are appended in JSON and returned to the page and rendered. Very cool!

## Wrapping up...

I think Svelte is fantastic, and you should give it a shot. It enables you to create applications in record time. Simply go to their website and try it out.
