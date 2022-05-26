---
title: Lazy-loading stylesheets with your own javascript function
description: A tutorial on how to lazy load stylesheets and javascript files
category: Programming
excerpt: Learn how to lazy load your css and JavaScript files to speed up your website
image: https://ik.imagekit.io/kudadam/blog/slow_sign_board.jpg
keywords:
  - lazy-loading
  - lazyloading stylesheets
  - slow loading
tags:
  - javascript
  - css
date: 2021-03-29
---

So you have heard of lazy loading. Let me quote from wikipedia.

> Lazy loading is a device pattern commonly used in computer programming and mostly in
> web design and development to defer initialization of an object until the point at
> which it is needed

It is simple, it means, not calling an object until it is needed. Implementing this method in web development is essential as it helps your web pages to load faster.

When ever a web page is loaded, it is loaded from top to bottom. When it encounters a script or stylesheet, it pauses and loads them before continuing to load the page.
Meaning if your script is very large, it will take time before the whole web page is loaded.
Whiles the script file is downloading, your user will be staring at a blank screen and this will make your user leave the page.

## Importance of lazy loading

There are many reasons why you should lazy load your scripts, I am going to outline a few.

- It makes your web pages load faster
- Saves bandwith as the files are only loaded when needed
- Reduces the number of HTTP requests during page load
- Reduces the chance of a visitor leaving your website

## JavaScript function to lazy load stylesheets

We are going to create a javascript function which will lazy load all our stylesheets. We are going to make our function dynamic so it will work for all situation in your website.
Let's say for example, we have three (3) stylesheets namely ["design.css, style.css, styling.css"]. When lazy loading it with our function.
We will write `lazy_load_css(['style.css', 'styling.css','design.css'])` and when lazy loading only one of them, we will write `lazy_load_css("style.css")`, Cool :cool:

Open your IDE and create a new file. Give it any name but make sure it's extension is '.js'. I am going to call my file's name 'script.js'

**NB: Our function will append the stylesheets in the head of the html not the body.**

```javascript
function lazy_load_css(path) {
	//The function responsible for lazy loading our css files
	let type_of_path = typeof path; //This refers to the type of the path. It can be string or object
	switch (type_of_path) {
		case 'object':
			var head = document.getElementsByTagName('head')[0]; //Get's the head element
			for (let i = 0; i < path.length; i++) {
				//Loops through all the paths
				var link = document.createElement('link'); //Creates a link element
				link.href = path[i]; //Assigns a path to the tag
				link.rel = 'stylesheet'; //Set it's rel to stylesheet
				link.type = 'text/css'; //Set's it's type to text/css
				head.appendChild(link); //Appends it to the head of the document.
			}
			break;
		case 'string': //If the path is a single path
			var head = document.getElementsByTagName('head')[0]; //Get the head element from the html document
			var link = document.createElement('link'); //Create the link element
			link.href = path; //Assign the value of path to the link's href
			link.rel = 'stylesheet'; //Assign 'stylesheet' to the link
			link.type = 'text/css';
			head.appendChild(link); //Appends the link to the head of the document.
			break;
	}
}
```

:relieved: We are done with our function, just 27 lines of javascript.
Now, let me explain the code in the function. We first named a function `lazy_load_css` which takes a parameter `path`.
Then to the next line, we declared a variable `type_of_path` which stores the type of the
path. Do note that, the path can be in two types, if you pass a single path to the
function, the type of the path will be "string" but if you pass an array of paths to the
function, the type of path will be object. Remember I said we are going to make our
function dynamic.
If you want to lazy load a single stylesheet, you pass only the path of the stylesheet
to the function and if you want to lazy load many stylesheets, you pass an array
containing the paths of the stylesheets to the function.

Then to the next line, we performed a switch statement on the `type_of_path` variable. Let's look at the first case, case "object". The code below will only be executed if the path is an array or an object. Meaning your array contains many paths. We then define a variable head which is the head element of the html document.
We perform a for loop on the path object iterating through it's values one by one.

In each iteration, this is what happens,

1.  We create a `<link>` element an assign it to a variable called link
2.  We then make it's rel value "stylesheet".
3.  We then set it's href to the path
4.  We then assign it's type which is text/css.
5.  Then we append the element to the head tag.

We repeat this process till we have finished looping through all the paths.
Then to the next case statement which is case "string". That is if only a single path is passed to the function.
We get the head element and assign it to a variable called head. We then create a <link> element.
We then assign the path to the `<link>`'s href.
Finally, we assign the other values and append the element to the `<head>`.

## Using the function in our HTML file

Now we have successfully created a function to lazy load our style-sheets. It's up to you to decide when you are going to use the function.
You might want to load your style-sheets when your web page has finished loading or load them when a button is clicked or ... :thinking:
It's really up to you. So now, we are going to use the function. We are going to lazy load our style-sheets when our web page has finished loading.
Let's create a simple HTML file.

```html
<!DOCTYPE html>
<head>
	<script type="text/javascript" src="script.js"></script>
</head>
<body>
	<h1>Hello World</h1>
	<div>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
			voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
			non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>
	</div>
	<script type="text/javascript">
		window.onload = function () {
			let css_paths = ['design.css', 'style.css', 'styling.css']; //The paths to the css files we want to lazy load.
			let css_path = 'design.css'; //If we want to lazy load only one stylesheet, this will be the code
			lazy_load_css(css_paths); //Initialize the function with the paths.
			/*
        If we want to lazy load only one style-sheet, this is how we would do
         it. lazy_load_css(css_path)
                OR 
        lazy_load_css("styling.css"); 
        */
		};
	</script>
</body>
```

So the code above is an example which uses the function we created. Inside our html file, we binded the lazy loading to window.onload event. Meaning, our function will only work after the html page has finished fully loading. You can choose to bind the function to any event. It's up to you.
