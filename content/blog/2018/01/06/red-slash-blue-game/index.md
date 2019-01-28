---
layout: post
title: "Red/Blue Game"
date: 2018-01-06T22:37:07.000Z
comments: true
categories: 
---

My kids and I like to play with Nerf guns. My younger daughter in particular likes to sneak up behind people and shoot them in the back. [She's devious like that](https://youtu.be/3ebPsZl4k5k?t=13s). While running around and shooting each other can be fun, it does start to get a little boring after a while. 

So, we started to implement rules and make more of a contest out of it. We started with a little capture-the-flag, but that was still a little dicey, certain members of the family would either really want a particular stuffed animal to be the flag, while others definitely didn't want that one to be the flag ever ever ever ever. 

I was familiar with a simple game mechanic of capture points. Each team flips over a card-type thing to their color and they get points for that. The more capture points the better — it keeps everyone moving. If you get shot, you have to go back to your re-spawn point and start over. The catch was that keeping score was too tricky without some kind of impartial observer.

Being the coder that I am I whipped up something quickly for iOS and called it Red/Blue, for the two teams it had. It's a basic premise:

* When the app launches, choose how many minutes to play and tap Start.
* The game starts and displays a split screen with two different colors.
* When someone taps a color, ex. Red, a clock associated with Red starts to increment.
* When Blue is tapped, Red is paused, and Blue increments. I added some sound effects to denote when this happens. (it's just my voice saying "Red" and "Blue". My kids think this is hilarious.)
* When the main clock counts down to 0, the game is over and whichever color got incremented the most wins.

### Screenshots


<figure class="center">
    <img alt="Start Screen" class="halfsize border" src="https://github.com/swilliams/redblue/blob/master/readme-assets/redblue1.PNG?raw=true" />
    <figcaption>Start Screen</figcaption>
</figure>

<figure class="center">
    <img alt="Game Screen" class="halfsize border" src="https://github.com/swilliams/redblue/blob/master/readme-assets/redblue2.PNG?raw=true" />
    <figcaption>Game Screen</figcaption>
</figure>

<figure class="center">
    <img alt="End Screen" class="halfsize border" src="https://github.com/swilliams/redblue/blob/master/readme-assets/redblue3.PNG?raw=true" />
    <figcaption>End Screen</figcaption>
</figure>

This worked pretty well. We ended up pulling out old iPhones and iPads and laying them on flat surfaces and threatening all kinds of trouble if one of the kids moved or picked up a device. Ultimately we had four control points which led to all kinds of mayhem.

One thing we noticed was that it was annoying to start a round with the four control points we usually played with. Everyone would have to be by a device to manually start off each timer. A quick googling revealed that [Multipeer Connectivity is pretty easy to pull off](https://www.ralfebert.de/tutorials/ios-swift-multipeer-connectivity/). Another hour of coding and now all of the devices will start off when the first device hits start.

I do not plan to submit this to the app store. I just don't want to have to deal with it. The code is under an MIT license, so that you can do whatever you'd like with it.

**To install**

* You'll need [Xcode](https://developer.apple.com/xcode/) and an iOS device running iOS 10 or higher.
* [Clone or download the code from GitHub](https://github.com/swilliams/redblue).
* Open the `RedBlue.xcodeproj` file in Xcode.
* You may need to adjust the Signing stuff to get it to run on your own devices.
* Connect your device to your Mac.
* From the Product menu, select Run.
* Xcode will build the app and then install it on your device.

**Details**

* There are no tests. I should probably fix that. We'll see.
* Once a round starts there's no way to end it prematurely other than force-quitting the app. I don't think that's a big deal.
* The code could stand to be refactored a bit. I only spent a few hours on it so it's a little haphazard. [Patches are welcome](https://www.urbandictionary.com/define.php?term=patches%20are%20welcome) ;).

### In the future!

I may add other gameplay modes. Some sort of King of the Hill mode may be interesting, or chained control points (point 2 isn't enabled until point 1 is captured), or any number of other things, but I don't know if I'll ever get to that.

