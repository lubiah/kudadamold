---
title: Adding Matomo analytics to your website through CPanel
description: CPanel has an application installer called softaculous, with it, you can install matomo analytics
category: Tips and Tricks
date: 2021-10-26 17:54
image: https://kudadam.sirv.com/blog/adding-matomo-website/hero.jpg
excerpt: Learn how to use softaculous app installer to install Matomo analytics onto your website 
keywords:
  - matomo analytics
  - install matomo analytics
  - matomo analytics cpanel softaculous
  - matomo install softaculous
  - matomo how to install
  - matomo how to install linux
tags:
  - matomo
  - cpanel

---

<p class="intro">
   My <a href="https://clicky.com/">clicky analytics</a> free service was ending today so I decided to move to <a href="https://matomo.org/">Matomo analytics</a>. Matomo analytics has a self-hosted version which is free to use.
</p>


![Leaving clicky](https://kudadam.sirv.com/blog/adding-matomo-website/leaving_clicky.PNG)



So am going to show a pretty easy way to install Matomo analytics on CPanel using the Softaculous application installer.

## Steps To Install  

1. Log in to CPanel

   In order to get started, you must first login to your CPanel. The login url is always located at  cpanel.yourwebsite.com

   

2. Locate 'Softcalous Apps Installer'  under the Software section of your CPanel and click on it.

   ![Locating Softucalous](https://kudadam.sirv.com/blog/adding-matomo-website/locating_softacalous.PNG)

3. Search for 'matomo' inside the search bar and click on it


4. Click on Install and fill in the options

   When you click on install, it will show you a form which you are to fill in.

   1. The installation url

      This refers to the location on your website where you want the app to be installed. The recommended protocol is "https://www."

      The domain option is used to select the domain on which the app is to be installed and finally, the directory shows the folder inside your domain where the application will be installed.

   2. The CRON Job

      This feature allows you to set a time to run the Matomo archiving script.

   3. Admin Account

      This allows you to create the user account which you will use to log into Matomo

   4. Advanced Options

      1. Database name

         This refers to the database name which you want Matomo to use to store your data. Remember that the name should not be the name of an existing database.

      2. Table Prefix

         This allows you to set a name which will be prefixed to matomo table names

5. After filling in all the options, click on install. 

## Fixing Common Errors



### Cannot Connect To Database Error

![Cannot connect to database error](https://kudadam.sirv.com/blog/adding-matomo-website/cannot-connect-to-db.PNG)

If you receive this error, open your file manager and locate the matomo installation folder. Open the config.ini.php file inside the config folder and change the host value to "127.0.0.1".

Close the file and visit the application page again. 

## Sign In Error

![Sign In Error](https://kudadam.sirv.com/blog/adding-matomo-website/sign_in_error.PNG)

It is very obvious that you will run into this error when installing Matomo from Softaculous but don't worry, this is a solution.

Just clear your browser cache and you will be good to go.



## Conclusion

So that's how you can easily install matomo analytics on CPanel using Softaculous, if you faced any more challenges, please do state it in the comments section.

Happy Coding :smile:
