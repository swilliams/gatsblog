---
layout: post
title: "Things I Learned While Making a Simple Game For My Daughters"
date: 2013-03-21T00:00:00.000Z
comments: false
author: Scott Williams
categories: []
---
<img src="./game.png?format=750w" alt="Game Image">

Recently I put together a basic iPad game for my girls (aged 5 and 2). It’s the first real<sup>1</sup> game I’d ever created and I found the process to be interesting enough to warrant some writing. I thought it might be fun for them to have a game that stars both of them exploring the house and finding treasure.

<strong>Thing 1.</strong> It was much easier than I thought it would be. I wanted it to have an 8 or 16 bit Zelda mechanic - top down view, dpad to move around. Turns out this is a road that has been well-trodden. I found some great tutorials and tools to make the process go fast. Of course, this didn’t prevent a couple of head-desk-smashing newbie mistakes, but overall wasn’t too bad.

Tools I found useful:

<a href="http://www.cocos2d-iphone.org/">Cocos2d</a> The engine that runs the game. I found their API to be pretty easy to understand.

<a href="http://www.mapeditor.org/">Tiled Map Editor</a> What I used to make the map. Kind of like how Photoshop works with layers.

<a href="http://www.codeandweb.com/texturepacker">Texture Packer</a> Used to make sprite sheets.

Lastly, I found the tutorials on <a href="http://www.raywenderlich.com/tutorials">raywenderlich.com</a> to be invaluable (though some of the sample code had typoes).

<strong>Thing 2.</strong> Making graphics is <strong>not</strong> my forté. I found a lot of decent sprites and tilesets to use, but modifying them was tedious. If I ever decide to make something to release commercially, I’ll definitely have to outsource the art.

After some poking around I ended up using a bunch of sprites from these two sources: <a href="http://yms.main.jp/page2/tilesets.html">Pixelated world</a> and <a href="http://untamed.wild-refuge.net/rmxpresources.php?characters">Sithjester</a>

<strong>Thing 3.</strong> My girls struggled with the virtual dpad. They are quite adept and using the iPad and other kids games (especially the Toca Boca ones), but couldn’t get the knack for the dpad. It is in the lower left corner, and my older daughter kept trying to tap it with her right hand, obscuring the screen. She also kept trying to control movement by swiping, which makes sense given her background with other apps. The character on screen was probably moving too quickly for her to track easily as well.

<strong>Thing 4.</strong> Despite Thing 3, both of them loved it. I made character sprites that resembled both of them, and recorded their voices and used them as sound effects. And the map kind of resembles our house too. We spent about a half hour taking turns while Mommy was making dinner.

What I discovered is that the programming and art for making a good, relatively simple game isn’t a big barrier; it’s using both of those within the boundaries of time to make a fun and compelling experience that is the challenge.

Ultimately, I had a lot of fun making it. Now that I have a good idea of what’s involved, I might try my hand at a real product to sell.

1. I’d made games way back in the day on my TI calculator in High School, but those used the TI Basic and therefore don’t count. I also made a pong clone using XNA one time.