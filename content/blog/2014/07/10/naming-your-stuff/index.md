---
layout: post
title: "Naming Your Stuff"
date: 2014-07-10T20:17:05.000Z
comments: false
categories: code
---

Names are hard, especially for a framework or library. A good name is memorable, and can be a shot in the arm in terms of discoverability. Finding a good name is nebulous, and too often falls into the I'll-know-it-when-I-see-it category. But a *bad* name is easier to define. The biggest sin of bad names is that they are impossible to find answers when you run into questions.

I don't like to throw rocks at somebody else's hard work, but I think it's been enough time that I can gently criticize the name of the [Prototype JavaScript library](http://prototypejs.org/)<sup>1</sup>. Why was this a bad name? Well, what do you do when you run into a problem that isn't quickly found in the official documentation? Search for it on Google. Now, the term ["prototype" is a core part of the JavaScript language](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype), which meant that every single search result for "prototype X", "JavaScript prototype X", "prototype js X" or any other combination only referred to dealing with [prototypal inheritance in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain).

You may be the biggest fan of both The Simpsons and Ruby. Don't name your library "Homer". Again, what happens if someone runs into a problem when using Homer? They're going to try to search for "homer fix json serialization" and get a bunch of funnier Simpsons quotes. Your JSON parsing library is never going to be more popular than [Mr. Simpson](https://www.youtube.com/watch?v=khSIYmTzt6U), so please, pick something else.

Common words aren't necessarily bad. [Backbone](http://backbonejs.org/), [Underscore](http://underscorejs.org/), [Rails](http://rubyonrails.org/), [node](http://nodejs.org/), and [express](http://expressjs.com/) are all fairly common English words, but none of them are common enough to pollute search results. Spend a few minutes searching around before putting together your splash page.

<div class="footnotes">
<p><small>
1. In the war between Prototype and jQuery, I was in the former's camp for a long time. Prototype seemed like magic back in 2006 when I was coding AJAX manually. Searching for jQuery issues was never a problem though.
</small></p>
