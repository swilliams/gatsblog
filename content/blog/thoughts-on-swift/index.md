---
layout: post
title: "Thoughts on Swift"
date: 2014-09-10T15:24:30.000Z
comments: false
categories: code
---
<figure class="center">
    <img src="/images/assets/swift-logo.png" alt="Swift Logo" />
    <figcaption></figcaption>
</figure>

Swift is a new language developed by Apple. I've been using for a few side projects. 

On my first glance, I thought Swift would be a great language for beginners. I'm not 100% sure if that's still the case. A beginner language should push you into a positive feedback loop: do something, see it work, do some more, and so on. Swift and Xcode 6 do some of this with aplomb, especially with playgrounds, but I found some features of the language can be frustrating until you have a deeper understanding of what's going on.

Optionals are the biggest part of that. They're kind of crazy at first. Lot's of ?'s and !'s running around. When I was starting with Swift, Xcode would constantly complain that I was missing one. Sometimes it would tell me which one was missing, but sometimes it didn't. After reading the documentation a little more and thinking about it, things started to click. Handling nil values is important in any language, and handling them poorly can lead to some truly marvelous bugs or security issues. Swift makes you face them much earlier in the process. I think this is a good thing, though it can make for a frustrating start. It's also made me think if I'm handling nils properly in other languages I use.

I'm still working on my own personal style, but I think I should be using more computed properties. A rule I'm toying with is to keep on making methods for "verbs" like `moveFileToThing`, but use properties for "nouns" like `allSampleAssets`, even if that property makes several other calls within its implementation. This might require renaming certain methods in order to better comply with that style; if `allSampleAssets` took a `sort` parameter it couldn't be a property, so I'd rename it to `queryAllSampleAssets(sort: NSSortDescriptor)`.

Even though it's a brand new thing, there is still a good amount of Objective C and Cocoa baggage. The standard collections use `AnyObject` where `id` used to be, which means you'll need to do some explicit casting to the type you need. I found it easier when dealing with an `NSDictionary` or `NSArray` to not try to cram all the casting and then manipulating into a single line of code. 

Enums have reams of power that could be used for evil. I like the way [NSScreencasts uses enums with JSON parsing](http://nsscreencast.com/episodes/130-swift-json-redux-part-1), but it's hard to comprehend. If you have more of a functional programming background, I suspect this would be easier.

Swift is going to be huge. I think Apple does have a language on its hands that'll last for its next 20 years. There are still some rough edges and potential pitfalls, but It has become the language I prefer when creating iOS apps.
