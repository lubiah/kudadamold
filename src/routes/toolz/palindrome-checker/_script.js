import jquery from 'jquery';

function reverse_text(str) {
    // Step 1. Use the split() method to return a new array
    var splitString = str.split(""); // var splitString = "hello".split("");
    // ["h", "e", "l", "l", "o"]
 
    // Step 2. Use the reverse() method to reverse the new created array
    var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
    // ["o", "l", "l", "e", "h"]
 
    // Step 3. Use the join() method to join all elements of the array into a string
    var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
    // "olleh"
    
    //Step 4. Return the reversed string
    return joinArray; // "olleh"
}

export function palindrome_checker(text) {
    var text_splitted = text.split("");
    var reversed = "";
    for (let i = text_splitted.length - 1; i >= 0; i--) {
        reversed += text_splitted[i];
    }
    var equal = (reversed == text)
    if (equal)
    	return true;
    else
    	return false;
 
}

export function explanation(results,original_text, word, case_sensitive, ignore_whitespaces){
    var word_or_phrase = word.includes(' ') ? "phrase" : "word";
    var last_letter = word.slice(-1);
    var last_letter_2 = word[word.length - 2];
    var last_letter_3 = word[word.length - 3];
    var last_letter_off = word.slice(0, word.length - 1);
    var last_two_off = word.slice(0, word.length -2); 
    var last_three_off = word.slice(0, word.length - 3);  
    let sentence;
    switch(results){
        case true:
            sentence = `<pre><span style="color:green">${word_or_phrase}</span> : ${original_text}
<span style="color:green">case sensitive</span> : ${case_sensitive}
<span style="color:green">ignore whitespaces</span> : ${ignore_whitespaces}
--------------------------------------------
${ignore_whitespaces ? `Since the <i style="color:green">ignore whitespaces</i> option is turned on, all whitespaces will be stripped from your ${word_or_phrase}.
It will then become [${word}].`: ""}
${case_sensitive ? "": `The <i style="color:green">case_sensitive</i> option is turned off, so we will convert all letters to lowercase to make it easy to compare.
Then your ${word_or_phrase} will now become [${word.toLowerCase()}].`}

1.We will start by putting your word in a container called A.
A = [${word}]

2.We then create another empty container called B.
B = []

3.We start reading the letters in container A and putting it in container B . We start with the last letter '${last_letter}'.
[${last_letter_off}${`<span style="color:red">${last_letter}</span>`}]
B = [${last_letter}]

4. We then move to the letter before '${last_letter}' which is '${last_letter_2}'.
[${last_two_off}<span style="color:red">${last_letter_2}</span>${last_letter}]
B = [${last_letter}${last_letter_2}]

5.We then move to the letter before '${last_letter_2}' which is '${last_letter_3}'.
[${last_three_off}${`<span style="color:red">${last_letter_3}</span>`}${word.slice(-2)}]
B = [${last_letter}${last_letter_2}${last_letter_3}]

6.We continue to repeat this process till we get to the first letter '${word[0]}'.
Now,  B = [${word}]

7.We then compare both containers A and B.
A = [${word}] B= [${word}].

8.As we can see, both containers A and B are the same.
So, '${word}' is palindrome.😄      
</pre>`;
    return sentence;

    case false:
    	sentence = `<pre><span style="color:green">${word_or_phrase}</span> : ${original_text}
<span style="color:green">case sensitive</span> : ${case_sensitive}
<span style="color:green">ignore whitespaces</span> : ${ignore_whitespaces}
--------------------------------------------
${ignore_whitespaces ? `Since the <i style="color:green">ignore whitespaces</i> option is turned on, all whitespaces will be stripped from your ${word_or_phrase}.
It will then become [${word}].`: ""}
${case_sensitive ? "": `The <i style="color:green">case_sensitive</i> option is turned off, so we will convert all letters to lowercase to make it easy to compare.
Then your ${word_or_phrase} will now become [${word.toLowerCase()}].`}

1.We will start by putting your word in a container called A.
A = [${word}]

2.We then create another empty container called B.
B = []

3.We start reading the letters in container A and putting it in container B . We start with the last letter '${last_letter}'.
[${last_letter_off}${`<span style="color:red">${last_letter}</span>`}]
B = [${last_letter}]

4. We then move to the letter before '${last_letter}' which is '${last_letter_2}'.
[${last_two_off}<span style="color:red">${last_letter_2}</span>${last_letter}]
B = [${last_letter}${last_letter_2}]

5.We then move to the letter before '${last_letter_2}' which is '${last_letter_3}'.
[${last_three_off}${`<span style="color:red">${last_letter_3}</span>`}${word.slice(-2)}]
B = [${last_letter}${last_letter_2}${last_letter_3}]

6.We continue to repeat this process till we get to the first letter '${word[0]}'.
Now,  B = [${word}]

7.We then compare both containers A and B.
A = [${word}] B= [${reverse_text(word, false)}].

8. The letters in container A are different from the one in container B.
So '${word}' is not a palindrome.😄
</pre>`;
return sentence;
    }
}
