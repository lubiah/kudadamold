---
title: Migrating my website from Sapper to SvelteKit
description: A step by step process showing how I migrated my website from Sapper to Svelte-kit
category: Personal
keywords:
  - Migrating Sapper to SvelteKit
  - Migrating Sapper
  - design in SvelteKit
  - website in SvelteKit
  - SvelteKit website design
date: 2021-09-30
draft: true

---

<p class="intro">
    Finally, I migrated my website to SvelteKit after using Sapper for some time <br/>
    The process was not hard at all since I used their migration guide
</p>



So after using [Sapper](https://sapper.svelte.dev) for some time, I decided to move my website to [SvelteKit](https://kit.svelte.dev). I [remember saying](/blog/another-redesign-svelte) that I would not move to SvelteKit till they hit version 1 but the framework looks too promising. It had features which I needed and those features weren't in Sapper.

## Migration Process

The whole process took about an hour or two. I created a new SvelteKit project and copied the files from my Sapper website to my new SvelteKit folder whiles making the necessary changes.

Some of the changes are;

* `_layout.svelte` and `_error.svelte` were renamed to `__layout.svelte` and `__error.svelte`
* The `preload` function was changed to `load`
* `fetch` on the server now runs without using the `node-fetch` module
* `sapper:prefetch` was changed to `sveltekit:prefetch`
* Files which were stored under `src/node_modules` can now be placed in the `lib` folder and referenced like this `$lib/path/to/folder`. The `$lib` alias prevents the `../../../` nonsense.
* Oh! and regex routes are no longer supported  

So that's some of the stuff I changed, the list is more than this but I just decided to limit it to the few important ones

## Improving Page Load Time
