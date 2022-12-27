---
title: Designing a floating Table Of Contents With CSS and JavaScript
description: A tutorial which show how to generate a floating table of contents
category: web-development
excerpt: Design a table of contents which floats on the screen and appears on the click of a button
image: https://ik.imagekit.io/kudadam/blog/designing_a_floating_toc/open_book.jpg
keywords:
  - floating toc
  - table of contents
  - floating
date: 2021-04-18
expiry: 2023-05-20
tags:
  - css
  - javascript
---

<svelte:head>

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

</svelte:head>

Normally, when we visit some websites, we do see the table of contents at the top of the page. However, when you scroll down, it vanishes and there's no way to access it unless you scroll to the top.
We are going to learn how to create a floating table of contents that appears on the click of a button. If you were a regular visitor to this site, you will already see that a similar one existed here.
Let's get started...

In order to have a table of contents, we must first have an HTML document first. So let's start by creating our HTML document, with a normal TOC (Table of contents) which we will hardcode into the HTML.

## Creating Our HTML file

```html
<!DOCTYPE html>
<html>
	<head>
		<title>Sample Text</title>
	</head>

	<body>
		<h1>A Simple Blog Post</h1>
		<div class="toc">
			<h4>Table of Contents</h4>
			<ul>
				<li><a href="#sec-1">What is Lorem Ipsum?</a></li>
				<li><a href="#sec-2">Where does it come from?</a></li>
				<li><a href="#sec-3">Why do we use it?</a></li>
				<li><a href="#sec-1">What is Lorem Ipsum?</a></li>
				<li><a href="#sec-2">Where does it come from?</a></li>
				<li><a href="#sec-3">Why do we use it?</a></li>
				<li><a href="#sec-1">What is Lorem Ipsum?</a></li>
				<li><a href="#sec-2">Where does it come from?</a></li>
				<li><a href="#sec-3">Why do we use it?</a></li>
			</ul>
		</div>
		<main>
			<h2 id="sec-1">What is Lorem Ipsum?</h2>
			<p>
				Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
				been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
				galley of type and scrambled it to make a type specimen book.
			</p>
			<h2 id="sec-2">Where does it come from?</h2>
			<p>
				Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece
				of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock,
				a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure
				Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the
				word in classical literature, discovered the undoubtable source.
			</p>
			<h2 id="sec-3">Why do we use it?</h2>
			<p>
				It is a long established fact that a reader will be distracted by the readable content of a
				page when looking at its layout. The point of using Lorem Ipsum is that it has a
				more-or-less normal distribution of letters, as opposed to using 'Content here, content
				here', making it look like readable English.
			</p>
			<a id="toc-button"><i class="far fa-bookmark"></i></a>
		</main>
	</body>
</html>
```

Well, that's our HTML, let's forget the fact that the Table of Contents are repeated. I did that in order to make the table of contents long. Notice that, we added a class of `toc` to our Table Of Contents element. This will help us to style the TOC in our CSS file.
So now we have finished creating the HTML, let's go on to create our CSS file.

## Creating Our CSS file

Open a new CSS file and paste the following contents in.

```css
body {
	margin: 10px 50px;
}
.toc {
	margin: 15px; /*Provides space around the table of content*/
	padding: 5px;
	border: 1px solid grey; /* Adds a grey border with a size of one pixel. */
	display: inline-block; /* Makes the TOC an inline-block element to prevent it from taking the while space */
	border-radius: 5px; /* Makes the element rounded by given a 5px radius*/
}
.toc h4 {
	margin: 0px; /* Removes the margin from the TOC heading. */
	margin-bottom: 5px;
	font-size: 1.2rem;
	font-weight: bold; /* Makes the font-weight of the TOC heading bold */
	color: #5faeea;
}
.toc ul {
	margin: 0px;
	list-style: none; /* This removes the list styling which are provided by default */
	padding: 0px; /* Removes the front padding */
}
.toc ul li a {
	color: #4c74b9;
	text-decoration: none; /* Removes the underline from the link tags */
}
.toc ul li {
	padding: 2px; /* Adds a little space around each <li> tag */
}
#toc-button i {
	/* This is the table of content button toggler */
	border-radius: 50%; /* The border-radius 50% gives it a rouned shape */
	padding: 15px; /* This also provides space around the element */
	margin: 20px;
	float: right; /* This makes the button to go to the right side of the screen, you can change it to left if you want it to place your button on the left side of the screen */
	color: white;
	background-color: red; /* Gives it a red background colour */
	position: fixed; /* The position fixed allows it to remain fixed on a part of the screen. */
	bottom: 10px; /* This makes it to position itself at the very bottom of the screen. 10px from the bottom  */
	right: 10px;
}

.custom-toc {
	/* The CSS applied to our floating application */
	position: fixed;
	border: 1px solid grey;
	bottom: 10px;
	background-color: white;
	right: 200px;
}
```

These are responsible for styling our table of contents.

Then to our JavaScript file.

```javascript
function float_toc() {
	var toc_button = document.getElementById("toc-button"); //Grabs the TOC button toggler
	toc_button.addEventListener("click", function () {
		// Then a click event listener is added to the element.
		var custom_toc = document.getElementsByClassName("custom-toc")[0]; // Checks to see if the floating TOC is active
		if (custom_toc) {
			custom_toc.remove();
			// It removes it if it is activr
		} else {
			// Else, it creates a new one
			var toc = document.getElementsByClassName("toc")[0]; // Gets the contents (HTML) of the already made TOc
			var custom_toc = document.createElement("div"); // Creates a new div element
			custom_toc.innerHTML = toc.innerHTML; // Places the TOC's HTML in the new element created
			custom_toc.classList.add("custom-toc"); // Add the custom-toc class to the element
			custom_toc.classList.add("toc");
			document.getElementsByTagName("body")[0].appendChild(custom_toc); // Appends the newly created element to the body of the HTML
		}
	});
}

window.onload = float_toc(); // Fires the function after the window has finished loading
```

In our JavaScript file, we created a function called `float_toc`, it is responsible for displaying the floating table. First of all, a click event is added to the `#toc-button`. Whenever, the `#toc-button` is clicked, it checks to see if there is any element with classname `custom-toc` which is the class name of our floating table. If it checks and it exists, it removes the element from the DOM, else, it grabs the HTML of the initial table of contents and render a new floating table of contents.

On the last line, the function is fired when the window has fully loaded. However, this is not necessary, if you save the JavaScript in another file and import it into your HTML, you don't need to add the last line, just include the `script` tag before the closing `body` tag and don't forget to call the function.

## Life example of the tutorial

<p class="codepen mb-5 mt-3" data-height="350" data-theme-id="dark" data-default-tab="html,result" data-user="biah" data-slug-hash="jOypexa" data-preview="true" style="height: 350px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Floating table of contents">
  <span>See the Pen <a href="https://codepen.io/biah/pen/jOypexa">
  Floating table of contents</a> by Lucretius Biah (<a href="https://codepen.io/biah">@biah</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
