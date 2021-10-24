---
title: How To Find The Number Of Times An Item Appears In An Array
description: Learn how to find the number of times an item appears in an array in JavaScript
category: Programming
image: https://kudadam.sirv.com/blog/python-count-in-javascript/hero.jpg
keywords:
  - javascript count	
  - array count javascript
  - find item number array
  - javascript array count
date: 2021-10-23
---

<p class="intro">
    If you are coming from a Python background, then you obviously know about the <code>count</code> method in the list class.
</p>

In JavaScript, there is nothing as the count method. For those of you who don't know what the `count` method does is that, it counts the number of times an item appears in an array. For example, say we are having an array called numbers and we want to find the number of times the number two appeared in the array, this is how we would do it in Python.

```python
numbers = [1,2,3,4,5,2,3,4,2,4,2]
print(numbers.count(2)) # => 4
```

Since the number two appeared four times in the array, the function would return the number 4.

 Since this method does not exist in JavaScript, I decided to create my own count method.

## Code

```javascript
Array.prototype.count = function(item){ 
			let appearance = 0; //This is the default value
			this.forEach(index=>{
				if (index === item)
					appearance++
			});
			return appearance;
		}
```



## Explanation

In the code above, I extended the Array class and added a new method called `count` through the prototype. The method takes an argument called item. Then it iterates through all the values in the array and check if they correspond the the item, if they do, it increases the appearance counter by 1. Finally, it returns the `appearance`'s value.

## Using The Code

In order to use the code, just create an array and call the count method like this.

```javascript
let names = ["David","Walsh","David","Tania","Lucretius"];
names.count("David") //=>
```

Happy Coding Fellas :smile:



