---
title: Preventing Key Delay In TextArea Using Event
description: A tutorial showing how to prevent a key delay in a textarea element when using event to listen for change
category: Programming
image: https://kudadam.sirv.com/blog/prevent_key_delay_textarea/hero.jpg
keywords: textarea events, textarea input, textarea delay, input delay html
date: 2021-05-16
draft: true
---

[TOC]

Whiles working with the textarea element today, I found a problem {.intro}


## The problem...

I was using the `oninput` event to grab the text from the textarea element but I realized that the data collected was one character delayed. I then tried the `onkeypress`,`onkeyup` and `onkeydown` but it was still one character delayed.

Initially, I thought this was a bug with my code but after a careful consideration, I realized my code was fine and the `oninput` event was also working correctly so why the one character delay?
![A gif showing the problem](https://kudadam.sirv.com/blog/prevent_key_delay_textarea/keydelay.gif)

## What was really happening

When ever we want to get the value of an element from an event, what we normally do is to take the `event.target.value`, this code is what returns the current value in the element.

If we are to log the event to the console as well as the `event.target.value`, this is what we see.
