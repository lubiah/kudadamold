---
title: Simple Search Tool In HTML And JavaScript
description: Make a simple search engine using only html and client-side JavaScript, no backend needed
category: Programming
keywords:
  - javascript search tool,
  - client-side search
  - html search tool
date: 2021-09-16
tags:
  - html
  - javascript
draft: true
---

<p class="intro">
	As I was going to make a search tool for my website, I decided to document how it could be done client-side without the use of a server.
</p>

## What are we going to make?

We are going to make a simple tool which will help us to find articles on [dev.to](https://dev.to) based on the title we provide :cool:. We will use a simple lightweight javascript libary called [js-search](https://github.com/bvaughn/js-search).
For the data, we will fetch it from [dev.to](https://dev.to) using their API which will be return in a JSON format.

## Designing the HTML and CSS

So we need to write down our HTML to make our page look nice, right? Yeah.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>

  <style>
    html {
  font-family: Roboto, sans-serif
}

h1 {
  text-align:center
}

#form-box {
  margin: auto;
}

input[type="search"]{
  margin:auto;
  width:80%;
  display:block;
  padding:15px;
  font-size:20px
}


@media(max-width:600px){
  input[type="search"]{
    width:100%;
  }
}



  </style>

</head>
<body>
  <h1>Dev.to Article Finder</h1>
  <div id="form-box">
    <input type="search" placeholder="Enter the title">
  </div>
</body>
</html>

```

So the code above is the HTML and CSS which we will be using, you can include the CSS using a `style` tag in your head tag or reference it from a CSS file, either way, it will work.