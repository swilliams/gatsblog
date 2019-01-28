---
layout: post
title: "The Frustrations of the Journeyman"
date: 2013-12-02T00:00:00.000Z
comments: false
author: Scott Williams
categories: []
---
I was a .NET programmer from almost the beginning. I did a lot of work in 1.0 and 1.1, and was excited when things like <a href="http://msdn.microsoft.com/en-us/library/ms172192.aspx">generics</a> and <a href="http://msdn.microsoft.com/en-us/library/vstudio/0yw3tz5k.aspx">anonymous methods</a> showed up in 2.0, and <a href="http://en.wikipedia.org/wiki/Language_Integrated_Query">LINQ</a><sup>1</sup> rocked my world (and still does) in 3.5, and more syntactic good stuff in 4. But I often wondered what it would be like for someone new to .NET in 2013. It was easy to learn the new stuff as it came out; it always built on existing technologies and smoothed rough edges. But to jump in without having several years of background? What would that be like?

<img alt='"Leaving a Trail" by "las - initially" on flickr.' src="./4263948022_2fdefd3f93.jpg">
"Leaving a Trail" by <a target="_blank" href="http://www.flickr.com/photos/21561428@N03/4263948022/in/photolist-7uMRcd-b6p4Qr-b6p5oe-cnzrTo-948QCJ-dEXL2r-dEXLbF-c6yHFb-c6yHDY-c6yHCj-aSVejM-7YbeAL-aSVeuX-92Yzn4-bpYmH4-d4mkNQ-d4mkmb-ciQ4ZU-8qhCdU-adYqHx-8pSFUK-8DtDWD-dFQwJi-dv2x8q-aBf2MM-8DtDwa-7PPzpG-82Qzh9-hWMGHe-dFApof-88CUdB-99drcu-cHZFtW-cHZKDL-9DUicT-cHZGUj-aDU9T5-dLYbaP-eaVSMJ-edert3-ed8KLv-edeqP9-ed8KHD-eaVTHy-ed8KGe-eaVTiS-eaVTRy-ederxh-edeqHS-eaQgXc-edeqUb">"las - initially" on flickr</a>.

Well, now I know. I had grown kind of tired of .NET after doing it for ten years and needed a change. I decided to make the leap over the summer and focused on <a href="http://rubyonrails.org/">Rails</a> and iOS.

The most frustrating part of this changeup has been finding work that I want to do. I tried a bit of a moonshot and <a href="/2013/05/14/fear-of-falling-fear-of-failing-fear-of-rejection">tried to land a job at Github</a>. I did get an interview and it went pretty well, but they decided to go with someone with more experience in Rails. I don't blame them for that, they probably got dozens (or more) applications from people who had been working with it for years and could hit the ground running. Still was a bit of a bummer though.

The good news is that I'm having an easier time sliding back into Rails. Web development is mostly the same if you're using curly braces or not. I had done a big project in it a few years ago and all of the paying work I've had since the leap has been with Rails. I've learned how to <a href="https://github.com/swilliams/how-to-ride-a-dragon">write a DSL</a> and shipped some <a href="http://rubygems.org/">gems</a> and other nice things for my clients.

iOS is a tougher racket. It's has been around for about 5 years, but the underpinnings of it date waaaay back to <a href="http://en.wikipedia.org/wiki/NeXT">NeXT</a> in the 80s. Needless to say there have been quite a few updates to it over the years. Sometimes it feels like drinking from the firehouse to pick things up in it.

The worst part is that I know I'm missing stuff. When I was developing <a href="http://zartbonk.com">Zartbonk</a>, one of the earlier iterations wasn't working quickly enough to smoothly scroll across the screen. I happened to come across <a href="http://www.objc.io/issue-3/moving-pixels-onto-the-screen.html#opaque_vs_transparent">this section</a> in an <a href="http://www.objc.io/">obc.io</a> article and realized I wasn't setting the <code>opaque</code> property correctly on most of the views in the app. 5 minutes and a few checkboxes later I had a 10% boost in frame rate. It makes me wonder what other low hanging fruit are out there that I've missed.

That feeling can be demoralizing, but fortunately I know that coding is an iterative process, and there is measurable improvement in my iOS code just over a few months. I just wish I could download the whole Cocoa Touch library to my brain Matrix style.

<img src="http://i1.ytimg.com/vi/6AOpomu9V6Q/hqdefault.jpg">

Since that won't work, I'll just keep trucking. My first iOS app is pretty much done (with a few more fixes and features to add). I have a good idea for my second. As the reps increase, so will the quality, and so will the work.

1. Seriously guys, LINQ is one of the best language features I've seen, ever.