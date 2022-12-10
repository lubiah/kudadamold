---
title: How I migrated my website from Sapper to SvelteKit
description: A step by step process showing how I migrated my website from Sapper to Svelte-kit
category: personal
excerpt: Finally, I migrated my website to SvelteKit after using Sapper for some time, the process was not hard at all
keywords:
  - Migrating Sapper to SvelteKit
  - Migrating Sapper
  - design in SvelteKit
  - website in SvelteKit
  - SvelteKit website design
tags:
  - sveltekit
  - sapper
  - svelte
date: 2021-09-30
expiry: 2030-09-30
---

Finally, I migrated my website to [SvelteKit]() after using [Sapper](https://sapper.svelte.dev/) for some time. The process was not hard at all since I used their migration guide.

So, after using Sapper for a while, I decided to switch to SvelteKit. I recall stating I wouldn't switch to SvelteKit until they released version 1, but the framework looks too intriguing. It featured characteristics that I required, and those features were not available in Sapper.

## Migration Process

The entire procedure took approximately an hour or so. I made a new SvelteKit project and moved the files from my Sapper website to it while making the necessary adjustments.

Some of the changes are:

- `_layout.svelte` and `_error.svelte` were renamed to `__layout.svelte` and `__error.svelte`
- The `preload` function was changed to `load`
- `fetch` on the server now runs without using the `node-fetch` module
- `sapper:prefetch` was changed to `sveltekit:prefetch`
- Files which were stored under `src/node_modules` can now be placed in the `lib` folder and referenced like this `$lib/path/to/folder`. The `$lib` alias prevents the `../../../` nonsense.
- Oh! and regex routes are no longer supported :smile:

So those are some of the changes I made. The list is longer, but I opted to focus on the most significant ones.

## Improving Page Load Time

To earn an excellent Google Page Insights score, your website must load extremely quickly. My last Sapper-created website received a 45% rating. Yes, the score is quite low. However, when I switched to SvelteKit, I received a perfect score.

![Sapper version of my website](https://ik.imagekit.io/kudadam/blog/redesign-with-sveltekit/sapper-page-insights-score.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666644367633)
<small>Sapper version of my website's score on Page insights</small>

![SvelteKit version of my website](https://ik.imagekit.io/kudadam/blog/redesign-with-sveltekit/sveltekit-page-insights-score.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666644367021)
<small>SvelteKit version of my website's score on Page insights</small>

I also made some adjustments which helped me to score 100% on Page Insights.

Here are some of the adjustments I made:

- I removed Font Awesome JavaScript file from my website.
  The reason was that the loading of that JavaScript file was increasing the page load time. What I did instead was to download SVG copies of the icons I needed and turn them into Svelte components so I could load them when I needed them.

- Adding the `loading=lazy` attribute to images
  Adding this attribute to my image elements helped to reduce the page load time. What the attribute does is that it does not load the image until the image is in view. This helps to reduce the number of requests made on page load.

- Minifying the rendered HTML
  SvelteKit has a feature called hooks. This is a JavaScript file which is run when requests are made to the server. By intercepting the results being sent back to the browser, I am able to minify the contents, thereby reducing the size of the HTML page which has to be downloaded. You can [read more about it here](https://www.kudadam.com/blog/sveltekit-minify-rendered-html).

## Adding Offline Support

SvelteKit does not come with a service-worker file like Sapper but it does provide a way for you to add a service-worker to your website. If you create a file named `service-worker.js` inside your `src/` directory, Vite will automatically register that file as a service-worker and provide you access to the service-worker module.

Inside that file, I store all the built files and the static files in a cache. The cache is named with a timestamp so that on each build, a new cache is added and the old one deleted. The service-worker also intercepts fetch requests made by the browser and caches them. This is to ensure that if the user goes offline, those files will still be available to them.

This feature is really cool because even if a user visits only the homepage of my website and the user goes offline, the user can browse through most pages of the website and read all the blog posts even if the user has not visited those pages yet:sunglasses:. Yeah! all thanks to service-workers

## Making My Website A P.W.A

So after adding a service-worker to my website, I decided to turn it into a P.W.A _(Progressive Web App)_ . The only thing which I needed to add was a `manifest.json` file to the `<head>` element of my website. Inside the `manifest.json` file, I placed the following code inside

```json
{
	"name": "Kudadam Website",
	"short_name": "Kudadam",
	"start_url": "/",
	"scope": "/",
	"description": "Lucretius' personal website",
	"display": "standalone",
	"background_color": "white",
	"theme_color": "tomato",
	"orientation": "portrait-primary",
	"icons": [
		{
			"src": "https://ik.imagekit.io/kudadam/logo/logo.png?h=72&w=72",
			"type": "image/png",
			"sizes": "72x72"
		},
		{
			"src": "https://ik.imagekit.io/kudadam/logo/logo.png?h=96&w=96",
			"type": "image/png",
			"sizes": "96x96"
		},
		{
			"src": "https://ik.imagekit.io/kudadam/logo/logo.png?h=128&w=128",
			"type": "image/png",
			"sizes": "128x128"
		},
		{
			"src": "https://ik.imagekit.io/kudadam/logo/logo.png?h=192&w=192",
			"type": "image/png",
			"sizes": "192x192"
		},
		{
			"src": "https://ik.imagekit.io/kudadam/logo/logo.png?h=144&w=144",
			"type": "image/png",
			"sizes": "144x144"
		},
		{
			"src": "https://ik.imagekit.io/kudadam/logo/logo.png?h=512&w=512",
			"type": "image/png",
			"sizes": "512x512"
		}
	],
	"shortcuts": [
		{
			"name": "Blog Posts",
			"short_name": "Blog",
			"description": "Read Lucretius' Blog Posts",
			"url": "/blog",
			"icons": [
				{
					"src": "https://ik.imagekit.io/kudadam/logo/logo_blog.png?h=512&w=512",
					"type": "image/png",
					"sizes": "512x512"
				}
			]
		},
		{
			"name": "Web Tools",
			"short_name": "Tools",
			"description": "Use the web tools on the website",
			"url": "/toolz",
			"icons": [
				{
					"src": "https://ik.imagekit.io/kudadam/logo/logo_toolz.png?h=512&w=512",
					"type": "image/png",
					"sizes": "512x512"
				}
			]
		}
	]
}
```

So the code above is what makes my website a progressive web app. If you are using the Chrome browser on your mobile device, you can install it like any other ordinary app, and you can even share the app.

## Adding a newsletter to the website

So, for the very first time in my entire life of blogging, I decided to add a newsletter to my website. I use [Sendinblue](https://www.sendinblue.com/) to store my subscribers and also, they provide an API which enables me to send emails. With sendinblue, I can store an unlimited number of contacts and can only send 300 emails per day.

Though I have never used newsletters before, I am learning much. On my website, the newsletter subscription form is placed in the footer component of the website, and it’s available on all the pages so that the user will see it and not miss it. 
If you have not already subscribed, you should really do so because I will be sending useful content to you.

## Adding Comments to Blog Posts

The first version of my website used Disqus for it's comment system but after I found out that they were injecting other scripts into my page, I decided to opt out.

At first I decided to create my own comment system then I realized it would be much work maintaining a website and a comment system so finally I decided to settle on [Utterances](https://utteranc.es), a lightweight comments widget built on Github issues. What Utterances does is that, it stores each comment as a Github issue on the repository where the website is hosted. Utterances is really cool but there are some limitations;

Some of the limitations are;

- The person commenting must have a Github account

- You can use Utterances on a private repository (repo)

- You can not nest comments

Well, those are some of the limitations of Utterances. Apart from these, the comment system is good just like the others. I use it on my website, so if you want to try it out, please comment on this blog post down below.

Fellas, that’s all there is to say about my new redesign. I'll be waiting to see your name in the subscriber’s list.
