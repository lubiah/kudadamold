---
title: How To Deploy Your SvelteKit Website With Buddy.works
description: Learn how to use Buddy.works automation platform to automatically deploy your website when you push to your git repository.
category: Tips and Tricks
excerpt: Learn how to use Buddy.works automation platform to automatically deploy your website when you push to your git repository.
draft: true
keywords:
  - buddy.works
  - sveltekit deployment
  - svelte deployment
  - automation
  - svelte automation
  - deploying sveltekit
  - how to deploy svelte app
  - deploying svelte
  - deploy svelte linux
  - deploy svelte nginx
date: 2022-03-07
tags:
  - svelte
  - sveltekit
  - buddy.works  
---

<p class="intro">
    Whenever I push changes on my website to Github, Buddy.works builds the website using it's automation pipeline.
</p>

## What is [Buddy.works](https://buddy.works/)?

It is a web-based CI/CD for developers that allows you to build, deploy and test websites, web applications and mobile applications from your git repository. It uses Docker containers for builds, monitoring and notification actions.

## How it Works

It runs actions (commands) which are arranged into sequences called pipelines. The pipelines can be triggered automatically on git push to a branch, manually or at a specific set time. It also supports the use of YAML files to describe the build or deploy processes.

---

Ever since I stopped using DeployHQ to deploy my websites, I have been using [Buddy.works](https://buddy.works/) and I really like how easy it is to use. With actions, you can do almost everything and the best part is that you get to automate everything.

Am going to demonstrate how I use [Buddy.works](https://buddy.works/) to build my website _(this very website)_. Since they support the use of YAML files for configuring the build process, that's what I use and I will explain each action as we progress.
