---
title: How To Find The Number Of Times An Item Appears In An Array
description: Learn how to find the number of times an item appears in an array in JavaScript
category: Programming
excerpt: Python has a count method for finding the number of times an item appears in an array, learn how to do that in JavaScript since it does not have that method
image: https://kudadam.sirv.com/blog/python-count-in-javascript/hero.jpg
keywords:
  - javascript count	
  - array count javascript
  - find item number array
  - javascript array count
date: 2021-10-23
tags:
  - python
  - javascript
last_updated: "2021-10-23 20:45"
---

<p class="intro">
    If you are coming from a Python background, then you obviously know about the <code>count</code> method in the list class.
</p>

In JavaScript, there is nothing as the count method. For those of you who don't know what the `count` method does is that, it counts the number of times an item appears in an array. For example, say we are having an array	 called numbers and we want to find the number of times the number two appeared in the array, this is how we would do it in Python.

```python
numbers = [1,2,3,4,5,2,3,4,2,4,2]
print(numbers.count(2)) # => 4
```

Since the number two appeared four times in the array, the function would return the number 4.

 Since this method does not exist in JavaScript, I decided to create my own count method.

## Code

```javascript
Array.prototype.count = function(item){
	return this.filter(x => x === item).length
	}

```



## Explanation

In the code above, I extended the Array class and added a new method called `count` through the prototype. The method takes an argument called item. It then filters the array and return the length of the remaining items.
Simple.

## Using The Code

In order to use the code, just create an array and call the count method like this.

```javascript
let names = ["David","Walsh","David","Tania","Lucretius"];
names.count("David") //=> 2
```

Happy Coding Fellas :smile:

<div class="note">
	Thanks to <a href="https://dev.to/frankwisniewski">@frankwisniewski</a> for <a href="https://dev.to/frankwisniewski/comment/1j5oj">finding</a> a much better way to write the <code>count</code> method
</div>