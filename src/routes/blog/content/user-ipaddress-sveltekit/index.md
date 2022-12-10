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
expiry: 2022-12-22
tags:
  - sveltekit
  - svelte
---

SvelteKit now makes it super easy to get the I.P address of a user.

## What's an I.P address?

An IP address is a one-of-a-kind identifier for a device on the internet or a local network. It is used by the internet to distinguish between computers. It is a series of integers separated by periods, such as 192.168.42.1. You may [learn more about IP addresses by clicking here](https://www.kaspersky.com/resource-center/definitions/what-is-an-ip-address#:~:text=An%20IP%20address%20is%20a,the%20internet%20or%20local%20network.).

## Extracting an I.P address in SvelteKit

In SvelteKit, you can get the I.P address of your users through endpoints, server-only load functions and server hooks.
Any function parameter which has a type of `RequestEvent` allows you to get the I.P address by the deconstruction of the ` getClientAddress` function from the object. If this function is called, it returns the user's I.P address.

```javascript
// +page.server.js
  export const load = { getClientAddress } => {
    const ip = getClientAddress()
  }
```

Do note that, in `dev` mode, the value which you will get for `getClientAddress` will always be `127.0.0.1` and this is because you are using localhost, you are creating a network on your own computer.

## Conclusion

So fellas, that is how you can get the I.P address of a user in your SvelteKit website.
