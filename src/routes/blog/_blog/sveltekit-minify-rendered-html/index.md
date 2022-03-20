---
title: Minify Rendered HTML in SvelteKit
description: How to minify the HTML which svelte-kit renders
category: Programming
excerpt: Svelte-kit doesn't minify the HTML it renders, Yeah! But there is a way you can do it
keywords:
  - svelte
  - svelte-kit
  - minify svelte-kit
  - minify svelte html
date: 2021-09-22
tags:
  - sveltekit
  - svelte
image: https://lucretius.sirv.com/blog/sveltekit-minify-rendered-html/hero.jpg
---

<p class="intro">
    Svelte-kit doesn't minify the HTML it renders, Yeah!<br/>
    But there is a way you can do it
</p>


I just found out that Svelte-kit doesn't minify the HTML it renders, this feature was available in [Sapper](https://sapper.svelte.dev) but it is not available in Svelte-kit, however there is a way to do it.:sunglasses:

The way to do it is by using [hooks]() , A hook in Svelte-Kit is simply a file named `hooks.js` in your `src/` directory.

## Writing The Code :writing_hand:

First of all, we need to install the module which is going to minify the rendered HTML so open your terminal and `npm install html-minifier`, we need to install it as a dependency because, it will be needed by our server when fetch requests are made, However, if you are exporting your Svelte-Kit project using `adapter-static`, you can use `npm i -D html-minifier`

Okay in your project folder, open the file `src/hooks.js` inside your code editor and input the following code inside the file, I will explain below

```javascript
import { minify } from 'html-minifier'; //Imports the module

const minification_options = {
	collapseBooleanAttributes: true,
	collapseWhitespace: true,
	conservativeCollapse: true,
	decodeEntities: true,
	html5: true,
	ignoreCustomComments: [/^#/],
	minifyCSS: true,
	minifyJS: true,
	removeAttributeQuotes: true,
	removeComments: true,
	removeOptionalTags: true,
	removeRedundantAttributes: true,
	removeScriptTypeAttributes: true,
	removeStyleLinkTypeAttributes: true,
	sortAttributes: true,
	sortClassName: true,
	removeEmptyElements: true
};

export async function handle({ request, resolve }) {
  const response = await resolve(request);

  if (response.headers['content-type'] === 'text/html') {
    response.body = minify(response.body, minification_options); //Minifies the response.body
  }
  
  return response; //Finally, we return back the response
}
```

Okay! 

The `minification_options` object holds the various configuration you can apply to the minifier, for more explanation on each option, please visit the npmjs page [here](https://www.npmjs.com/package/html-minifier).

The handle function is an asynchronous function is available to us since we are using `hooks.js`. This function runs every time a request is made to the server, thus making it the great place to minify our HTML. According to the docs, it receives the request object and a function called resolve which invokes SvelteKit's router and generates a response.

In our handle function, we created a response using the `resolve` function and we passed the request to it as an argument. Then on the next line, we checked the response's header to see if it is of type html. This checking is important because you wouldn't want to use `html-minifier` to minify an object which is not HTML, it might generate an error for you:laughing:

Then on the next line, we accessed the `response.body` which is the HTML content and passed it to the `html-minifier` module, it then minifies the contents and assign it back to `response.body` and delivers the request back to the browser.
