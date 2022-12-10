---
title: Python script to automatically set your computer's time
description: Learn how to make a python script which can set your computer's time correctly whenever it goes wrong
category: programming
excerpt: Setting your computer's time whenever it goes wrong can be soo boring... Fortunately, you can automate the process
keywords:
  - python
  - setting time
  - automation with python
  - python automation
tags:
  - python
  - windows
date: 2021-07-14
expiry: 2023-05-05
---

Setting your computer's time whenever something goes wrong might be tedious... Fortunately, the procedure can be automated.

When the CMOS battery inside my computer expired a few months ago, I had a problem with my computer's time. I had to set it on each boot, which was tedious, so I decided to write a Python script to automate the entire process.

## How it Works?

So, here's how the script works,
On every reboot:

- The script makes a call to an API to get the current time based on my I.P address,
  If my computer is not connected to the internet, it sleeps and check again in five minutes time :cool:
- It then sets the time using the value it got from the API

## Writing the code

So, let us develop the code that will be utilised to generate the software. Open your IDE, create a new Python file, name it whatever you want, and get ready to code.

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

So that's the program's code. Using a regular expression, we obtain the date and time. The subprocess module is then used to execute a shell command, which sets the time. If a request is made to the API and no internet connection is available, it will wait 3000 seconds (5 minutes) before making another call to the server.

When you are done, save this file with a `.pyw` extension instead of `.py`, this will prevent the application from lauching the console when it is running.
Finally, place this file inside `%appdata%/Microsoft/Windows/Start Menu/Startup`.
Restart your computer and see the magic.
