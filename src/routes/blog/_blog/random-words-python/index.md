---
title: How to generate random words in python
description: A tutorial showing how you can generate random words using python
category: Programming
image: https://ik.imagekit.io/kudadam/blog/random_image.jpg
excerpt: Random words are unorganized combination of letters, learn how to use python to create some
keywords:
  - random words
  - random word python
  - random words python
  - random
  - python
tags:
  - python
date: 2021-03-29
---

## Introduction

So, you are here because you want to learn how to generate random words in Python but do you really know the meaning of random :question:
If you don't, lemme tell ya. It's simply the lack of pattern or predictability in events. If something is said to be random, it has no order and does not follow any pattern or combination.
For example, the numbers, 2,4,6...12 are not random because you can predict the possible outcomes because they are even numbers.
The numbers, 2,655,1,43,4,22 are random because you can not predict the next outcome or possibilities.

## Random Words

So after reading the meaning of random, I hope you now have an understanding of random objects.
Random words are just a combination of random letters. Meaning you have no idea of the word being generated.
We are going to generate random words in many formats. As you can see, they are kinda many, don't worry, I will explain the code in detail.
We will start easy and as we progress, things will become a little tricky.

## Generating Random Lowercase Words

So in this section, we are going to generate random words which are lowercase letters. Open your favourite IDE and start a new file.
Give the file a name and let's start coding.

```python
import string #Python module for strings. It contains a collection of string constants
import random #Python's module for generating random objects
lowercase_letters = string.ascii_lowercase #A constant containing lowercase letters
def lowercase_word(): #The function responsible for generating the word
    lowercase word = '' #The variable which will hold the random word
    random_word_length = random.randint(1,10) #The random length of the word
    while len(word) != random_word_length: #While loop
        word += random.choice(lowercase_letters) #Selects a random character on each iteration
    return word #Returns the word
random_word = lowercase_word()

```

Well, after running the code, this is what I got :arrow_down:

`pniaryiw [Finished in 0.2s]`

Let me now explain my code.
On the first line, I imported the string module. Python's :snake: string module contains a collection of string constants. Meaning, it contains lowercase letters, uppercase letters, and other constants defined. Then on the second line, I imported the random module. It contains classes which helps us to generate random objects.
Let's jump to line 4. The variable `lowercase_letters` contains all the lowercase letters defined in it. Meaning, it contains the letters a,b,c,...,y,z.
Let's move on to the function called `lowercase_word`. This is the function which generates lowercase random words. The `word` variable is the variable which is going to hold the random word. Initially, it's always empty.
`random_word_length` is a variable which is going to hold a random number. The `random.randint` method takes two parameters, 'a' and 'b'. The 'a' is a number which
refers to the minimum random number which can be generated and 'b' refers to the maximum
random number which can be generated.
The results is an integer which is stored in the variable `random_word_length`. In my case, a and b is 1 and 10 respectively. Meaning the results is going to be a random number which is in the range of 1 to 10.
To the next line, `while len(word) != random_word_length:` is a while loop.
Let me explain, it means while the length of the word variable is not equal to the random number, it should keep on generating random letters :cool: . Then to the next line, `word += random.choice(lowercase_letters)`, this statement is repeated in the loop. Each time the loop is repeated, the `random.choice` selects a random letter from the lowercase_letters variable and appends it to the word variable. Notice I used `+=` not `=`.
Then the last line, return word returns the generated word.
`random_word = lowercase_word()` calls the function lowercase_word and the function generates a word and assigns it to the random_word variable.
Then on the last line, I just printed it out.

## Generating Random Uppercase words

Well, in this section, we will generate random uppercase letters.

```python
import string #Python module for strings. It contains a collection of string constants
import random #Python's module for generating random objects
lowercase_letters = string.ascii_lowercase #A constant containing lowercase letters
uppercase_letters = string.ascii_uppercase #A constant containing uppercase letters
def uppercase_word(): #The function responsible for generating #random words which are in uppercase
    word = '' #The variable which will hold the random word
    random_word_length = random.randint(1,10) #The random length of the word
    while len(word) != random_word_length: #While loop
        word += random.choice(uppercase_letters)
    return word
```

For this one, am not going to really explain it. Everything is the same as the `lowercase_word` function except that we replaced the code `word += random.choice(lowercase_letters)` with `word += random.choice(uppercase_letters)`. The variable `uppercase_letters` contains uppercase letters.

## Generating Mixed-Case Random Words

So, over here, we are going to generate random words which are a mix of uppercase and lowercase.

```python
import string #Python module for strings. It contains a collection of string constants
import random #Python's module for generating random objects
lowercase_letters = string.ascii_lowercase #A constant containing lowercase letters
uppercase_letters = string.ascii_uppercase #A constant containing uppercase letters
letters = string.ascii_letters #A contstant containing all uppercase and lowercase letters
def mixedcase_word(): #The function responsible for generating #random words which are in uppercase
    word = '' #The variable which will hold the random word
    random_word_length = random.randint(1,10) #The random length of the word
    while len(word) != random_word_length: #While loop
    word += random.choice(letters)
    return word
```

Also, this one won't get much explanation because it uses the same formats of the other functions.
We only defined a new variable `letter`s which contains all uppercase and lowercase letters combined.
Then, we replaced the code `word += random.choice(uppercase_letters)` with `word += random.choice(letters)` and that was all.

## Controlling the length of random word

This is very useful if you want the random word to be of a specific length. We are going to use the `lowercase_word` function but you can use any of the three functions.

```python
import string #Python module for strings. It contains a collection of string constants
import random #Python's module for generating random objects
lowercase_letters = string.ascii_lowercase #A constant containing lowercase letters
uppercase_letters = string.ascii_uppercase #A constant containing uppercase letters
letters = string.ascii_letters #A contstant containing all uppercase and lowercase letters
def lowercase_word(number = 5): #The function responsible for generating #random words which are in uppercase word = '' #The variable which will hold the random word
    while len(word) != number: #While loop
    word += random.choice(lowercase_letters)
    return word
```

So let me explain, I modified the `lowercase_word` function. Let's look at the changes.
Our function now accepts a parameter called number, As you can see, it is already initialized with a value, 5. The reason is that, if you choose not to provide a number, it uses the default value in the parameter.
In calling the function, it will be like this `word = lowercase_word(number)` with your desired number being in the brackets.
The length of the generated word will be equal to the length of the number you provided. The rest of the code is pretty self-explanatory.

## Determining first and last letters of random word

This part is really simple, we are going to create a function that will make us specify the first and last letter of the random word.

```python
import string #Python module for strings. It contains a collection of string constants
import random #Python's module for generating random objects
lowercase_letters = string.ascii_lowercase #A constant containing lowercase letters
uppercase_letters = string.ascii_uppercase #A constant containing uppercase letters
letters = string.ascii_letters #A contstant containing all uppercase and lowercase letters
def lowercase_word(first_letter = None, last_letter = None): #The function responsible for generating #random words which are in uppercase
    number = random.randint(1, 10) word = '' #The variable which will hold the random word
    if first_letter != None:
        word += first_letter
    while len(word) != number: #While loop
        if len(word) == number - 1:
            if last_letter != None:
                word += last_letter
                return word
            word += random.choice(lowercase_letters)
            return word
```

The function is called `lowercase_word` , it's same as the first one, just modified it a bit. So our function takes two parameters, first_letter and last_letter. Initially, they are set to None, since it won't be compulsory for you to specify the first and last letters.

So, in the first line of our function, there is a variable `number` which contains a random number and it's going to be the length of our random word.
Next, we declared the variable `word` which will hold the random word. Then the next statement `if first_letter != None`. This means that, if the value of the parameter first_letter is not None, (Means you have provided a value) it should assign the value of the parameter to the variable word, since this code runs before the letters are generated, it then becomes the first letter.
Then the next line, will assign the value of parameter to the variable word only if the value of first_letter is not None.

To the next line, `while len(word) != number:` is the loop in which the random letters are generated.
Then the next line is where it's a little bit tricky. `if len(word) == number - 1:`. Okay, let's take it like this. It means, if the length of the word variable is equal to the random number -1, ...
To simplify it more, it means, _"before you assign the last letter,..."_
Then the next line will check if the value of the parameter `last_letter` is not None. If it is not None, it will assign the value there to the word `variable` instead of generating a new letter.
Then the next line, will return the word.
So let's see ways which we can use the function.

```python
print(lowercase_word('a')) #This will print a random word starting with 'a'
print(lowercase_word('m','b')) #This will print a random word starting with 'm' and ending with 'b'.
print(lowercase_word(None, 'z')) #This will print a random word ending with 'z'.

```
