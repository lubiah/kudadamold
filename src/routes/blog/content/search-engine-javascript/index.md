---
title: How to create a search engine in JavaScript
description: Make a simple search engine using only html and client-side JavaScript, no backend needed
image: https://ik.imagekit.io/kudadam/blog/search_tool_html_javascript/hero.jpg
excerpt: Learn how to make a simple search tool for your website in HTML and JavaScript
category: programming
keywords:
  - javascript search tool
  - client-side search
  - javascript search engine
  - search tool javascript
  - javascript search data
  - html search tool
date: 2021-09-16
expiry: 2023-06-24
tags:
  - html
  - javascript
---

I was going to make a search tool for my website, so I decided to document how it could be done client-side without the use of a server.

## What are we going to make?

We are going to make a simple tool which will help us to find articles on dev.to based on the titles we provide.  We will use a simple lightweight Javascript library called js-search. 
For the data, we will fetch it from dev.to using their API, which will be returned in JSON format.

## Designing the HTML and CSS

So we need to write down our HTML to make our page look nice, right? Yeah.

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Dev.to Article Finder</title>

		<style>
			html {
				font-family: Roboto, sans-serif;
			}

			h1 {
				text-align: center;
			}

			#form-box {
				margin: 30px auto;
			}

			input[type="search"] {
				margin: auto;
				width: 80%;
				display: block;
				padding: 15px;
				font-size: 20px;
			}

			.title {
				color: #0f6eef;
				text-align: center;
				font-weight: bold;
			}

			.title a {
				text-decoration: none;
				color: inherit;
			}

			.description {
				padding: 1px;
				color: gray;
			}

			#results {
				display: flex;
				flex-flow: wrap;
				align-content: center;
				justify-content: center;
			}

			.post {
				margin: 5px;
				width: 400px;
				border-radius: 5px;
				border: 1px solid #8888;
			}
			.post:hover {
				background: #d8d8d8;
			}

			.cover_image {
				height: 150px;
				width: 100%;
			}

			@media (max-width: 600px) {
				input[type="search"] {
					width: 100%;
				}

				.post {
					padding: 5px;
				}
			}
		</style>
	</head>
	<body>
		<h1>Dev.to Article Finder</h1>
		<div id="form-box">
			<input type="search" placeholder="Enter the title" />
		</div>
		<div id="results"></div>
	</body>
</html>
```

The code above is the HTML for our simple project.
Your HTML page should look like this.

![Preview of search tool](https://ik.imagekit.io/kudadam/blog/search-engine-javascript/preview.PNG)

## Now, to the JavaScript

Below the body tag, create a script tag and insert the following code inside

```html
<script
	src="https://cdn.jsdelivr.net/npm/js-search@2.0.0/dist/umd/js-search.min.js"
	integrity="sha256-LD9UsSATk+xTzAbk8nD2gA2bjHKvetXtCMDAFkM2K5Q="
	crossorigin="anonymous"
></script>
<script>
	const get_data = async () => {
		let data = await fetch("https://dev.to/api/articles?per_page=900");
		let json = await data.json();
		return json;
	};

	window.addEventListener("load", () => {
		const articles = get_data().then(async (data) => {
			const search = new JsSearch.Search("id");
			search.addIndex("title");
			search.addDocuments(data);

			document.querySelector("input[type='search']").addEventListener("input", (event) => {
				let value = event.target.value;
				let results = search.search(value);

				let html = "";
				results.forEach((res) => {
					let div = `
          <div class='post'>
            <p class='title'><a href="${res.url}">${res.title}</a></p>
            <p class='description'>${res.description}</p>
          </div>
          `;
					html += div;
				});
				document.querySelector("#results").innerHTML = html;
			});
		});
	});
</script>
```

So in the first script tag, we imported the `search-js` module.
Then, in the next script tag, we defined an asynchronous function called `get_data()`, this function makes a fetch request to this URL (https://dev.to/api/articles?per_page=900) and it returns a list of 900 dev.to articles in JSON format.
To the next part, we add an event listener to the load event of the page, when the event is fired, we retrieve the articles from the `get_data()` function, then we create a new [search-js](https://github.com/bvaughn/js-search) instance. The constructor of search-js requires an identifier so we use the `id` of the articles. The `search.addIndex('title')` tells search-js to search for our query in the titles only, then finally, `search.addDocuments` is used to add the articles JSON data to the search-js instance.

To the next part, we added an event listener to the input event of the search box, on every input, we run a function to get the search results, `search.search(value)` takes the user's input and tries to search for it in the JSON we provided to it earlier, it then returns a new array based on the search results.
We then iterate over each data item and create HTML elements for them. Finally, we insert the HTML elements into the HTML documents.

## Preview Of The Project

So if you followed the tutorial correctly, your page should be working and looking like the gif bellow
![Preview of the code](https://ik.imagekit.io/kudadam/blog/search-engine-javascript/preview.gif)
