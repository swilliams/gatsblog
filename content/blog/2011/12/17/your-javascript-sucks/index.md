---
layout: post
title: "Your JavaScript Sucks"
date: 2011-12-17T00:00:00.000Z
comments: false
author: Scott Williams
categories: []
---
JavaScript has been getting a lot of press lately. You can write <a href="http://nodejs.org/">servers</a> with it, talk to <a href="http://www.couchbase.com/">databases</a>, and of course, it’s the most <a href="http://javascript.crockford.com/popular.html">common language</a> in the world. Yet, in its most popular form, client-side scripting on the Internet, it’s just a giant mess.

You know what I’m talking about, that mass of thousands of lines of code that does something-but-oh-God-I-hope-it-doesn’t-break. I’ve written that kind of JavaScript. You have too. It’s a big problem that needs to be addressed.

## Why?
First, let’s identify the problems. Here’s a function that I just made up, but it’s not too far from the truth.

Fig 1 - A Common Site

How many differentthings are going on here? I can see four right off the bat. <em>Individually,</em> each is not a Bad Thing, but when they’re all within the same function, it’s a problem.

Fig 2 - Event Binding. We’re looking for something in the DOM, and then attaching an event handler to it.

Fig 3 - AJAX. Specifically, communication with our persistance layer.

Fig 4 - Business Logic. This a simplification, but we’re analyzing the data and making a logical decision based on it.

Fig 5 - DOM/UI Manipulation. We’re not just reading the DOM here, but changing it.

And this little ditty is only 11 lines long. This is the equivalent of inlining your security checks right next to SQL statements, all within a UI template. God help you if you want to actually uncovered a bug in this rat nest down the road.

And let’s not even get into testing. How would you even start writing a unit test for this function? (Hint: it sucks)

## Enter MVC
Fortunately, messy code is not a new problem. There is an embarrassment of riches out there to help you get your crap together.

The MVC pattern has been around since the neolithic era of programming. Rails, Django, ASP.NET MVC, CakePHP, etc. have been making developers’ lives much easier on the server side for years. And now, some of that has trickled down to JavaScript.

A common reaction.

What makes MVC so popular amongst developers is that it forces you to break your code down into manageable chunks. Mixing AJAX calls and DOM Manipulation in the same functions just doesn’t fly there.

And, you have a bunch to choose from. In future posts, I’ll be giving a brief description of some of the popular ones. Spoiler: I myself have been using <a href="http://documentcloud.github.com/backbone/#">Backbone</a> and will be going into deeper detail on that one.