---
title: Creating A Modal Sheet Component In Svelte
description: Modal sheets are containers which contain contents and is anchored to the bottom of the screen
category: Web Development
date: 2022-04-08
excerpt: Modal sheets are containers which contain contents and is anchored to the bottom of the screen
keywords: 
  - svelte
  - sveltekit
---

<p class="intro">
    So I created a new Svelte component which allows you to embed modal sheets in your web app.
    "Modal sheets are surfaces containing supplementary content that are anchored to the bottom of the screen."
</p>

## What is a modal sheet?

This is a dialog which is used to display addition information in mobile apps. Modal sheets are really common in mobile apps, they are like ordinary web modals but stick to the bottom of the screen.

## Why did I create one?

Well the reason is simple, I wanted a component which will allow me to display information on the bottom of my site, I didn't want to use a modal so I needed to create a new component which will satisfy my needs. The component is very simple and does not contain much features. However, if you are interested in adding more features, you can submit a pull request to [my github repository](https://github.com/kudadam/svelte-sheet-modal).

If you want to install it, you type in `npm install -D svelte-sheet-modal` and you are good to go.
Here is a demo of it in action,  just click on the button below and watch the component slide out.

<button on:click={()=>{
open = !open
}}>Click me</button>

<SheetModal open={open}
on:close={()=>{open= false}}
--sheet-dialog-background="white"
--sheet-dialog-color = "black"
>
	<ul id="modal">
		<li>Share</li>
		<li>Get link</li>
		<li>Edit name</li>
		<li>Delete collection</li>
	</ul>
</SheetModal>

<script>
    import SheetModal from "svelte-sheet-modal";
    let open = false;
</script>

<style>
	#modal li {
	list-style: none
	}
</style>