---
title: Migrating My Blog Page Hits Data To CountAPI
description: I migrated the page hits data for my website to CountAPI
category: Tips And Tricks
date: 2022-03-12
image: https://lucretius.sirv.com/blog/countapi-page-hit-counts/hero.jpg
excerpt: I migrated the page hits data for my website to CountAPI
keywords: 
  - count api
  - page hits count
  - page hits count api
  - CountAPI
  - page hits data
  - page hits
---

<p class="intro"  >
    <a href="https://countapi.xyz/">CountAPI</a> is an API service which allows you to create numeric counters, for free!!!. 
</p>


## Introduction

It's really useful if you want to implement a counter for your application without using a database. These are some of the things you can do with it;

* Create a counter and restrict its operations
* Reset the value of a counter
* Increment/Decrement a counter

The only cons it has is that, it doesn't allow for private counters, at least not yet but you can create namespaces for your counters which will reduce the probability of your counter crashing with another counter.

According to it's documentation, each counter is identified inside a namespace with a key. The namespace should be unique and it's recommended you use your domain name as the namespace to reduce or prevent conflicts.

## Endpoints

The API has endpoints which you use to store your data.

  * ### hits

    The hits endpoint provides increment by one counters directly, that is, each time the endpoint is request, it increases the counter by one.
    
    ```
    https://api.countapi.xyz/hit/namespace/key
    => {"value":187464219}
    ```
    It is recommended to replace `namespace` with your domain name or a unique name and key with a unique name. For example, key can be the slug to your blog posts.

  * ### get
    
    The get endpoint is used for retrieving data from the API. It only returns the current value but doesn't increment or decrement the value.
    
    Here's an example which uses the get endpoint.
    
    ```curl
    https://api.countapi.xyz/get/test
    => {"value":10096}
    ```
    
    
    
  * ### set
    
      This endpoint is used for setting the value for a key.
      
      ```curl
      https://api.countapi.xyz/set/test?value=69
      => {"old_value":10096,"value":10096}
      ```
    
      

* create

  This endpoint is used for creating a new key. 

  ```
  https://api.countapi.xyz/create?namespace=mysite.com&value=42
  => {"namespace":"mysite.com", "key":"33606dbe-4800-4228-b042-5c0fb8ec8f08", "value":42}
  ```

  

There are many more endpoints but this is where I will reach, [you can reach out to it's documentation page for more](https://countapi.xyz/).

## Migrating My Data

Since I was already storing my page hit counts in an SQLite database, I had to move it to the API and this is how I did it. I first used an SQLite viewer to view all the blog posts and it's page hit in a tabular form, then I used the [create](#create) endpoint to insert all the data. Aaanddd that was all.

## Integrating It Into My Blog

After adding all the existing data, it was now time to show the data inside the blog page. Since am using Svelte, I make a fetch request to the `hit` endpoint to get the data, then I display it inside the code.

Here's the code.

```javascript
onMount(async ()=>{
    //Get the page hits count from the api if the mode is production
		if (mode === "production"){
			let hits_response = await fetch(`https://api.countapi.xyz/hit/kudadam.com/${metadata.slug}`);
			let hit = await hits_response.json();
			hits  = await hit.value;
		}
})
```

## Conclusion

So, that's another way to make a page hit counter :smile:.
