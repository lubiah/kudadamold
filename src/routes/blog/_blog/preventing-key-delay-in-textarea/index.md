---
title: Preventing Key Delay In TextArea Using Event
description: A tutorial showing how to prevent a key delay in a textarea element when using event to listen for change
category: Programming
excerpt: When using the onkeypress event to grab text, it's always 1 character delayed. Learn how to solve that problem
image: https://ik.imagekit.io/kudadam/blog/prevent_key_delay_textarea/hero.jpg
keywords:
  - textarea events
  - textarea input
  - textarea delay
  - input delay html
date: 2021-05-16
---

Whiles working with the textarea element today, I found a problem

## The problem...

I was using the `onkeypress` event to grab the text from the textarea element but I realized that the data collected was one character delayed. I then tried the `onkeyup` and `onkeydown` but it was still one character delayed.

Initially, I thought this was a bug with my code but after a careful consideration, I realized my code was fine and the `onkeypress` event was also working correctly so why the one character delay?
![A gif showing the problem](https://ik.imagekit.io/kudadam/blog/prevent_key_delay_textarea/keydelay.gif)

## What was really happening

When ever we want to get the value of an element from an event, what we normally do is to take the `event.target.value`, this code is the code that returns the content in the element. Now when the contents are returned with `event.target.value` code, it returns everything excluding the current event, that means, excluding the current character.

We are going to run an experiment to show what is happening. In the gif below, we add a function to the textarea `onkeypress` event.

```js
const show = (e) => {
	console.log(e.target.value);
	console.log(e);
};
```

![A gif debugging the problem](https://ik.imagekit.io/kudadam/blog/prevent_key_delay_textarea/debugging.gif)
When the first character is entered, the `event.target.value` is '', this is because, the value is contained in the event object not the `event.target.value`.
This same analogy happens as we continue to type

## Solving the problem...

Now as we are seeing what is the causing the problem, we can see the solution,
to prevent the key delay, we just need to adjust our function to add `event.key` which contains the current character to `event.target.value` which also contains the 'already' text, so the function will now be like this

```js
	const get_value = (e){
		let text = e.target.value + e.key
	}
```

So, that's the solution folks.
