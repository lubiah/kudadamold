---
title: Save WhatsApp Status With Python on Android
description: You can save your WhatsApp statuses on your mobile phone with Python with the help of the Termux application. Termux enables you to run your python scripts on your mobile phone
category: Programming
image: https://kudadam.sirv.com/blog/whatsapp-status-saver-python-mobile/hero.jpg
keywords:
   - termux
   - termux python
   - whatsapp status saver in python
   - whatsapp python
   - whatsapp status
   - termux whatsapp python
date: 2021-10-10
---

<p class="intro">
    You actually don't need an application to save your WhatsApp statuses for you. You can make one yourself
<p>

So today, I wanted to be able to save my WhatsApp statuses without using a WhatsApp status saver app. I knew I could easily implement this with bash script but I wanted to use python so this is how I did it.


## TL;DR Version
The whole code is available as a [gist over here](t.github.com/biah/2b5f6bba5678fa688e4d5e2726cefbe6). Just clone the gist and follow the steps below. Also, don't forget to give it a star

## Installing Termux

Termux is a terminal emulator for Android that allows for running a Linux environment on an android device. This application will allow you to install Python on your mobile device in order to run the script. You can [click here to download it](https://play.google.com/store/apps/details?id=com.termux&hl=en&gl=US).

After installing the application, open the application and type in `pkg install python`.  After running this command, enter `python` on the terminal to see if a python interpreter will pop up. You should see something like the image below :arrow_down:  

<img src="https://kudadam.sirv.com/blog/whatsapp-status-saver-python-mobile/python_shell.png" height="500" alt="Python shell"/>

So if your output looks like the image above, then it means you have successfully installed Python onto your mobile device. Hurray!!! :fireworks: 

So let's move on to the next step

## Installing the WatchGod module

So, we are going to use the watchgod module to help us to know when a status has been downloaded. The watchgod module watches a directory and then reports changes that happen in the directory which it is watching. You can read more [about it here](https://pypi.org/project/watchgod/). 

This is how we are going to code our application.

1. watchgod will watch the `statuses` folder inside your WhatsApp directory.
2. Whenever you watch a new status on WhatsApp, it will be downloaded to the `statuses` folder.
3. This will trigger an event in watchgod since it is watching the directory. 
4. We then try to find the new file which has been created from the event reported by watchgod.
5. We then copy the file to another location
6. Done! :100:

To install the watchgod module, exit the python interpreter, <i>Type(<kbd>Ctrl</kbd>+<kbd>z</kbd>)</i>.

Then enter `pip install watchgod`. 

If  everything installed successfully, you are good to go. If you also receive an error that pip is not recognized, then it means python wasn't installed so try installing it again

## Writing The Code

By default, termux's current working directory is always `/data/data/com.termux/files/home`, you need to change it to your phone's home directory. You can do so by entering `cd /storage/emulated/0`. This command should take you straight to your phone's home directory.

We then need to create a folder which will house our simple app. Let's call our app "Status Saver", or :question:.We can create the folder with the command `mkdir "Status Saver"`. We then change to that directory with `cd "Status Saver"`. 

Luckily for us, termux comes with nano pre installed. nano is a text editor which we will be using to write our code.

To create a new file, enter `nano main.py` in your terminal and this should open a new empty file where we will write our code.

<img src="https://kudadam.sirv.com/blog/whatsapp-status-saver-python-mobile/nano_file.png" height="500px" alt="Nano text editor opened"/>

Now, enter the following code into the editor, I will explain below



```python
from watchgod import watch #Imports the watcher
import re # Imports python regex module for extracting data out of the event
from shutil import copy
from os import makedirs

EVENT_REGEX = r"{\(<Change\.([\w]+):\s\d>,\s'([\w\W]+)'\)}" # The regex which will extract the data
WHATSAPP_STATUSES_DIRECTORY = "/storage/emulated/0/WhatsApp/Media/.Statuses/" #The WhatsApp status directory
STATUS_SAVER_DIRECTORY = "/storage/emulated/0/DCIM/Status Saver" #Where the statuses will be saves


def main():
	for changes in watch(WHATSAPP_STATUSES_DIRECTORY):
		match = re.match(EVENT_REGEX, str(changes)) #We try to use the regex to extract the data
		event = match.group(1) # We extract the event type
		file = match.group(2) #We extract the file name
		if event == "added": #It checks if a file was added
			copy(file,STATUS_SAVER_DIRECTORY)

def create_directory_if_not_exits():
	#This function just creates the STATUS_SAVER_DIRECTORY
	try:
		makedirs(STATUS_SAVER_DIRECTORY)
	except FileExistsError:
		pass

if __name__ == "__main__":
	create_directory_if_not_exits()
	main()
```

![Code written in nano text editor](https://kudadam.sirv.com/blog/whatsapp-status-saver-python-mobile/nano_with_code.png)
This is how your code should look like in the app




## Explaining The Code

On the first four lines, we imported the modules which we will be using; the `watchgod` for directory watching,  `re` for regex, `shutil.copy` for copying files and `os.makedirs` for making folders.

The constant `EVENT_REGEX` contains the regular expression which we will use to extract data from the event. watchgod does not provide an efficient way to extract data from the events it reports so this is the best we can do, anyways, it works.

The constant  `WHATSAPP_STATUSES_DIRECTORY` directory contains the default path to the WhatsApp status directory, this is the default path on almost all android phones, you can change it if your phone's WhatsApp status folder is stored in a different location

The  `STATUS_SAVER_DIRECTORY` is a default path where your statuses will be saved. The reason why I chose to save it in `DCIM` is that, it gets to appear inside your gallery. Isn't that cool?:sunglasses:

The function `main()` is the function which does all the work. We iterate through the watch method and wait for it's event to report. We then use the regex to extract the event type and the file which was affected. Then we try to see if the event type was adding a file, modifying it or deleting it. If it adds a file, we then copy that file to your `STATUS_SAVER_DIRECTORY`. 

Someone might ask why check to see the type of event whiles we could just copy the contents of the directory into the `STATUS_SAVER_DIRECTORY`. Well, the reason is that, it will just be a waste of resources overwriting files over and over again. 

The function `create_directory_if_not_exits()` just creates the `STATUS_SAVER_DIRECTORY` directory if it does not exists.

Then finally, the `__name__ == "__main__"` condition means, if the code is being run directly, it should run the two functions. It's nothing special, just fun to add it.:laughing: 

After writing the code, Press <kbd>Ctrl</kbd>+<kbd>X</kbd> to close the editor. Remember to save the file if prompted.



## Running The Code

Inside the directory in which you created the python file, run the command `python main.py` where `main.py` is the name of the python file you just created

## Working Proof Of The App

So, after creating the code, I decided to test it on my mobile device to see if it would work and guess what, it did!!

![Working proof of the python status saver](https://kudadam.sirv.com/blog/whatsapp-status-saver-python-mobile/working_proof.gif)

Happy Coding!!! :smile:


I created a [gist](https://gist.github.com/biah/2b5f6bba5678fa688e4d5e2726cefbe6) with the code. Please do give it a star.