---
title: How to minify rendered HTML in SvelteKit
description: Learn multiple ways in which you can minify the HTML SvelteKit generates
category: programming
excerpt: Svelte-kit doesn't minify the HTML it renders, Yeah! But there is a way you can do it
keywords:
  - svelte
  - svelte-kit
  - minify svelte-kit
  - minify svelte html
date: 2021-09-22
modified: 2022-12-02
expiry: 2022-12-31
tags:
  - sveltekit
  - svelte
---

The HTML that Sveltekit renders is not minified; this capability was available in Sapper but is not available in Sveltekit, but there is a workaround.
The method is to employ "hooks." In SvelteKit, a hook is simply a file named `hooks.server.js` or `hooks.client.js` in your `src` directory.

## Writing The Code

To begin, enter your terminal and type `npm install html-minifier` to install the module that will minify the produced HTML. We must install it as a dependency because our server will require it when fetch requests are made. However, if you're using adapter-static to export your SvelteKit project, you can run `npm install -D html-minifier`, this way, it would be installed as a developer dependency and will not be shipped with the final code.

Okay, in your project folder, open the file `src/hooks.server.js` in your code editor and paste the code below into it.

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

/**@type {import("@sveltejs/kit").Handle} */
export const handle = async ({ resolve, event }) => {
	const response = await resolve(event);

	if (response.headers.get('Content-Type') === 'text/html') {
		return new Response(minifyHtml.minify(await response.text(), minification_options), {
			status: response.status,
			headers: response.headers
		});
	}

	return response;
};
```

The `minification_options` object holds the various configurations you can apply to the minifier; for more explanation on each option, [please visit the npmjs page](https://www.npmjs.com/package/html-minifier).

The handle function is an asynchronous function that is available to us since we are using `server.hooks.js`. This function runs every time a request is made to the server, thus making it a great place to minify our HTML. According to the documentation, it receives the event object and a function called resolve, which invokes SvelteKit's router and generates a response.

In our handle function, we created a response using the `resolve` function and we passed the event object to it as an argument. Then on the next line, we checked the response's header to see if it is of type html. This checking is important because you wouldn't want to use `html-minifier` to minify an object which is not HTML, it might generate an error for you:laughing:

Then on the next line, we accessed the `response.text` which is the HTML content and passed it to the `html-minifier` module, it then minifies the contents and returns a new response with the minified code.
