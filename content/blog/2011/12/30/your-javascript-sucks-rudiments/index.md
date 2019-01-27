---
layout: post
title: "Your JavaScript Sucks - Rudiments"
date: 2011-12-30T00:00:00.000Z
comments: false
author: Scott Williams
categories: []
---
> <em>You have to crawl before you walk. You have to punch before you can Hadoken.</em> – Abraham Lincoln

This post is most likely too simplistic for anyone who has done any kind of JavaScript development for a long time, but it’s always best to start at step 1.

## Do NOT Inline JavaScript Calls in Tags
See this?

<div>
  <div><pre>&lt;a href="#" onclick="DoSomething()" class="monkeys"&gt;</pre></div>
</div>

Don’t ever do that.

Why? For starters, it violates the separation of concerns. Your markup is your <em>Presentation</em>, JavaScript is not. Your JavaScript will manipulate the markup, but it is not markup itself.

There’s always a workaround for this too. Here’s the equivalent that is unobtrusive using jQuery (you <em>are</em> using jQuery right?):

<div>
  <div><pre>$('a.monkeys').click(DoSomething);</pre></div>
</div>

And you’d put that code with all the other JavaScript in a <code>.js</code> file.

## Keep It ALL Separate Anyways

Keep all of your JavaScript in separate <code>.js</code> files. This means not having any <code>&lt;script&gt;</code> tags that do not have <code>src</code> attributes. No sneaking in functions at the bottom of pages, or inlined in views.

Again, why? JavaScript hidden amongst HTML is hard to maintain. If you have a bug in a function, how do you find it? If your JavaScript is spread willy-nilly throughout everything, have fun tracking it down. This code is also hard to test; you’d have to pull in all of your markup into your test suite, which is precisely what you should not be doing for <strong>unit</strong> testing.

Additionally, you can’t minify inlined JavaScript, meaning you are literally slowing your app down by keeping it all spread out.

#### The Exception
The biggest exception I can think of for this rule is when you are pre-loading a bunch of data (preferably JSON). If your app is immediately making an AJAX request to retrieve data when the page loads, consider doing this to save the roundtrip:

<div>
  <div><pre>&lt;script&gt;
    myApp.someCollection = @ViewBag.SomeData
&lt;/script&gt;</pre></div>
</div>

## Watch Out for Globals
By default all JavaScript variables are in the global namespace. This is a Bad Thing. It means that this code right here:

<div>
  <div><pre>foo = function() {
    // blah blah blah
}</pre></div>
</div>

Will clobber any other globally named variable named <code>foo</code>. You can limit this with the <code>var</code> keyword:

<div>
  <div><pre>var foo = somethingSomething;</pre></div>
</div>

But, this is a discipline, because <em>every</em> time you forget the <code>var</code> you create a global object, even if you five layers deep in an object.

## Keep Your Functions Small

Open your JavaScript files, what’s the longest function in there? Clocking in somewhere around 100+ lines? Yeah, that’s probably too long.

It’s been said <a href="http://www.amazon.com/gp/product/0735619670/ref=as_li_ss_tl?ie=UTF8&amp;tag=thepetzoo-20&amp;linkCode=as2&amp;camp=1789&amp;creative=390957&amp;creativeASIN=0735619670">over and over again</a>: smaller routines breed fewer bugs. It seems to endemic to JavaScript to create prolific walls of code, going 10 levels of nesting deep. Break that stuff down into shorter functions, and your life will be a little easier.

Ok, like I said, these are just the basics. Once you start doing them, your code will get a little bit better. Not a whole lot better, but it’s a start. Now that we can walk a little bit (maybe with a limp) we can start to jog later.