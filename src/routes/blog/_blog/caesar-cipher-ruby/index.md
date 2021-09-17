---
title: Caesar Cipher In Ruby
description: How to encrypt or decrypt your data using the Caesar cipher in Ruby
category: Programming
keywords:
  - cipher
  - Caesar cipher
  - encryption
  - decryption
  - encryption Caesar cipher
date: 2021-09-16
---

<p class="intro">
  We are going to make a simple program which will encrypt our data using Caesar cipher
</p>

## What is the Caesar Cipher?

The Caesar cipher is a type of substitution cipher which each letter in the plaintext is replaced by a letter some fixed number of positions down the alphabet. The number of fixed positions down the alphabet is what we call the key. It was named after Julius Caesar since he was the one who invented it.

## How It Works

So as I said earlier on, each letter during encryption is moved some fixed positions down the alphabet. So for a key of 3, if we are to encipher the letter A, we will shift it down three characters and the results will be D, C would be F and so on...
To decipher or decrypt, it will be the reverse process, we will count the letters backwards and the number of times will be determined by the key. So in order to decipher A with a key of 5, we will count 5 letters backwards and we will get V.

## Writing the algorithm in Ruby

Since am learning Ruby, I decided it was the best language to use since it will help me understand it more, and besides, Ruby is a very easy and simple language to understand. Also, we are going to use object oriented approach since that will make everything easier for us and it's the best way too.

```ruby
class Caesar
  @@UPPERCASE_LETTERS = ("A".."Z").to_a #Uses the range to create the uppercase letters and converts it to an array
  @@LOWERCASE_LETTERS = ("a".."z").to_a #Uses the range to create the lowercase letters and converts it to an array

  attr_accessor :key #This allows us to get and set the key without creating methods

  def initialize(key)
    #The constructor recieves the key on initialization
    @key = key #The key is then made an instance variable which makes it accessible
  end

  def encrypt(text)
    #This method handles the encryption of the text
    encrypted = "" #This is the variable which will hold the encrypted text
    text.split("").to_a.each do |x| #Converts the text into an array an iterate over each index
      if @@UPPERCASE_LETTERS.include? x #We then check if the current variable is included in the UPPERCASE array
        encrypted += @@UPPERCASE_LETTERS[ (@@UPPERCASE_LETTERS.index(x) + key) % 26] #We then find it's index and add the key to it
      elsif @@LOWERCASE_LETTERS.include? x
        encrypted += @@LOWERCASE_LETTERS[ (@@LOWERCASE_LETTERS.index(x) + key) % 26]
      else
        encrypted += x
      end
    end
    return encrypted
  end


  def decrypt(text)
    #This method is responsible for decrypting the encrypted text
    decrypted = "" #This variable will hold the decrypted text
    text.split("").to_a.each do |x|
      if @@UPPERCASE_LETTERS.include? x
        decrypted += @@UPPERCASE_LETTERS[ (@@UPPERCASE_LETTERS.index(x) - key) % 26]
      elsif @@LOWERCASE_LETTERS.include? x
        decrypted += @@LOWERCASE_LETTERS[ (@@LOWERCASE_LETTERS.index(x) - key) % 26]
      else
        decrypted += x
      end
    end
    return decrypted
  end
end
```

The code above is the Caesar cipher in Ruby. So let me explain parts of the code. The encrypt and decrypt method is similar so the explanation is the same for all.

* The method receives text as it's argument

* It then converts the text into an array and iterates over each character,

* In each iteration:
  * We check if the character is included in either of the `@@LOWERCASE_LETTERS` or `@@UPPERCASE_LETTERS` array with the use of the `.include?` method which takes the character as the argument

  * Then, we try to find the index of the character using `array.index(character)`, this will return the numerical index of the letter in the array.

  * Depending on whether we are encrypting or decrypting, we will add or subtract respectively.
  Now, since when we add the key, it will make the array much larger than it's length, we need to find the modular 26 (length of the array) of the `(array.index(character) + key)`, this will make sure the number which we will receive is less than the length of the array.

  * We then use the number we received as an index to fetch the encrypted character

## Using The Cipher
So in order to use the class we just created, we need to create an instance of it.
Remember the class takes the key as the constructor

```ruby
cipher = Caesar.new(5)
puts cipher.encrypt("Sentence") #=>Pbkqbkzb
puts cipher.decrypt("Pbkqbkzb") #=> Sentence

```

Happy Coding:laughing: