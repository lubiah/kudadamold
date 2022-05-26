---
title: Creating Python's input function in Ruby
description: A tutorial showing how to implement python's input function in Ruby. The input function is used to get user's input.
category: Programming
excerpt: Ruby is a general-purpose programming language and it's syntax is close to Python's own. One of the functions I wanted to implement was the input() function.
image: https://ik.imagekit.io/kudadam/blog/ruby_input.png
tags:
  - python
  - ruby
keywords:
  - python input
  - ruby input
  - python and ruby input
  - input function
date: 2021-04-05
---

[Ruby](https://www.ruby-lang.org/en/) is a general-purpose programming language and it's syntax is close to Python's own.
When I started learning Ruby, I was marveled at it's simplicity.
Since I was coming from a Python background. I found it very easy to learn. Because of it's similarity in syntax, I wanted some of Python's function in Ruby.
One of the functions I wanted to implement was the `input()` function. The reason was that, Ruby unlike Python, you will need to use both `puts` and `gets` if you want to get a user's input whiles displaying text in Ruby.

## Creating our function

Well, to create this function in Ruby is very simple. Just open your Ruby file and type the following code inside

```ruby
def input(prompt ='')
    puts prompt
    return gets
end
```

## Explaining the function

Well, so as we can see, the function is just four lines of code. Pretty simple huh!
The function was made to just replicate Python's own so they work in the same way.
The `input` function takes an optional parameter called prompt. On the next line, the `puts` method displays the `prompt` to stdout and then the `gets` method retrieves any user input and returns it.

## Trying out the function

In order to use the method we just created, make sure the code is in the same file as the one you are working with.

```ruby
name = input("What is your name?")
print "Hello " + name
```

In our example, we called our function with the string _"What is your name?"_ and the value was stored in the variable `name`. On the next line, we printed 'Hello' + name.

See, that wasn't hard! :smile:
