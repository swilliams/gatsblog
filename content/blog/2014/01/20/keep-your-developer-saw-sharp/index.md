---
layout: post
title: "Keep Your Developer Saw Sharp"
date: 2014-01-20T00:00:00.000Z
comments: false
author: Scott Williams
categories: [development]
---
<figure>
    <img alt='"Dremel Moto Jig Saw" from Pete Prodoehl on Flickr' src="./5184600234_a99779ddc1_z.jpg">
    <figcaption><a href="http://www.flickr.com/photos/raster/5184600234/">"Dremel Moto Jig Saw"</a> from <a href="http://www.flickr.com/photos/raster/">Pete Prodoehl</a> on Flickr</figcaption>
</figure>

If you're a software developer, you need to make sure your skills are up to date. If you don't, you're doing yourself a disservice.

This is important for several reasons. First, it keeps you marketable. There's no such thing as true job security. You might be a vitally important cog in an esoteric process at a corporation, but could still be laid off if certain numbers in an executive's spreadsheet don't come out in your favor. Even though it's a buyers' market for software developers right now, you might suddenly find yourself looking down the pointy end of an interview table needing to answer a question about something that you always meant to study up on, but never did.

Things change, and practices that were once standard aren't any more. In fact, they can be dangerous. For example, I was on a project with a client's DBA who hadn't really kept up with the times. He would've been a really good SQL Server DBA if it were still 1998. His design for the project included making just under 400 tables, with no fewer than 20 joins for any query. Since the application was very heavily data driven, things bogged down under even light loads. The performance caused many long nights and weekends and "aggressive conversations" with managers at the client.

It can be **expensive**. The problems in the above anecdote could've been avoided by adopting a [less normalized](http://stackoverflow.com/a/460296/736) approach in the database. Yes, data would've been duplicated, but hardware has gotten *so* much cheaper it's financially irresponsible not consider just buying faster stuff. You could save $10,000 on a new server, but if you're paying a team of consultants billing $1,000/hour for *weeks* of work, [you chose poorly](http://www.youtube.com/watch?v=-DGFuHC75aY).  If StackOverflow got away with just [2 database servers in 2011](http://highscalability.com/blog/2011/3/3/stack-overflow-architecture-update-now-at-95-million-page-vi.html), you can probably do just fine with one.

It makes team dynamics better. I've been a consultant of some form or fashion for nearly seven years now. I've seen good projects, and I've seen bad ones. Bad communication and skill mismatches are traits of projects that go south. When developers are on the same page it makes for much easier conversations. For example, if you are a web developer, I shouldn't have to repeatedly explain what [REST](http://en.wikipedia.org/wiki/REST) is in 2014, no matter what platform you're using.

You'll become a better programmer seeing if the grass is greener elsewhere. If all you know is .NET, then you only know the .NET way of doing things. I've taken to [iOS development recently](http://blog.swilliams.me/words/2013/12/16/i-made-an-app), and at a recent client I used a pattern I learned from working with [UITableViews](https://developer.apple.com/library/ios/documentation/uikit/reference/UITableView_Class/Reference/Reference.html) to do something awesome in JavaScript. Had I never attempted learning Objective C, that wouldn't have happened.

Are you a .NET web developer? Try learning something like [Rails](http://guides.rubyonrails.org/getting_started.html), or [Node](http://nodejs.org/about/), or [Python](https://docs.djangoproject.com/en/1.6/intro/overview/). Rails developer? Try Node, or maybe [iOS](https://developer.apple.com/devcenter/ios/index.action) or [Android](http://developer.android.com/sdk/index.html). Mobile developer? Try web development, or a competing platform. Maybe even go with a neckbearded technology like [Clojure](http://clojure.org/). The things you learn from moving outside your environment will only benefit you in your day job.
