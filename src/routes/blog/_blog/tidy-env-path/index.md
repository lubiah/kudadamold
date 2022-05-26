---
title: Tidying Up Your Environment Path With Ruby
description: How to tidy up your environment path and remove paths which are dead links using the Ruby programming language
category: Programming
excerpt: The more you install and uninstall softwares, the more your environment path gets dirty
image: https://ik.imagekit.io/kudadam/blog/tidy_env_path/hero.jpg
keywords:
  - environment variables
  - env
  - enviroment paths
date: 2021-05-27
tags:
  - ruby
  - windows
---

<p class="intro">
The more you install and uninstall softwares, the more your environment path gets <i>dirty</i>.
Just now, I was fidgeting with my environment path when I found that it was dirty, dirty as in the sense that, I found dead path links inside my environment path. So, I decided to clean it.
</p>

## What is Environment Variable

> An environment variable is a dynamic-named value that can affect the way running processes will behave on a computer. They are part of the environment in which a process runs. For example, a running process can query the value of the TEMP environment variable to discover a suitable location to store temporary files, or the HOME or USERPROFILE variable to find the directory structure owned by the user running the process

To explain further, an environment variable simple contains values which helps processes to function. For example, to find the directory in which softwares are installed, you would refer to the `PROGRAMFILES` environmental variable which contains the path to the `Program Files` directory OR to find your operating system's temporary directory, you would refer to the `TEMP` variable which contains the path to the system's temporary directory. Environmental variables can also store other information such as your computer's username or processor type.

## The Path Environment Variable

So, the path environment variable is one of the many available environment variables, it is used by the system to locate the needed executable from the command line. So basically, when we type any command such as `dir` or `move` or `time`, the terminal will search through the paths in the environment variable path, to locate the needed executable file, if it does not find it, then it returns an error.

## How does it become _dirty?_

Whenever we install a software that comes along with an executable CLI, it's path is added to the environment variable path to allow you to access the executable from wherever you are, however, when you uninstall the application, the added path is not removed from your environment variable, so the installing and uninstalling of softwares will make it end up with a chunk of dead paths, this doesn't affect your computer at all just that, it's better to keep everything clean and prevent your system from looking through dead file paths

## Cleaning it up...

We are going to create a simple ruby script which will iterate through all the paths in the environment path variable and remove the dead links.
In ruby, all your environment variables are available under a single object called `ENV`.
To see all the environment variables in ruby, use the code below.

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
Then we split it by ';' since all the paths in the variable are concatenated and separated by ';'. This will turn the `paths` variable to an array.
We then created a new array called `valid` (_this is the array which will hold the valid paths_).
The `valid_string` variable will also hold the stringified version of the valid array.
Then to the iteration, we iterate through each item in the `paths` array, then we use `Dir.exists?` to check if the path exists, if it does, it is added to the valid array.
Then we iterate through the valid array and add each item + ';' to the `valid_string` variable.

To the next part, we open then registry and access the environment, we then assign our new environment variable.

**NB:** You need to restart your computer in order to see the changes
