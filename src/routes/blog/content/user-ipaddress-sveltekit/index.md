---
title: How To Get User I.P Address In SvelteKit
description: A tutorial which shows how you can obtain the I.P address of a user in your sveltekit website
category: web-development
date: 2022-03-31
excerpt: A tutorial which shows how you can obtain the I.P address of a user in your sveltekit website
keywords:
  - sveltekit
  - ip address
  - sveltekit ip
  - svelte ip address
modified: 2022-10-22
expiry: 2023-05-31
tags:
  - sveltekit
  - svelte
---

SvelteKit now makes it super easy to get the IP address of a user.

## What is an IP address?

An IP address is a unique identifier for a device on the internet or a local network. It is used by the internet to distinguish between computers. It is a series of integers separated by periods, such as 192.168.42.1. You may [learn more about IP addresses here](https://www.kaspersky.com/resource-center/definitions/what-is-an-ip-address#:~:text=An%20IP%20address%20is%20a,the%20internet%20or%20local%20network.).

## Extracting an IP address in SvelteKit

In SvelteKit, you can get the IP address of your users through endpoints, server-only load functions, and server hooks.
Any function parameter that has a type of `RequestEvent` allows you to get the IP address by deconstructing the ` getClientAddress` function from the object. If this function is called, it returns the user's IP address.

```javascript
// +page.server.js
  export const load = { getClientAddress } => {
    const ip = getClientAddress()
  }
```

Do note that, in `dev` mode, the value you will get for `getClientAddress` will always be `127.0.0.1`, because you are using localhost, and creating a network on your own computer.
