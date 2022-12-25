---
title: Making the Python input function in Ruby
description: A Ruby tutorial for implementing Python's input function. The input function collects user input.
category: programming
excerpt: Ruby is a general-purpose programming language with a syntax similar to Python's. The input() function was one of the functions I wanted to implement.
tags:
  - python
  - ruby
keywords:
  - python input
  - ruby input
  - python and ruby input
  - input function
expiry: 2023-04-04
date: 2021-04-05
---

The syntax of the programming language [Ruby](https://www.ruby-lang.org/en/) is similar to that of [Python](https://www.python.org/).
I was impressed by Ruby’s simplicity when I initially started learning it.
I wanted several of Python’s functions in Ruby due to the similarities in syntax.
I intended to implement the `input` function.
The rationale was that, unlike Python, Ruby needs the usage of both `puts` and `gets` if you wish to gather user input while displaying text.

## Creating our function

Well, creating this function in Ruby is very simple. Just open your Ruby file and type the following code inside.

```ruby
def input(prompt ='')
    puts prompt
    return gets
end
```

## Explaining the function

As we can see, the function is only four lines of code long. Isn't it simple?
The function was designed to work in the same way as Python's.
The prompt argument is an optional parameter for the input function. On the following line, the `puts` function prints the prompt to stdout, and the `gets` method retrieves and returns any user input.

## Trying out the function

To use the method we just created, ensure the code is in the same file as the one you are working with.

```ruby
name = input("What is your name?")
print "Hello " + name
```

In our example, we used the string "What is your name?" to invoke our function, and the value was saved in the variable name. We printed 'Hello' + 'name' on the next line.
That wasn't so difficult, was it?

Happy coding :smile:
