---
layout: post
title: "Porting DB5 to Swift"
date: 2014-08-12T23:41:51.000Z
comments: false
categories: code
---
I'm a big fan of using the [DB5 library](https://github.com/quartermaster/DB5) for customizing an iOS app via a [plist configuration file](http://en.wikipedia.org/wiki/Plist), and I've used it in several projects so far. I've also  been digging more into Swift and iOS 8 and thought it would be a good exercise to familiarize myself more with Swift to port DB5 from its original Objective C codebase to Swift.

The result is over on Github: [DB5-Swift](https://github.com/swilliams/DB5-Swift).

For grins, I wanted to go with a purely Swift approach, no NSWhatever classes unless there was no alternative. This meant using `Dictionary` instead of `NSDictionary`. Which turned into a bit of a headache. The biggest issue I ran into was that Swift's Dictionary doesn't seem to have an equivalent of NSDictionary's [`initWithContentsOfFile:`](https://developer.apple.com/library/mac/documentation/Cocoa/Reference/Foundation/Classes/NSDictionary_Class/Reference/Reference.html#//apple_ref/doc/uid/20000140-CBHBABID)<sup>1</sup>. Rather than try to parse the plist by hand, I just went back with good ole NSDictionary.

Two of Swift's headlining features are [type inference](https://developer.apple.com/library/prerelease/mac/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html#//apple_ref/doc/uid/TP40014097-CH5-XID_468) and [optional values](https://developer.apple.com/library/prerelease/mac/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html#//apple_ref/doc/uid/TP40014097-CH5-XID_478). I've used both of these features before in C# for several years and have appreciated what they bring to the table. Swift is a little bit different though because it comes with the history of Objective C and Cocoa. NSDictionary was built to take advantage of Objective C's type system, and using it with Swift involved more casting and ? and ! operators than I expected. It didn't help that Xcode would often be wrong in its helper tooltips, suggesting addtional !'s which wouldn't fix the problem.

I'm not entirely sure if DB5-Swift is 100% up to snuff right now. I think some of the methods should have better handling for nil values. I still have plenty of learning left before I'd consider myself adept at Swift. Overall, it was  a good exercise, and I will use it in future apps. 

<div class="footnotes">
<p><small>
1. Not necessarily true according to <a href="https://twitter.com/_lanceparker/status/499368493209239552">@_lanceparker</a> on Twitter.
</small></p>
