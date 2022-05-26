---
title: Automatically Setting Your Computer's time with Python
description: Learn how to make a python script which can set your computer's time correctly whenever it goes wrong
category: Programming
excerpt: Setting your computer's time whenever it goes wrong can be soo boring... Fortunately, you can automate the process
image: https://ik.imagekit.io/kudadam/blog/setting_time_python/hero.jpg
keywords:
  - python
  - setting time
  - automation with python
  - python automation
tags:
  - python
  - windows
date: 2021-07-14
---

<p class="intro">
  Setting your computer's time whenever it goes wrong can be soo boring...<br/>
  Fortunately, you can automate the process
</p>

A few months ago, when the CMOS battery inside my computer died, I was having a problem with my PC's time.
I had to set it on each boot and it was very boring so I decided to make a python script to automate the whole process

## How it Works?

So, here's how the script works,
On every reboot:

- The script makes a call to an API to get the current time based on my I.P address,
  If my computer is not connected to the internet, it sleeps and check again in five minutes time :cool:
- It then sets the time using the value it got from the API

## Writing the code

So, we are going to write the code used to generate the program.
Open your IDE and create a new python file and name it whatever you want and let's start coding

```python
import requests #Module for handing the request to the API
from time import sleep #The sleep is used to make the program wait if there is no internet connection
import json #For parsing the JSON response from the server
import re # Regex for extracting the current time
from subprocess import Popen

def set_current_time():
  """Function to return the current time"""
  try:
    res = requests.get("http://worldtimeapi.org/api/ip")
    data = res.text #Gets the results from the API
    time_regex = r"\d+:\d+:\d+" #This regex is used to extract the time from the data
    datetime =  json.loads(data)['datetime']; #The datetime is extracted from the data
    date = re.search(time_regex,datetime).group() #The time is then extracted using the time regex
    Popen(['time',date],shell = True) #Executes the command and sets your computer's time
  except requests.exceptions.ConnectionError:
    #This code is executed incase there is a connection error.
    sleep(3000) #It will sleep for 5 minutes, you can change it to any value you want
    set_current_time()

set_current_time()

```

So, that's the code for the program.
We get the datetime and extract the time using a regular expression. Then we use the subprocess module to run a shell command which then set's the time.
If the request is made to the API and there is no internet connection, it will wait for 3000 seconds (5 minutes) before making another request to the server.

When you are done, save this file with a `.pyw` extension instead of `.py`, this will prevent the application from lauching the console when it is running.
Finally, place this file inside `%appdata%/Microsoft/Windows/Start Menu/Startup`.
Restart your computer and see the magic.
