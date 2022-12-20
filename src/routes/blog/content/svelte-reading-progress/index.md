---
title: Creating A Reading Progress Indicator In Svelte
description: A little write up about how to create a reading progress indicator for Svelte
category: personal
date: 2022-07-06
expiry: 2023-05-05
excerpt: A little write up about how to create a reading progress indicator for Svelte
keywords:
  - reading progress
  - progress indicator
  - reading progress svelte
tags:
  - svelte
---

This site has a really cool reading progress indicator at the bottom of the page, and I will show you how I made it. Though I won't go into specifics, I will give you an overview of how I produced everything.

First and foremost, I did not create the entire library. Assume I took an existing library and updated it to meet my requirements. I wanted to add a reading progress indicator to my blog posts page a few months ago. After some googling, I came upon [svelte-page-progress](https://github.com/NomanGul/svelte-page-progress) by [NomanGul](https://github.com/NomanGul). It was a really cool component with everything I needed, but there were some features I needed that weren't in the component, so I decided to fork the repo and submit a pull request.

I submitted my pull request and waited and waited, but no response, no review of the pull request, nothing! 14 months now.
So then, I decided to re-create the component in the way I wanted it to be. Besides, I added new features and made using the component easier. Let’s take a look at some of the differences between the two.

- Basic usage
  @NormanGul's version

  ```svelte
  <script>
  	import PageScroll from "svelte-page-progress";
  	import { browser } from "$app/env";
  </script>

  {#if browser}
  	<PageScroll />
  {/if}
  ```

  My version

  ```svelte
  <script>
  	import ScrollProgress from "svelte-scrollprogress";
  </script>

  <ScrollProgress />
  ```

  As you can see, mine requires minimum code to use. The reason why @NormanGul's version requires the `browser` constant is that, it tries to access the document object when creating the styles. Since the `document` is not available in the server, it will throw an error so the only solution would be to use the `browser` constant.

  I found a solution around this problem by using CSS variables, the properties are applied to the element using the [style directive](https://svelte.dev/tutorial/style-directive), then their values are then access in the CSS as variables. This method eliminated the need to use `document`.

- Event listener's

  @NormanGul's version does not emit any event listeners however, mine emits an event known as `change`. This is called whenever the value of the reading indicator changes.

- Props

  @NormanGul's version allows only two properties. Which is the `color` and `height`.

  However, mine includes `zIndex`, `background`,`position`, plus `color` and `height`.

## Conclusion

Since my version of the reading progress indicator is based on his, every code which works with this version also works with mine, except that mine allows for more customizations. For example, you can position the reading indicator on the top, bottom, left, or right side of the screen.

If you want to install it, you can simply download it from npm this way.

- pnpm
  `pnpm add -D svelte-scrollprogress`
- npm
  `npm install -D svelte-scrollprogress`
- yarn
  `yarn add -D svelte-scrollprogress`

Also, the github repository is located [here](https://github.com/kudadam/svelte-scrollprogress).
