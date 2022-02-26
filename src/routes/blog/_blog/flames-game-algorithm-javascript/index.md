---
title: The FLAMES Game Algorithm in JavaScript
description: Learn how to implement the FLAMES game algorithm in JavaScript
category: Programming
excerpt: A tutorial which shows you how to create the flames game in Javascript
image: https://kudadam.sirv.com/blog/the-flames-game/hero.jpg
keywords:
  - the flames game
  - flames game code
  - flames code
  - flames game javascript
  - flames game how to play
  - how to do flames
  - how do you play flames
  - flames code in javascript
date: 2021-10-19
tags:
  - flames
  - javascript
---

<p class="intro">
 So I wanted to create the FLAMES Game in JavaScript and here's how I did it
</p>



If  you haven't read about my article on the FLAMES game, you can [read it here](https://www.kudadam.com/blog/the-flames-game). 

## The Algorithm

Okay, so here's how the game work.

1. It takes two full names of different individuals

2. Cancel out the common letters in both names

3. Count the number of uncommon letter's

4. Find the modular 6 of that number

5. Then compare the number to this simple table

  | Number | FLAMES        |
  | ------ | ------------- |
  | 0      | Friends       |
  | 1      | Lovers        |
  | 2      | Admirers      |
  | 3      | Marriage      |
  | 4      | Enemies       |
  | 5      | Secret Lovers |

## Code In JavaScript

So we are going to use Object Oriented Approach to create the game in JavaScript so you can create a new JavaScript file and paste the following code inside and I will explain below

```javascript
class Flames {
	constructor(first_name,second_name){
		// The constructor takes both names as paramters
		this.first_name = first_name; //The first partner's name
		this.second_name = second_name; //The second partner's name
		//We then create a clone of both names and convert them 
		//to lowercase and remove all white spaces in them
		//NB: The reason for creating the clone is because we don't
		//want to mess with the original data

		if (first_name === undefined || second_name === undefined)
				throw Error("Both names are required");

		this.a = this.first_name.toLowerCase().replace(/\s/g,"");
		this.b = this.second_name.toLowerCase().replace(/\s/g,"");
		this.getDifference();
		this.getRelationship();
		//Now we remove the cloned variables since they are not needed
		delete this.a;
		delete this.b;
	}

	getDifference(){
		//This method is responsible for cancelling the common letters
		//out and returning the uncancelled letters

		for (let i = 0; i < this.a.length; i++) {
			for (let j = 0; j < this.b.length; j++){
				//The `if` statement below is to check if a letter in the
				//first_name is also present in the second_name, if it is,
				//it removes that letter in both names.
				//After that, we call the function again, the reason for calling
				//the function is to make it run with the new data or else it will
				//stick to the unreplaced data
				if (this.a[i] === this.b[j]){
					this.a = this.a.replace(this.a[i],"");
					this.b = this.b.replace(this.b[j],"");
					this.getDifference();
				}
			}
		}
		this.differenceContent = this.a + this.b;
		this.difference = this.a.length + this.b.length;
		return this.difference;
	}
	getRelationship(){
		//The method responsible for returning the relationship between both individuals
		const FLAMES = {
			0: ["F","Friends"],
			1: ["L","Lovers"],
			2: ["A","Admirers"],
			3: ["M","Marriage"],
			4: ["E","Enemies"],
			5: ["S","Secret Lovers"]
		};
		let modular_difference = this.difference % 6; //Gets the modular 6 of this.difference
		this.relationship = FLAMES[modular_difference];
	}
}
```

## Explaining The Code

That's all the code for the game. So we created a class called `Flames`. It's constructor takes two parameters; `first_name` and `second_name`.  We then create a clone of both names as `this.a` and `this.b` respectively, the reason why we do this is that we do not want to mess with the original data. 

The `getDifference` function is the function which is responsible for cancelling out the common letters in both names. It iterates through all the letters in the `first_name` and checks to see if that letter exists in the `second_name`. If it does, it removes that letter in both names. After that, it combines the letters which were not cancelled and sets it as `this.difference`. 

The function `getRelationship` is the function which determines the relationship between the two names. It contains an object whose keys can be used to find the relationship between the names. The `modular_difference` variable contains `this.difference` MOD 6. This will return an integer which is less than 6, we then use that integer as key to access the relationship from the FLAMES object.



## Playing The Game

In order to play the game, you can create an HTML file and place a form which requires two names, the creativity is upto you, then in your JavaScript, you pass those names to the FLAMES class like this;

```javascript
const FLAMES = new Flames("First Partner's Name","Second Parner's Name");
console.log(FLAMES.relationship)
```

Do note that, the Flames class returns an object which contains some basic data, in order to get the relationship, you need to call the class' instance`.relationship`

## Conclusion

So that's the algorithm for the FLAMES game in JavaScript, you can try it out at [https://www.kudadam.com/flames](https://www.kudadam.com/flames).

Happy Coding :smile:

