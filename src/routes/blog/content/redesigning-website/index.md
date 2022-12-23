---
title: Re-designing my website
description: A blog post which shows how I re-designed my website from scratch up
category: personal
excerpt: I re-designed my website with PHP and MySql, where I stored the blog contents in a Mysql database.
keywords:
  - re-design
  - website redesign
  - website building
tags:
  - mysql
  - php
date: 2021-04-16
expiry: 2024-01-01
---

Not only do buildings require upgrades on a regular basis, but so do websites. With new colours, libraries, and whatever else you may imagine...

## Why re-design

I bought my first domain in a hurry. Because I didn't like the domain name, I opted to switch to a different one. I intended to move to the new domain in January of this year, but "school" got in the way, so I had to postpone it.

I couldn't migrate to my new domain because of the design of my old website. Besides, I was new to web development when I made my first website, so it was really awful. I was simply copying and pasting nearly everything from the internet. I didn't even know what JavaScript was, and I was terrible with CSS, so you can guess how "uglified" it was.

## The plan

WWhile in school, I designed how I wanted my website to be in my mind. I know I should have written everything, but I didn’t. That actually led to an increase in days spent on the re-design.

Features I wanted on my new website:

- Adding a search bar to my [blog](https://www.kudadam.com/blog) and [tools](https://www.kudadam.com/toolz) section.

Search bars are cool, it will helps users and readers to find what ever they want easily. You seriously don't want to frustrate your readers, do you?

- Reducing the use of JavaScript libraries

  Whiles I was reading on how to reduce page load times, I read that we must reduce the number of scripts we import in our file. Obviously, the page won't finish loading until it has loaded all the maybe large JavaScript files and your reader will be staring at a blank screen and he will surely just click the :back: button.

  So I made a drastic decrease in the number of JavaScript files I used and for the ones I decided to keep, I decided to use their minified version

- Re-writing the blog section in PHP and storing the data in a database.

  Well, I wasn't sure whether I was going to implement this or not.

- Moving away from Disqus comments

  I didn't want third parties to handle my comments section again. Well, because of privacy issues and etc.

and many more...

## Process

I started on March 25, we had vacated by then. I created a new folder and as usual, `git init`. It's very important to use git. The old website was designed in Bootstrap 4 so I decided to use [Material Design Bootstrap 5 (MDB)](https://mdbootstrap.com/) this time. I started with the homepage.

### Starting with Homepage

The homepage wasn't much work at all. Small text and plenty images (relevant) did the trick. I wasn't writing a story so I had to keep the homepage as simple as possible. You can read about the importance of adding images to your website over [here](https://www.logicdesign.co.uk/blog/4-reasons-images-important-website/). I also added animations to make it catchy. I used a JavaScript library called [typeit.js](https://typeitjs.com) for the animations.

### To the Blog...

The blog section was initially created in HTML. So I just copied the HTML pages from my old site to my new one. However, I ran into issues while redesigning the old blog pages to fit into the new blog. It was challenging to make changes to the HTML pages. Sometimes I would forget to add MDB's JavaScript file to one page and another library to another, which made things difficult for me. I had to go through all of the blog pages and double-check that everything was in order. Because there were only five pages, it didn't seem to be working for me, but I wondered, "What if it gets to 100?". It will then be impossible to add an update since I will have to modify 100 pages, and there will be errors. As a result, I chose to switch to PHP.

### Migrating Blog to PHP and MySQL

All of the blog pages had to be moved to a MySQL database. I did not do it by myself; instead, I wrote a Python script to do the work for me. It extracts the contents of the body tag, as well as the meta tag, and then commits them to the database using Beautiful Soup.

### How the blog posts are rendered

Since all the files were stored in a database, it meant that those files didn't exists physically on the server so a URL to a blog's file name will generate a 404 error. You wanna know the solution? I use [URL re-writing](https://www.smashingmagazine.com/2011/11/introduction-to-url-rewriting/).

Well, it's simple, let's say a person visits this blog post through this URL https://www.kudadam.com/blog/redesigning-my-website. Under normal circumstance, it's going to generate a 404 error because there's no folder called "redesigning-my-website" in my blog folder. With URL re-writing, we will create an .htaccess file in our server root (works only if you are using Apache). Then we will write something like this

```plaintext
RewriteEngine On
RewriteRule ^blog/([\w+-]+) index.php?title=$1
```

I know it sounds complicated but that's a little bit of [regular expressions](https://en.wikipedia.org/wiki/Regular_expression). It grabs any text after the blog word and sends everything to another PHP file called maybe `index.php` and the text which was grabbed will be sent to this file for processing.

For example, this page above will be taken to a PHP file and in the PHP file, we will write something like

```PHP
<?php
if ($_GET["title"]){
    $title = $_GET["title"];
    $article = find_article_by_title($title);
    if (!$article)
        404 error;
    else
        render_article();
}
?>
```

That's not the code I use, I just gave a rough sketch of how you might go about it.

### Moving to Markdown

Writing in HTML can be painful sometimes with all the `<`'s and the `>`'s. Markdown on the other hand, is super fast. With Markdown, you can type a whole document without lifting your hands off the keyboard. It's also easy to read so I decided to write all my blog posts in Markdown.

### Blog post transformation process (Markdown to HTML)

So as I said, the blog posts are written in Markdown, including this one, so how are they rendered in HTML?

It's simple, I modified the first python script I made to handle the blog files. I actually made it in the form of a Command Line Interface (CLI) tool.

#### Creating a new blog post...

Whenever I want to create a new blog post, I just open my terminal and type in `kudadam create blog --title "Hello World" --description "Greeting the word" --category life` All the arguments starting with "--" are optional, meaning I can create a blog post without them.

<img class="Sirv" data-src="https://ik.imagekit.io/kudadam/blog/redesigning_my_website/kudadam_cli_create.png" alt="" />

When I provide the title parameter, it checks to see if an article with the same name exists in the database, if it does, it will raise an error and will not continue to create the file. Also, if I use the command without specify a title, it raises a warning and uses a random word as file name.

#### Updating blog posts...

When ever I finish writing a blog post, I don't also manually insert them into the database. I just run `kudadam update blog %blog_directory%` then tadaa...

<img class="Sirv d-block mx-auto" data-src="https://ik.imagekit.io/kudadam/blog/redesigning_my_website/kudadam_cli_update.png?q=100%" alt="" />

It iterates over each file, then converts it's contents to HTML. It then minifies it and stores it in a database

#### Uploading live to server

When uploading the blog live to the server, I don't use this method. I just `git commit -m "Message"` and `git push` to [Github](https://www.github.com). Then [deployhq](https://www.deployhq.com/) uploads the contents to my server and runs the same command. Then the blog is updated.

## Conclusion

So, that's how I ended up re-building my blog, Feel free to tell me how you did yours in the comments section.
