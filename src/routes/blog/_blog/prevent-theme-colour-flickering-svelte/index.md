---
title: How To Prevent Theme Colour From Flickering in Svelte Or SvelteKit
description: Learn how to prevent your theme colours from flickering when your page loads in your Svelte or SvelteKit website
category: Programming
keywords:
  - sveltekit flickering css
  - svelte flickering
  - svelte colour flickering
  - svelte css
  - sveltekit css
  - css flickering
date: 2021-10-15	
---

<p class="intro">
	Ever since I started using Svelte, my theme colours has always been flickering on page load. Finally I found a workaround
</p>

At first, I was changing my website's theme colour inside the `onMount` function but the theme colours were always flickering. The reason was that, the body loads before the `onMount` function sets the theme colour.
Here's a gif showing the problem
