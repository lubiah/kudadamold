---
title: Save WhatsApp Status With Python on Android
description: You can save your WhatsApp statuses on your mobile phone with Python with the help of the Termux application. Termux enables you to run your python scripts on your mobile phone
category: Programming
draft: true
keywords:
   - termux
   - termux python
   - whatsapp status saver in python
   - whatsapp python
   - whatsapp status
   - termux whatsapp python
date: 12-10-2021
draft: true
---

<p class="intro">
    You actually don't need an application to save your WhatsApp statuses for you. You can make one yourself
<p>

So today, I wanted to be able to save my WhatsApp statuses without using a WhatsApp status saver app. I knew I could easily implement this with bash script but I wanted to use python so this is how I did it.

## Installing Termux

Termux is a terminal emulator for Android that allows for running a Linux environment on an android device. This application will allow you to install Python on your mobile device in order to run the script. You can [click here to download it](https://play.google.com/store/apps/details?id=com.termux&hl=en&gl=US).

After installing the application, open the application and type in `pkg install python`.  After running this command, enter `python` on the terminal to see if a python interpreter will pop up. You should see something like the image below :arrow_down:  
