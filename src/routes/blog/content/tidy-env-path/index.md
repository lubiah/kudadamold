---
title: Removing dead paths from your environment variables using Ruby
description: How to use Ruby to create a program to remove dead paths from your environment variable
category: programming
excerpt: The more you install and uninstall softwares, the more your environment get filled with dead paths. Learn how to remove them
keywords:
  - environment variables
  - env
  - enviroment paths
  - remove dead paths from environment variable
date: 2021-05-27
expiry: 2023-01-01
tags:
  - ruby
  - windows
---

The more you install and uninstall software, the more your environment path gets filled with dead paths. Just now, I was fidgeting with my environment path when I found that it was dirty. Dirty as in the sense that I found dead path links inside my environment path. So, I decided to clean it.

## What is Environment Variable

> An environment variable is a dynamic-named value that can affect the way running processes will behave on a computer. They are part of the environment in which a process runs. For example, a running process can query the value of the TEMP environment variable to discover a suitable location to store temporary files, or the HOME or USERPROFILE variable to find the directory structure owned by the user running the process

To explain further, an environment variable simple contains values which help processes to function. For example, to find the directory in which software is installed, you would refer to the `PROGRAMFILES` environmental variable which contains the path to the `Program Files` directory OR to find your operating system's temporary directory, you would refer to the `TEMP` variable which contains the path to the system's temporary directory. Environmental variables can also store other information such as your computer's username or processor type.

## The Path Environment Variable

So, the path environment variable is one of the many available environment variables, it is used by the system to locate the needed executable from the command line. So basically, when we type any command such as `dir` or `move` or `time`, the terminal will search through the paths in the environment variable path, to locate the needed executable file, if it does not find it, then it returns an error.

## How does it become _dirty?_

Whenever we install software that comes along with an executable CLI, its path is added to the environment variable path to allow you to access the executable from wherever you are, however, when you uninstall the application, the added path is not removed from your environment variable, so the installing and uninstalling of software will make it end up with a chunk of dead paths, this doesn't affect your computer at all just that, it's better to keep everything clean and prevent your system from looking through dead file paths

## Cleaning it up...

We are going to create a simple Ruby script which will iterate through all the paths in the environment path variable and remove the dead links. 
In Ruby, all your environment variables are available under a single object called ENV. 
Use the code below to see all the environment variables in Ruby.

```ruby
require "pp" #Imports the pretty-print module
pp ENV # pretty prints the env object to stdout
```

This will print the environment variables plus their values :arrow_up:
The actual code is below.

```ruby
require "win32/registry"

paths = ENV['path'] #Access the path variable and assign to the value 'paths'
paths = paths.split(";") #We split the value by ';' to get the individual paths

valid = Array.new #We create a new array in which we will store the valid paths
valid_string = "" #This will contain the strinfied form of the valid paths

paths.each do |x|
  valid.push(x) if Dir.exists? x #We iterate through the paths and append the path to the valid array if it exists
end

valid.each do |x| #We then iterate through the valid array and stringify it
  valid_string += "#{x};"
end

Win32::Registry::HKEY_CURRENT_USER.open('Environment',Win32::Registry::KEY_WRITE) do |reg| #We open the environment in the registry and assign our new value
  reg['path'] = valid_string
end
```

So, that's the code.
First of all, we imported the 'registry' module. Then we assigned the environment variable `ENV['path']` to a variable called `paths`. This returns a string.
Then we split it by ';' since all the paths in the variable are concatenated and separated by ';'. This will turn the `paths` variable into an array.
We then created a new array called `valid` (_this is the array which will hold the valid paths_).
The `valid_string` variable will also hold the stringified version of the valid array.
Then to the iteration, we iterate through each item in the `paths` array, and then we use `Dir.exists?` to check if the path exists, if it does, it is added to the valid array.
Then we iterate through the valid array and add each item + ';' to the `valid_string` variable.

In the next part, we open the registry and access the environment, we then assign our new environment variable.

**NB:** You need to restart your computer to see the changes
