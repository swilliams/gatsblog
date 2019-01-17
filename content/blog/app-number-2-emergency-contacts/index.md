---
layout: post
title: "App #2 - Emergency Contacts"
date: 2014-11-06T21:16:17.000Z
comments: true
categories: apps, shameless-marketing
---
I made [another](http://blog.swilliams.me/words/2013/12/16/i-made-an-app/) App(!)

<figure class="pull-right">
    <img alt="Emergency Contacts screenshot" src="/images/assets/ec-screenshot.png">
</figure>

It's called [Emergency Contacts](http://emergencycontacts.org/) and is available for your iOS 8 device. It's a real fast way to display information that might come in handy when things go bad. You can display an emergency contact, medical information, or whatever you'd like in three rows of text. It displays as a widget on the [Today View](http://www.imore.com/how-use-today-view-widgets-ios-8).

[Get it now for just $0.99](https://itunes.apple.com/us/app/emergency-contacts-ice-widget/id931010448?ls=1&mt=8). Read on if you want to hear the origin story.

The idea originated from my mother-in-law. She is new to the iPhone and asked me if there was a way to display an emergency contact, since she had something like that in her old feature-phone. Other than adding text to your wallpaper (which is pretty cheesy) I didn't have an answer. About an hour later it hit, *hey, I bet it would be real simple to put that stuff on the Today screen.*

It took about 3 days of programming time, most of which was sunk by fighting with [Xcode+Swift issues](http://blog.swilliams.me/words/2014/10/30/dealing-with-xcode-and-swift/), and iOS 8 bugs<sup>1</sup>. Probably another day or so to put together a simple website and icon. Then about 4 excruciating hours of getting all the screenshots necessary for the App Store.<sup>2</sup>

I don't expect this to make me rich, but felt it would be worth at least a few days of my time. I hope you like it.

<div class="footnotes">
<p><small>
1. Ever wanted to hide one of the navigation buttons on a `ABPeoplePickerNavigationController`? <a href="http://openradar.appspot.com/radar?id=5234709428699136">You used to be able to in iOS 7, not so much in 8</a>.
</small></p>
<p><small>
2. You have a 3.5" device, a 4" device, a 4.7" device, and a 5.5" device. And nowadays you can't have anything in the status bar for a screenshot. You can't just crop it out though. So, once you've gone to the effort of setting up the same state on 4 devices, you have to crack open Photoshop and properly airbrush out the status bar. This is extra fun when doing a Today View screenshot, because everything is nice and blurry underneath the status bar, and a giant black rectangle would be every noticeable. Even with just 2 screenshots per device, I wanted to die so bad.
</small></p>
</div>
