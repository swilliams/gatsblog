---
layout: post
title: "How I Finally Understood Functional Programming With JavaScript"
date: 2013-05-06T00:00:00.000Z
comments: false
author: Scott Williams
categories: []
---
Functional programming has always been a bit of a mindbender for me. I’ve read plenty of tutorials on the subject, but it wasn’t until recently that it finally started to click for me.

The basics of partial function application involves something like this.

<pre class="source-code"><span>var</span> <span>slice</span> = <span>Array</span>.<span>prototype</span>.<span>slice</span>; <span>// just to simplify things</span><br><span>var</span> <span>partial</span> = <span>function</span>(<span>fn</span>) {<br><span>var</span> <span>args</span> = <span>slice</span>.<span>call</span>(<span>arguments</span>, <span>1</span>);<br><span>return</span> <span>function</span>() {<br><span>return</span> <span>fn</span>.<span>apply</span>(<span>this</span>, <span>args</span>.<span>concat</span>(<span>slice</span>.<span>call</span>(<span>arguments</span>)));<br>  };<br>};</pre></div></div></div></div>

Bwah?

What this does is take a function as a parameter. It then takes all the other parameters and hangs on to them. It returns another function, that when called, executes that first one, with the original arguments <em>and</em> any new ones you pass in.

Bwah?

Let’s use a primitive example to try to unwind this thing.

<pre class="source-code"><span>var</span> <span>add</span> = <span>function</span>(<span>a</span>, <span>b</span>) {<br><span>return</span> <span>a</span> + <span>b</span>;<br>};<br><br><span>var</span> <span>add5to</span> = <span>partial</span>(<span>add</span>, <span>5</span>);</pre>

Now when you call <code>add5to(3)</code> you’ll get 8. Yes, this will always add 5 to whatever you supply to it. Yes, it is absolutely useless.

This is where a lot of tutorials stop, leaving you to think “OMG WHO CARES?!” and then get back to doing important things, like stamp collecting.

And that’s where I stopped for the longest time too. But then when I watched <a href="http://vimeo.com/43382919">this video</a> a light came on to realize that this could be <em>useful</em>. You can use it to build a pretty nice DSL that creates nested DOM elements.

Let’s say you have a function called <code>el</code> that takes  <code>tagName</code>, <code>attributes</code>, and <code>content</code> as parameters.

<pre class="source-code"><span>var</span> <span>el</span> = <span>function</span>(<span>tagName</span>, <span>attributes</span>, <span>content</span>) {<br><span>// snip</span><br>};<br><span>var</span> <span>element</span> = <span>el</span>(<span>“div</span><span>”</span>, {<span>className</span>: <span>‘foo</span><span>’</span>, <span>id</span>: <span>‘bar</span><span>’</span>}, <span>“Hi</span> <span>I</span><span>’m</span> <span>a</span> <span>div</span>!<span>”</span>);<br><span>// results in:</span><br><span>// &lt;div id=“bar” class=“foo”&gt;Hi I’m a div!&lt;/div&gt;</span></pre>

Let’s also say that if you leave out <code>attributes</code>, it treats the second parameter as <code>content</code>.

<pre class="source-code">    <span>el</span>(<span>“p</span><span>”</span>, <span>“Call</span> <span>me</span> <span>Ishmael</span>.<span>”</span>);<br><span>// &lt;p&gt;Call me Ishamel.&lt;/p&gt;</span></pre>

That in itself is a little useful, but here’s where partial function application comes in. Cram <code>el</code> into <code>partial</code> and stuff starts to get real.

<pre class="source-code"><span>var</span> <span>div</span> = <span>partial</span>(<span>el</span>, <span>“div</span><span>”</span>);<br><span>var</span> <span>element</span> = <span>div</span>({<span>className</span>: <span>‘foo</span><span>’</span>, <span>id</span>: <span>‘bar</span><span>’</span>}, <span>“Hi</span> <span>I</span><span>’m</span> <span>a</span> <span>div</span>!<span>”</span>)</pre>

In fact, we can quickly make functions for many HTML tags.

<pre class="source-code"><span>var</span> <span>DOM</span> = {};<br>[<span>“div</span><span>”</span>, <span>“p</span><span>”</span>, <span>“ul</span><span>”</span>, <span>“ol</span><span>”</span>, <span>“li</span><span>”</span>].<span>forEach</span>(<span>function</span>(<span>t</span>) {<br><span>DOM</span>[<span>t</span>] = <span>partial</span>(<span>el</span>, <span>t</span>);<br>});</pre>

Now you can string a bunch of stuff together.

<pre class="source-code"><span>var</span> <span>list</span> = <span>DOM</span>.<span>ul</span>(<br>            [<span>DOM</span>.<span>li</span>(<span>“one</span><span>”</span>), <br><span>DOM</span>.<span>li</span>(<span>“two</span><span>”</span>), <br><span>DOM</span>.<span>li</span>(<span>“three</span><span>”</span>)]);</pre>

Theeeeen, take into account something like <code>map</code> and you can really start to make some magic.

<pre class="source-code"><span>var</span> <span>people</span> = [{<span>name</span>: <span>“Scott</span><span>”</span>}, {<span>name</span>: <span>“Bob</span><span>”</span>}, {<span>name</span>: <span>“Barry</span><span>”</span>}];<br><span>var</span> <span>names</span> = <span>people</span>.<span>map</span>(<span>function</span>(<span>p</span>) {<span>return</span> <span>DOM</span>.<span>li</span>(<span>p</span>.<span>name</span>); });<br><span>var</span> <span>list</span> = <span>DOM</span>.<span>ul</span>(<span>names</span>);</pre>

All of a sudden you have a quick list of DOM elements with names of people in them. You can refactor that out some more, but I wanted to just focus on just the <code>partial</code> bit of this.

When would be a good time to use this? When you have a bunch of functions that act similarly but vary slightly on parameters.

The power of this lies in that you can take an incredibly simple function, and then use it to build complex mechanisms out of it. I’m still nowhere near an expert on this, but I think this time the wrinkles in my brain may just sink in.