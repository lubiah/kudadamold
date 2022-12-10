---
title: How To Make A SvelteKit Hooks Redirect
description: Using the handle function in sveltekit hooks, we can create redirects for our application
category: web-development
date: 2022-07-11
expiry: 2022-12-28
excerpt: Using the handle function in sveltekit hooks, we can create redirects for our application
keywords:
  - redirect in sveltekit
  - sveltekit redirect
  - sveltekit hooks
  - redirect svelte
tags:
  - svelte
---

SvelteKit hooks enable us to do a lot of stuff. I'm going to write a little tutorial on how you can create a redirect for your SvelteKit app using [hooks](https://kit.svelte.dev/docs/hooks).

Recently, [I wrote an article](/blog/understanding-sveltekit-hooks) about how to use SvelteKit hooks. Today, I will demonstrate a simple example of how you can set a redirect for your app.

The objective of writing this blog post is to show how I changed the URL of my blog feed from https://www.kudadam.com/blog/feed to https://www.kudadam.com/blog/feed.xml. The URL was changed in order to make my feeds page more dynamic. Because JavaScript scripts, which do not have extensions in SvelteKit, are compiled during prerendering, the only alternative I had was to change the URL, but I still wanted to keep the old URL working because it was used by many sites that used my RSS feed.

## The Process

I am going to assume you already know how redirects work. Whenever we are making a redirect, we are normally changing the path of a URL to another URL. 
It’s like saying if someone visits A, send them to B. So in the example, I will show how we can redirect a user visiting "/blog/feed" to "/blog/feed.xml". 
First, open your `server.hooks.js` file and paste the following code inside.

```javascript
/** @type {import("@sveltejs/kit").Handle} */
export const handle = async ({ event, resolve })=>{
  if (event.url.pathname === "/blog/feed"){
​    return Response.redirect(`${event.url.origin}/blog/feed.xml`,301)
  }
  return await resolve(event);
}

```

## Explanation

First of all, we created and exported an asynchronous function called handle. This is required by Svelte as the handle function is run on every request to the server. The function receives an event object and a resolve function. If we are to access the event object, we get the current URL the user is requesting, so what we did was a simple if statement. If the user is visiting the URL we want to redirect, then do this; else, return the standard response.

Now, in the case when the if statement is true, what we do is return a [Response.redirect](https://developer.mozilla.org/en-US/docs/Web/API/Response/redirect) to the URL that we want the user to visit. The function takes two parameters, the URL and the status. The status is an optional parameter.

The reason why I used `event.url.origin` before appending the path was to use the same origin the user used to access the site. It isn't compulsory, you could just pop in the full link there and it would work without a problem.

So, fellas, that's a simple way to make a redirect in SvelteKit😃

Do ask any questions in the comment section and also share if it was helpful to you.
