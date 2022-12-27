---
title: The FLAMES Game. Everything You Need To Know About It
description: Learn all about the FLAMES game, when it was invented, who invented it and many more
category: personal
excerpt: The FLAMES game is a game which is usually played by kids, it can determine the relationship between two people with the use of their names.
keywords:
  - flames
  - flames game
  - how flames game work
  - how is flames played
  - how to play flames
  - how to use flames
  - who invented flames game
date: 2021-10-18
expiry: 2025-10-18
draft: true
tags:
  - games
---

<script type="text/javascript">
  $: names = {
    first: "tony stark",
    second: "pepper stark"
  }


  $: showTutorial = names.first.trim().length !== 0 && names.second.trim().length !== 0;


  import { cancelLetters } from "./utils";
</script>

Some call it **"FLAMES"**, others call it **"FLAME"**, but whatever way you choose to call this game, it is the best game a teen can play. It is one of those games that has been around for a long time but is still popular today. Whether you are an adult or a teen, playing this game gives you happiness, especially when it reveals good results about your crush.

Guys (including myself) used to play this game anytime there was a new girl in school, most likely to test our luck before "befriending" the girl. Sometimes, it gives us results we weren’t expecting; you might find out that the FLAMES between you and your crush is "Enemy", and you would keep trying to re-work the game to see if you made a mistake anyway. Also, we wasted a lot of paper playing the game😂.

No one knows for sure how old the game is, but one thing we know for sure is that it has existed for a very long time. Some even claim it is over a century old, which is quite a long period for a game.

## The original acronym of the game

It is not known for sure the original acronym of the game. Some prefer to call it “FLAME”, and others call it “FLAMES”, but whatever you call it, it doesn’t change the game. We should stick to one interpretation because I grew up believing it was FLAMES, but if you search online, you'll find numerous variations.

## Representation of each letter in the acronym

There are many different interpretations of the meaning of the individual letters that make up the acronym. Some claim it is:

- FLAME: Friends, Lovers, Affectionate, Marriage, Enemies
- FLAMES: stands for - Friends, Lover, Affection, Marriage, Enemy, Sister
- FLAMES: Friendship, Love, Affection, Marriage, Enemy and Siblings
- FLAMES: Friends, Lovers, Affection, Marriage, Enemy, 'Secret Lovers' and more

As you can see, there are plenty of versions out there but to enjoy the game, you really need to stick to the one which suits you. For me, the version I have always known is "Friends Lovers Affection Marriage Enemy 'Secret Lovers'" and it's the one I stick to.

## How to play the game

The game of Flames was initially played on paper, but now there are online versions. Being able to test your FLAMES with someone without having to look for paper again is fantastic.

Here is an interactive tutorial to teach you how to play the FLAMES game. You can replace your name with the ones inside the boxes to better understand how it works.
Although it's not required, it's preferable to use your full name when starting the game. You start by writing your name and your partner's name on a piece of paper. You can see that there are two names in the input boxes below; the first name is yours, and the second is the name of your partner.

<div class="p-2 border border-neutral-300 mb-5 rounded-md">
  <div class="mb-5">
    <label for="first" class="text-neutral-600 font-bold">Your name</label>
    <input id="first" type="text" bind:value={names.first} required class="lowercase peer/first">
    <span class="text-sm text-red-600 hidden peer-invalid/first:block py-0.5">You need to enter your name here</span>
    
  </div>
  <div>
    <label for="second" class="text-neutral-600 font-bold">Patner's name</label>
    <input id="second" type="text" bind:value={names.second} required class="lowercase peer/second">
    <span class="text-sm text-red-600 hidden peer-invalid/second:block py-0.5">You need to enter your partner's name here</span>
  </div>
</div>

Then, we cancel out the common letters in both names; each instance in the first person’s name will cancel out another in the second person’s name.

{#if showTutorial}

  <div class="border p-2 rounded-md border-neutral-300 my-3" id="cancel-common">
    <div class="mb-3 flex flex-wrap gap-2">
      {#each cancelLetters(names.first, names.second) as {letter, cancelled}}
        <span class="border p-2" data-cancelled={cancelled} class:border-black={cancelled} class:line-through={cancelled}>{letter}</span>   
      {/each}
    </div>
    <div class="flex flex-wrap gap-2">
      {#each cancelLetters(names.second, names.first) as {letter, cancelled}}
        <span class="border p-2" data-cancelled={cancelled} class:border-black={cancelled} class:line-through={cancelled}>{letter}</span>
      {/each}
    </div>
  </div>
{/if}

We combine the letters not cancelled after cancelling the common letters in both names.

{#if showTutorial}
{@const letters = cancelLetters(names.first, names.second).concat(cancelLetters(names.second, names.first))}

  <div class="border border-neutral-300 p-2 gap-2 rounded-md flex flex-wrap">
  {#each letters as { letter, cancelled}}
    {#if !cancelled}
      <span class="border p-2">{letter}</span>
    {/if}
  {/each}
  </div>
{/if}

Then, we count the number of letters which were not cancelled. Take note of the number.

{#if showTutorial}
{@const length = cancelLetters(names.first, names.second).concat(cancelLetters(names.second, names.first)).filter(letter => letter.cancelled !== true).length}

In our example, the number of letters which were not cancelled is <span>{length}</span>.

{/if}

We then count the numbers through the letters FLAMES. 1 for F, 2 for L, and 3 for A till we reach 10. Upon reaching 7, you start back again at F till you finish. Then you compare your results to the table below.

| Letter | Relationship  |
| ------ | ------------- |
| F      | Friends       |
| L      | Lovers        |
| A      | Admirers      |
| M      | Marriage      |
| E      | Enemy         |
| S      | Secret Lovers |

{#if showTutorial}
{@const length = cancelLetters(names.first, names.second).concat(cancelLetters(names.second, names.first)).filter(letter => letter.cancelled !== true).length}
{@const FLAMES = ['Friends','Lovers','Admirers','Marriage','Enemy','Secret Lovers']}

After counting through, we will get the letter **{FLAMES[(length - 1) % 6][0]}** which means the relationship between {names.first} and {names.second} is **{FLAMES[(length - 1) % 6]}**.

{/if}
