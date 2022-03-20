---
title: "JavaScript: How to check if a string is a palindrome"
description: How to check if a string is JavaScript is the same when read backwards or forward
category: Programming
image: https://lucretius.sirv.com/blog/check-palindrome-javascript/hero.jpg
excerpt: How to check if a string is the same when read either forward or backwards
keywords:
  - javascript palindrome
  - palindrome
  - what is javascript palindrome
  - palindrome with javascript
  - javascript program for palindrome
  - javascript palindrome function
  - javascript palindrome program
  - javascript palindrome checker
  - types of palindrome
date: 2022-02-20
tags:
  - javascript
---

<p class="intro">
    A palindrome is a word, number, phrase, or other sequence of characters which reads the same backward as forward
</p>

## What Is A Palindrome?

A palindrome is a word, number or a phrase which reads the same backward as forward, meaning, you can read from the last letter to the first letter and still get the same content as reading from the first letter. Examples of palindromes; dad, mom, radar, taco cat, was it a car or a cat I saw.

## Creating Our JavaScript Function

So now that we know how a Palindrome works, we will create a JavaScript function which will accept a string as argument and return `true` if the string is a Palindrome, else it will return `false`.
Also, the function accepts other parameters such `ignoreWhitespace` and `caseSensitive`.
These two other parameters are there to adjust how the function works.

### The Code

```javascript
const isPalindrome = (content, ignoreWhitespace= false, caseSensitive = false) =>{
    if (ignoreWhitespace)
        content = content.replaceAll(" ","")
    if (!caseSensitive)
        content = content.toLowerCase()

    return content.split("").reverse().join("") === content
}
```

### Explaining the code

Now the function above is self explanatory. We split the content into an array with `split("")` and then we reverse it with `reverse()`, we then convert it back to a string with `join("")`. .Let me explain the other two parameters. First of all, if the `ignoreWhitespace` parameter is set to `true`, it strips all the whitespace from your content and if the `caseSensitive` parameter is set to `false`, it converts all your content to lowercase before comparing it to its reversed form. Let's see when and where to set either of the functions to true or false.

if you are to call the function `isPalindrome("taco cat") // => false`, it will return `false`. This is because, when you reverse the two strings, you get two different contents.

```
content = taco cat
reversed = tac ocat
```

Now, you see clearly why the function returned `false`, because the two strings are not the same but if the `ignoreWhitecase` parameter is set to `true`, it removes all the whitespace from your string, then it reverses and checks to see if they are equal.

```
content = tacocat
reversed = tacocat
```

Now, let's when to use the `caseSensitive` parameter. If we are to take a look at this content "Taco Cat", you can say it's a palindrome and you can also say it's not. This is because the reversed form is not actually equal to the normal content. If `caseSensitive` is set to `true`, these are the results which we get.

```
content = Taco Cat
reversed = taC ocaT
```

As you can see, they aren't actually the same if we are to mind the case in which the text is in.

## Conclusion

So fellas, that's how to create a function which can check if a string is a palindrome in JavaScript.
:smile: