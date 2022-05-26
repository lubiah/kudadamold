---
title: "Python: How To Make A Letter Counter"
description: Learn how to make a simple program which can count the number of occurrence of each letter in a string
category: Programming
excerpt: Learn how to make a simple program which can count the number of occurrence of each letter in a string
keywords:
    - letter counter
    - python letter counter
    - letter counter in python
    - python count letters and numbers in string
    - python count letter occurrences in string
    - python letter counter string
    - letter counter python sololearn
    - python count letter word
tags:
    - python
    - sololearn
image: https://ik.imagekit.io/kudadam/blog/letter-counter-python/index.jpg
date: 2021-12-29
---

<p class="intro">
So this blog post is about a problem which I found in Sololearn where you are to make a simple program that takes a group of text and then returns a dictionary showing the occurence of each letter
</p>
So a letter counter is simply a program which takes a text or string and returns the number of occurrence of each letter. We are going to make a python function which takes a string and returns a dictionary with the number of occurence of each letter

## The code

```python
def letter_counter(text):
    dict = {}
    for i in text:
        dict[i] = text.count(i)
    return dict
```

So a function called `letter_counter` was created and it takes text as parameter. Then inside the function, we create an empty dictionary called `dict`. Then on the next line, we iterate through all the characters in the `text` variable, we then include the current letter inside the `dict` dictionary. Then we use the `.count` method of the string class to find the number of occurrence of the current letter and assign it as the value of the letter in the dictionary. Then finally, we return the `dict` variable.

## Testing the fuction

So let's test the fuction we just created with this string "Lucretius is a great developer".

```python
text = "Lucretius is a great developer"
print(letter_counter(text))
```


```output
{'L': 1, 'u': 2, 'c': 1, 'r': 3, 'e': 5, 't': 2, 'i': 2, 's': 2, ' ': 4, 'a': 2, 'g': 1, 'd': 1, 'v': 1, 'l': 1, 'o': 1, 'p': 1}

[Program finished]
```

Well, the fuction works alright but there is a slight problem.
If you are to check the output carefully, you can see the fuction found the number of occurrence for whitespaces as well but whitespaces are not letters so let's modify our fuction to exclude whitespaces.

## Modified Code

```python
from string import ascii_letters
def letter_counter(text):
    dict = {}
    for i in text:
        if i in ascii_letters:
            dict[i] = text.count(i)
    return dict
```

Now if you are to run the fuction, you will realize that it excludes all non-letters from the dictionary.

What we did was to import the `ascii_letters` constant from the string module, then before adding a character to the `dict` variable, we check if the current character is included in the letters constant, if it is, we add it; meaning it's a letter, else, we exclude it.
Happy Coding :smile:
