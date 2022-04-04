---
title: How To Get User I.P Address In SvelteKit
description: A tutorial which shows how you can obtain the I.P address of a user in your sveltekit website
category: Web Development
date: 2022-03-31
excerpt: A tutorial which shows how you can obtain the I.P address of a user in your sveltekit website
keywords: 
  - sveltekit
  - ip address
  - sveltekit ip
  - svelte ip address
image: https://lucretius.sirv.com/blog/user-ipaddress-sveltekit/hero.jpg
---
<p class="intro">
    SvelteKit now makes it super easy to get the I.P address of a user
</p>

## What's an I.P address?

An IP address is a unique address that identifies a device on the internet or a local network. It is what the internet uses to differentiate between computers. It is a string of numbers separated by periods, an example is 192.168.42.1 . You [can read more about I.P addresses here](https://www.kaspersky.com/resource-center/definitions/what-is-an-ip-address#:~:text=An%20IP%20address%20is%20a,the%20internet%20or%20local%20network.)

## Extracting an I.P address in SvelteKit
In SvelteKit, you can get the I.P address of your user through endpoints. Endpoints are modules written in `.js` (or `.ts`) files that export [request handler](https://kit.svelte.dev/docs/types#sveltejs-kit-requesthandler) functions corresponding to HTTP methods. Their job is to make it possible to read and write data that is only available on the server.

The list of functions are;
* get
* post
* put
* patch
* del
and all these allows you to extract the I.P address of a user by destructing the object which is passed into the function.

For example, to get the I.P address of a user in the `get` method, you would simple write this🔽

```javascript
export const get = async ({ clientAddress })=>{
	let ip_address = clientAddress;
}
```

Do note that, in `dev` mode, the value which you will get for `clientAddress` will always be `127.0.0.1`  and this is because you are using localhost, you are creating a network on your own computer.

## Conclusion
So fellas, that is how you can get the I.P address of a user in your SvelteKit website.