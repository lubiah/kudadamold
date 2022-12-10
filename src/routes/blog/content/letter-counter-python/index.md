---
title: How to Make a Letter Counter in Python
description: Learn how to write a simple programme that counts the number of times each letter appears in a string.
category: programming
expiry: 2023-01-01
excerpt: Learn how to write a simple programme that counts the number of times each letter appears in a string.
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
date: 2021-12-29
---

<p class="intro">
So this blog post is about a problem I discovered in Sololearn in which you must write a simple programme that takes a group of text and returns a dictionary with the occurrences of each letter.
</p>

A letter counter is simply a programme that takes a text or string and returns the number of times each letter appears. We'll write a Python function that takes a string and returns a dictionary with the number of times each letter appears.

## The code

```python
def letter_counter(text):
    dict = {}
    for i in text:
        dict[i] = text.count(i)
    return dict
```

So a function called `letter_counter` was created and it takes text as a parameter. Then inside the function, we create an empty dictionary called `dict`. Then on the next line, we iterate through all the characters in the `text` variable, we then include the current letter inside the `dict` dictionary. Then we use the `.count` method of the string class to find the number of occurrences of the current letter and assign it as the value of the letter in the dictionary. Then finally, we return the `dict` variable.

## Testing the fuction

So let's test the fuction we just created with this string "Lucretius is a great developer".

```python
text = "Lucretius is a great developer"
print(letter_counter(text))
```

```cmd
{'L': 1, 'u': 2, 'c': 1, 'r': 3, 'e': 5, 't': 2, 'i': 2, 's': 2, ' ': 4, 'a': 2, 'g': 1, 'd': 1, 'v': 1, 'l': 1, 'o': 1, 'p': 1}

[Program finished]
```

The function works fine, but there is one minor issue.
If you carefully examine the output, you will notice that the function found the number of occurrences for whitespaces, whitespaces are not letters, so let us modify our function to exclude whitespaces.

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

If you wewre to run the function, you would realise that it excludes all non-letters from the dictionary.

What we did was to import the `ascii_letters` constant from the string module, then before adding a character to the `dict` variable, we check if the current character is included in the letters constant. if it is, we add it, meaning it's a letter. Else, we exclude it.
Happy Coding :smile:
