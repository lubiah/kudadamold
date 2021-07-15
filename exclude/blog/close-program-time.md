---
title: Programatically Close A Program With Python After A Certain Time
description: A post describing how you can use python to close a program after a certain time
category: Programming
image: https://kudadam.sirv.com
keywords: 
  - automation 
  - python automation
  - taskill
  - windows
  - kill application
date: 2021-07-15
---

<p class="intro">
  Today, out of boredom, I decided to make a python application that will be able to automatically close other applications at the time given to it.<br/>
  This could be a perfect idea for an application but I do not think I will make it now, maybe later...
</p>


For now, am going to name the program "App Killer". Sounds cool right? :cool:
Am going to code it in Python, am going to use Object Oriented approach since that seems cooler than functional programming

## How It Will Work

Okay, so the program is going to be multi-threaded, meaning, it's going to run on multiple threads.
The application will collect two data from the user, the program name, and it's end time. Then both will be processed and ran on a unique thread.
On each thread, a function will run to check if the time has come for a program to end,
if it has, it then kills the application. Very simple

## Coding The Application

