---
title: 'JavaScript: How To Find The Number Of Times An Item Appears In An Array'
description: Learn how to find the number of times an item appears in an array in JavaScript
category: programming
excerpt: Python has a count method for finding the number of times an item appears in an array, learn how to do that in JavaScript since it does not have that method
keywords:
  - javascript count
  - array count javascript
  - find item number array
  - javascript array count
date: 2021-10-23
tags:
  - python
  - javascript
modified: 2021-10-23 20:45
expiry: 2023-01-01
---

If you have a Python background, you are probably familiar with the `count` method in the list class.
The `count` method does not exist in JavaScript. For those unfamiliar with the `count` method, it counts the number of times an item appears in an array. For example, suppose we have a numbers array, and we want to find the number of times the number two appears in the array. In Python, we'd do it like this.

```python
numbers = [1,2,3,4,5,2,3,4,2,4,2]
print(numbers.count(2)) # => 4
```

The code would return 4 because the number two appears four times in the array.
Because this technique does not exist in JavaScript, I opted to write my own.

## Code

```javascript
Array.prototype.count = function (item) {
	return this.filter((x) => x === item).length;
};
```

## Explanation

In the code above, I extended the Array class and added a new method called count through the prototype. The method takes an argument called `item`. It then filters the array and returns the length of the remaining items.
Simple.

## Using The Code

To utilise the code, simply construct an array and call the count method as shown below.

```javascript
let names = ['David', 'Walsh', 'David', 'Tania', 'Lucretius'];
names.count('David'); //=> 2
```

Fellas, happy coding! :smile:
