---
title: Programmatically Close A Program With Python After A Certain Time
description: Learn how to use Python to close a program at a certain time.
category: Programming
image: https://ik.imagekit.io/kudadam/blog/close_program_time/hero.jpg
excerpt: Making a program which automates the closing of softwares at a certain time
keywords:
  - automation
  - python automation
  - taskkill command
  - terminal
  - windows
  - kill application
date: 2021-07-15
tags:
  - python
  - terminal
---

<p class="intro">
  Today, out of boredom, I decided to make a python application that will be able to automatically close other applications at the time given to it.<br/>
  This could be a perfect idea for an application but I do not think I will make it now, maybe later...
</p>

For now, am going to name the program "App Killer". Sounds cool right? :cool:
Am going to code it in Python, am going to use Object Oriented approach since that seems cooler than functional programming to me.

## How It Will Work

Okay, so the program is going to be multi-threaded, meaning, it's going to run on multiple threads.
The application will collect two data from the user, the program name, and it's end time. Then both will be processed and ran on a unique thread.
On each thread, a function will run to check if the time has come for a program to end,
if it has, it then kills the application.
In order to kill the application, it will run the command `taskkill \IM %application_name% \F` where `%application_name%` is the name of the application which we want to close. This command will forcefully close all instances of the application when the time is due. Sounds easy, right?

## Coding The Script

```python
import time as time_module # The time module
from threading import Thread #The threading module will allow us to run the program on multiple threads
from subprocess import Popen #This allows us to execute shell commands


class AppKiller:
  """
  The code for our app
  """
  def __init__(self, name, time):
    self.name = name #The application's name
    self.time = time #The time at which it is to close

  def get_time(self):
    #This function returns the current time using the time module
    return str(time_module.strftime("%R"))

  def watch(self):
    #This is the function which does the killing of the application
    #It runs an inner function which loops every two seconds to check
    #if the current time is equal to the closing time of the application
    #it runs a shell command which takes the application's name and then
    #kills it
    def inner_function():
      while self.get_time() != self.time:
        time_module.sleep(2)
      command = Popen(["taskkill","/IM",self.name,"/F"],shell=True)
    Thread(target=inner_function).start()

"""
  Example
  =======

  brave = AppKiller("brave.exe","08:32")
  brave.watch()

  node_js = AppKiller("node.js","21:13")
  node_js.watch()
"""

```

That's the code above, it's very simple, inside the `watch` method, there is an inner function which checks if the current time is equal to the end time of an app, if it is, it then kills the application, else, it sleeps for 2 seconds and checks again.

## Using the Script

Now that we are done coding the script, it's now time to use it. The most suitable way to have run this program was by making it into a CLI tool but... let's just use it the hard-coded way.

So, to make the App Killer watch and kill an app, you pass two parameters to it's constructor, the app's executable name and the time at which it is to quit.

So for the example which I am going to be making, am going to kill two apps, Node JS and my Brave browser, NodeJS will close at `08:30 (ie. 8:30 AM)` and Brave Browser will close at `21:21 (ie. 9:21PM)`.

So in our code, we will write:

```python
brave = AppKiller("brave.exe","21:21")
brave.watch()

node_js = AppKiller("node.exe","08:30")
node_js.watch()
```

That's all that is need to initiate the simple program we created.
Now, when you look at the little snippet I wrote, you will notice that the time `21:21` comes before `08:30`. Since each instance of the `AppKiller` class runs on a different thread, the time won't be affected, that is, `brave.exe` will not close before `node.exe`, they will all close when their time is due since they all run on different threads.

Happy Coding! :smile:
