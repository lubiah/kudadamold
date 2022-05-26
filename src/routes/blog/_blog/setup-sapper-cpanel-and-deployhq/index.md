---
title: Setting Up Sapper Project With Cpanel And Deploying With DeployHQ
description: How to set up your sapper website with cpanel and auto deploying it with deployhq from your git repository
category: Tips and Tricks
image: https://ik.imagekit.io/kudadam/blog/setup_sapper_cpanel_and_deployhq/hero.jpg
excerpt: Learn how to use DeployHQ to automatically deploy your Svelte website when you push to github
keywords:
  - deployhq
  - cpanel
  - sapper
tags:
  - deployhq
  - cpanel
  - sapper
date: 2021-05-20
---

So today, I wanted to move my website to my server. I had been using [netlify](https://netlify.com) to host my website since I was still in development mode. It was somehow tough since I did not find many tutorials on how to go about it so I decided to write down how I finally made it after my trials and errors

## Building your project

First of all, am assuming you have finished with your Sapper project and you are ready to deploy. Since I want to run my website server side, am going to use the `npm run build` command. However, if you want to deploy yours statically, you can also use the `npm run export` command. So in the directory of the project, open your terminal and run any of the two commands.
If it was able to build successfully, your output should look similar to the image below ↓

![Building](https://ik.imagekit.io/kudadam/blog/setup_sapper_cpanel_and_deployhq/building.jpg)

## Setting up project on Cpanel

Now, we have finished building our project, move on to your cpanel's homepage. It should look similar to mine. Now follow the steps below as we configure a new new nodejs app.

![Homepage of Cpanel](https://ik.imagekit.io/kudadam/blog/setup_sapper_cpanel_and_deployhq/cpanel_homepage.jpg)

- **Click on Setup Node.js App**  
  In the software section of your cpanel, you will see a "Setup Node.js App". This is where we will be creating our application, after clicking on it, it should take you to another page.

- **Click on "Create Application"**  
  After you are taken to a new page after clicking on "Setup Node.js App", you will see a button on your upper right hand side labelled 'Create Application'.

  ![Create application button on Cpanel](https://ik.imagekit.io/kudadam/blog/setup_sapper_cpanel_and_deployhq/create_application.jpg)

- **Fill in the Form**  
  After you click on the button, you will be taken to a page with a form. You are supposed to fill the mandatory portions of it.
  For mine, I chose the node version to be 14 and also, I set the application mode to production. This is very important as it will set the environment variable to production for your app.
  Then to the application root. This refers to the location of your app in your web server. For mine, I used the name of my domain for it. This will create a folder with my domain name inside my `public_html` folder.
  The next is Application URL, this simply refers to the url to which your app is accessed from, I will leave mine blank since I want it to start from the root of my domain, however you can change yours depending on the type of app you are making.
  The application start-up file refers to the file which starts your application. For Sapper, the start-up file for the build is located inside `__sapper__/build/` and named "index.js" so we will set the value to `__sapper__/build/index.js`. Now when a user visits the website, the application start up file will start up your app and serve it to your user.
  Now, we are done, for the environmental variables, it's entirely up to you, you can use it to store API keys and database passwords.
  Then click on CREATE on the upper right hand side of your screen.
  When you are done, your output should be similar to mine.

  ![Filling the Node app form](https://ik.imagekit.io/kudadam/blog/setup_sapper_cpanel_and_deployhq/filling_form.jpg)

  Now, if you are to visit your application url, you will see a simple text that says 'it works'. This shows that our application is working correctly.

## Deploying Project to Server

Now we are done configuring our server, all it's left for is to upload our build files to the server. In our case, am going to opt in for auto deployment. The reason being it that, it is easier to just `git push` to [Github](https://www.github.com) which will then build and deploy to your server than manually doing it all the time, besides, it saves us time.
We are going to use a service called [deployhq](https://www.deployhq.com) which will handle the auto deployment for us.

## Creating an account on DeployHQ

Head over to their website at [deployhq.com](https://www.deployhq.com/r/wyzoak) and create an account.
After filling all the forms and creating your account, you will be directed to their dashboard which looks like the image below Then you click on "Create a project".

<img src="https://ik.imagekit.io/kudadam/blog/setup_sapper_cpanel_and_deployhq/deployhq_dashboard.jpg" width="1266" height="783" alt="Dashboard of deployhq" />

## Connecting DeployHQ to your Git repository

In the projects tab, enter a new project name and select where your repository is hosted, for me, I will choose Github, then click on 'Create Project'.

![Creating a project on deployhq](https://ik.imagekit.io/kudadam/blog/setup_sapper_cpanel_and_deployhq/create_project_deployhq.jpg)

After that, you select the repository which you want DeployHQ to watch, then you start to configure your server.

## Configuring your Server

- Enter the name which you want to use for the server.

- You then select the protocol, that is, the method it should use to connect to your server.
  I would recommend you choose FTP, it's safe and simple.

- You then enter your host-name, that is, your site name. For example, example.com

- Then you enter the user-name and password for your server account

- For deployment path, use the `application root` path.
  That is the path which you set in the cpanel to run your application.
  This will make sure that the built files are sent directly to your app's folder in your server.

- Set 'Unlink existing file before uploading new version?' to true.
  This will ensure that your files are always fresh.

- Deployment Options

  - Branch to deploy from

  I set this to `master` and create a new branch called `development`, this will ensure that your site is not built on every commit, this way, you can build your site by merging the `master` branch with the `development` branch

  - Automatically deploy when this branch is pushed to?

  Set this option to true. This will make sure that your site is deployed whenever you push into your `master` branch.

  - Environment

  Set the environment to production.

When you have finished filling the form's, then you click on create server.
If there's was no error, then you are good to go.

## Setting Excluded Files

There are some files which we do not want to send to the server. That is, the `src` folder, `.config.js` files and other files which are not important for production. DeployHQ allows you to set the files which we want to send to the server, Cool right?
I will recommend you create a `.deployignore` file in your repository root or use their web interface to create the excluded files.

### Using .deployignore file

Inside your repository root, create a `.deployignore` file, if you want syntax highlighting, you can use `git ignore` syntax.

```gitignore
**/*

!__sapper__
!__sapper__/**

!blog
!blog/**

!static
!static/**

*.js

README.md
.deployignore
.gitignore
```

So what we are basically doing is ignoring all files and folders. Folders and files which start with the `!` sign will not be ignored whereas all those started with the `*` sign will be ignored.
One the first line, we are excluding every file, this helps to set the files we will only need. Then on the next two pairs, we include the `sapper` directory and the `sapper` directory plus it's contents. The next two pair follow the same logic. The `*.js` means we are excluding all files with `.js` extension in the root directory.
For an in-depth tutorial on globbing, visit [linuxhint.com/bash_globbing_tutorial/](https://linuxhint.com/bash_globbing_tutorial/).

### Using their web interface

Also, if you do not want to use a `.deployignore` file, you can create the set of files which you want to exclude using their web interface, however, this approach is tiring and slower than the first.

<img src="https://ik.imagekit.io/kudadam/blog/setup_sapper_cpanel_and_deployhq/ecluding_files.jpg" width="1398" height="580" alt="Excluding files using deployhq's web interface" />

## Creating a build pipeline

The build pipeline refers to commands which we want to run on DeployHQ's server before uploading them to our server. This is a very good place for us to build our sapper project and upload only the end results to the server.

![Using deployHQ's build pipeline](https://ik.imagekit.io/kudadam/blog/setup_sapper_cpanel_and_deployhq/building_files.jpg)

<b>Steps...</b>

- Select NPM as the template
- Enter a description
  Can be anything
- Enter the command
  This refers to the commands which we want to be executed. In our case, we are going to run `npm install` and `npm run build` only, you can add more commands if you want.
- Check 'Stop deployment if the command fails to true'
  This will ensure that in-case of any error, the build will stop, we actually don't want to send any errors to our server.
- Click on create command.

## Configuring Server SSH Commands

Initially, I used to make DeployHQ to upload the node_modules which it used for the build process to my server but then I realized that the node_modules contained a lot of junk modules, with Sapper, there are some modules which are not needed for production and only needed for building and development so if am to upload them to my server, it will be a total waste of precious storage space.

- In your current project tab, select 'SSH Commands'
- Create a new command under the 'After Changes' section.
  This should open a form.
- Enter a name in the description
  For this section, you can use any name.
- The command
  Okay, for this section what we are basically doing is activating the node environment, changing into our app's root directory and running `npm install`, this will install our node modules on the server side. Then we use the [PM2](https://pm2.keymetrics.io/) to start the server

```bash
source nodevenv/public_html/kudadam.com/14/bin/activate
cd public_html/kudadam.com
npm config set scripts-prepend-node-path true
npm install
npm list pm2 || npm install pm2 -g
pm2 start __sapper__/build/index.js --name "website"
```

## Activating Automatic Deployment

The auto deployment won't work without this option, this is the place where we toggle the auto deployment for this specific project.

![Setting autodeployment](https://ik.imagekit.io/kudadam/blog/setup_sapper_cpanel_and_deployhq/auto_deployment.jpg)

## Deploying to server

At long last, we are done, to build your app, just push some code into your master branch on github or if you are on the terminal, you can do same.
Comment down below if you faced any challenges.
