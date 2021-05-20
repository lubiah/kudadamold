---
title: Setting Up Sapper Project With Cpanel And Deploying With DeployHQ
description: How to set up your sapper website with cpanel and auto deploying it with deployhq from your git repository
category: Tips and Tricks
image: https://kudadam.sirv.com/blog/setup_sapper_cpanel_and_deployhq/hero.jpg
keywords: 
  - deployhq
  - cpanel
  - sapper
date: 2021-05-20
---

[TOC]

So today, I wanted to move my website to my server. I had been using [netlify](https://netlify.com) to host my website since I was still in development mode. It was somehow tough since I did not find many tutorials on how to go about it so I decided to write down how I finally made it after my trials and errors

## Building your project

First of all, am assuming you have finished with your Sapper project and you are ready to deploy. Since I want to run my website server side, am going to use the `npm run build` command. However, if you want to deploy yours statically, you can also use the `npm run export` command. So in the directory of the project, open your terminal and run any of the two commands.
If it was able to build successfully, your output should look similar to the image below ↓
<img class="Sirv" data-src="https://kudadam.sirv.com/blog/setup_sapper_cpanel_and_deployhq/building.jpg" alt="" />
Now, we are done with step 1, let's move on to setting up our cpanel.

## Setting up on project on Cpanel

Now we have finished building our project, move on to your cpanel's homepage. It should look similar to mine. Now follow the steps below as we configure a new new nodejs app.

<img class="Sirv" data-src="https://kudadam.sirv.com/blog/setup_sapper_cpanel_and_deployhq/cpanel_homepage.jpg" alt="Homepage of Cpanel" />

* __Click on Setup Node.js App__
  In the software section of your cpanel, you will see a "Setup Node.js App". This is where we will be creating our application, after clicking on it, it should take you to another page.

* __Click on "Create Application"__
  After you are taken to a new page after clicking on "Setup Node.js App", you will see a button on your upper right hand side labelled 'Create Application'.
  <img class="Sirv" data-src="https://kudadam.sirv.com/blog/setup_sapper_cpanel_and_deployhq/create_application.jpg" alt="Create application button on Cpanel" />

* __Fill in the Form__
  After you click on the button, you will be taken to a page with a form. You are supposed to fill the mandatory portions of it.
  For mine, I chose the node version to be 14 and also, I set the application mode to production. This is very important as it will set the environment variable to production for your app.
  Then to the application root. This refers to the location of your app in your web server. For mine, I used the name of my domain for it. This will create a folder with my domain name inside my `public_html` folder.
  The next is Application URL, this simply refers to the url to which your app is accessed from, I will leave mine blank since I want it to start from the root of my domain, however you can change yours depending on the type of app you are making.
  The application start-up file refers to the file which starts your application. For Sapper, the start-up file for the build is located inside `__sapper__/build/` and named "index.js" so we will set the value to `__sapper__/build/index.js`. Now when a user visits the website, the application start up file will start up your app and serve it to your user.
  Now, we are done, for the environmental variables, the one I would recommend for you to set is PORT and it's value as 80, this will ensure that all your fetch requests and user requests will use port 80.
  Then click on  CREATE on the upper right hand side of your screen.
  When you are done, your output should be similar to mine. 
  <img class="Sirv" data-src="https://kudadam.sirv.com/blog/setup_sapper_cpanel_and_deployhq/filling_form.jpg" alt="Filling the Node app form" />

  Now, if you are to visit your application url, you will see a simple text that says 'it works'. This shows that our application is working correctly, now head over to your server's file manager and delete all the files in your application root, they are not needed.

## Deploying Project to Sever

Now we are done configuring our server, all it's left for is to upload our build files to the server. In our case, am going to opt in for auto deployment. The reason being it that, it is easier to just `git push` to [Github](https://www.github.com) which will then build and deploy to your server than manually doing it all the time, besides, it saves us time.
We are going to use a service called [deployhq](https://www.deployhq.com) which will handle the auto deployment for us.

## Creating an account on DeployHQ

Head over to their website at [deployhq.com/signup](https://www.deployhq.com/signup) and create an account.
After filling all the forms and creating your account, you will be directed to their dashboard which looks like the image below Then you click on "Create a project". 
<img src="https://kudadam.sirv.com/blog/setup_sapper_cpanel_and_deployhq/deployhq_dashboard.jpg" width="1266" height="783" alt="Dashboard of deployhq" />
