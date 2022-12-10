---
title: How to remove black background from windows terminal when using  Cmder
description: A solution to fix a bug I found in Cmder which displays a black background on your Windows Terminal
category: tips-and-tricks
date: 2022-07-19
excerpt: A solution to fix a bug I found in Cmder which displays a black background on your Windows Terminal
keywords:
  - cmder
  - windows
  - windows terminal
tags:
  - windows
  - terminal
expiry: 2023-05-05
---

I recently found [Windows Terminal](https://apps.microsoft.com/store/detail/windows-terminal/9N0DX20HK701), a multi-tabbed terminal emulator for Windows. It also allows you to easily add other terminals to it. Since I was using [Cmder](https://cmder.app/), I wanted to add it to Windows Terminal and, fortunately, I found a [tutorial for that](https://medium.com/talpor/windows-terminal-cmder-%EF%B8%8F-573e6890d143).

However, after opening Cmder on Windows Terminal, I found a bug. There was a black background on the text.

![black-background-windows-terminal](https://ik.imagekit.io/kudadam/blog/black-background-windows-terminal/bug.png?tr=w-500,h-500)

screenshot of the bug :arrow_up_small:

---

After searching, I finally found a solution.

To solve this bug, follow the following steps.

1. Navigate to the root folder of your Cmder application.
   This might be "C:\Program Files\Cmder" or any directory depending on how you installed the application.
2. Then navigate to the config directory
3. Inside the directory, there is a file named "cmder_prompt_config.lua", open this file with a code editor or any text editor of your choice.
4. Make these changes to the "Prompt element colors" and replace all the 40s with 49.
   Before

```lua
-- Prompt Element Colors
uah_color = "[1;33;40m" -- Green = uah = [user]@[hostname]
cwd_color = "[1;32;40m" -- Yellow cwd = Current Working Directory
lamb_color = "[1;30;40m" -- Light Grey = Lambda Color
clean_color = "[1;37;40m"
dirty_color = "[33;3m"
conflict_color = "[31;1m"
unknown_color = "[37;1m" -- White = No VCS Status Branch Color
```

After

```lua
-- Prompt Element Colors
uah_color = "[1;33;49m" -- Green = uah = [user]@[hostname]
cwd_color = "[1;32;49m" -- Yellow cwd = Current Working Directory
lamb_color = "[1;30;49m" -- Light Grey = Lambda Color
clean_color = "[1;37;49m"
dirty_color = "[33;3m"
conflict_color = "[31;1m"
unknown_color = "[37;1m" -- White = No VCS Status Branch Color
```

5. Restart Windows Terminal and your problem should be solved.

Please share if you found it useful :smile:
