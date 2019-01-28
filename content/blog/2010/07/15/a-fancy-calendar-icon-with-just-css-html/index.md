---
layout: post
title: "A Fancy Calendar Icon With Just CSS & HTML"
date: 2010-07-15T00:00:00.000Z
comments: false
author: Scott Williams
categories: []
---
I'm finally starting to realize just some of the <a href="http://graphicpeel.com/cssiosicons">really neat stuff</a> you can accomplish with just HTML and CSS. Recently, I needed to make a simple calendar widget to display what day something occurs. I ended up with this, which I think looks pretty snazzy:Again, no images were used at all. So how does that work? Let's first walk through the HTML: 

<div><pre>&lt;div class="calendar"&gt; 
    &lt;span class="month"&gt;Jul&lt;/span&gt;
    &lt;span class="day"&gt;31&lt;/span&gt;
&lt;/div&gt;</pre></div>

Obviously, this doesn't get us much, but it does set the stage for customizing things with CSS. Here's a quick rundown to get the right layout:

<div>
  <div><pre>html { font-family: Helvetica, Arial; }
        .calendar { width: 54px; height: 60px; font-size: 0.8em; background: #eee; border: 1px solid; }
        .calendar &gt; span { display: block; }
        .calendar &gt; .month { text-align: right; padding: 2px 5px 2px 0; }
        .calendar &gt; .day { text-align: center; font-weight: bold; font-size: 2.3em; }</pre></div>
</div>

I got the 54 pixel width by playing around until I found something I liked. The background and border are temporary placeholders, just so that we can get a feel for how everything will look. That yields us this:

That's fairly serviceable, but rather boring. It would make for a decent element on the periodic table, but we're aiming for that high-falutin Web 2.0 stuff. Let's add a little more color to drive home the point.

<div>
  <div><pre>.calendar &gt; .month { background: #6086a6; color: #fff; font-weight: bold; }
    .calendar &gt; .day {  background: #fff; }</pre></div>
</div>

This gives us a little more in the aesthetics department, and a couple of years ago, we'd either have to stop here, or start slicing things up and using images for backgrounds. But now with CSS3, we can add rounded corners, gradients, and a bunch of other great effects. Further, the nice thing about this approach is that it degrades gracefully in older browsers. They don't get the pretty effects, but like I said, that widget is good enough, and it provides them a <em>gentle</em> push to upgrade.

First, let's round off those sharp corners.

<div>
  <div><pre>.calendar { 
        -webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px; 
    }
    .calendar &gt; .month { 
        -webkit-border-top-left-radius: 5px; -moz-border-radius-topleft: 5px;
        -webkit-border-top-right-radius: 5px; -moz-border-radius-topright: 5px;
        border-top-left-radius: 5px; border-top-right-radius: 5px;
        }
    .calendar &gt; .day {
        -webkit-border-bottom-left-radius:  5px; -moz-border-radius-bottomleft:      5px;
        -webkit-border-bottom-right-radius: 5px; -moz-border-radius-bottomright:     5px;
        }</pre></div>
</div>

Now, if you aren't familiar with CSS3, you might not know what the "-webkit" and "-moz" prefixes are. CSS3 still hasn't been completely nailed down, but the browser makers wanted to start implementing features without waiting for the standards committees to finalize everything. So, they added their own implementations. Safari, Chrome, and other webkit based browsers use "-webkit". Mozilla based browsers (Firefox) use "-moz". Opera uses "-o" (and it's omitted here for length, and also because nobody uses Opera). Internet Explorer... <span>sucks</span> doesn't really do CSS3 at this juncture. Technically it uses it's own special filter syntax, and with a little bit of googling, you can find it too.

Anyways, back to our widget. We have to add the top and bottom radii to the .month and .day elements because their backgrounds will bleed over the calendar rounded corners and look ugly. Additionally, the border doesn't work so great with the rounded corners, so get rid of it. We can do something better than it anyways, the box-shadow.

<div>
  <div><pre>.calendar {
        box-shadow: 0 0 5px #05587e; -moz-box-shadow: 0 0 5px #05587e; 
        -webkit-box-shadow: 0 0 5px #05587e;
        }</pre></div>
</div>

That gives us a nice glowy look all the way around the widget.

Looking better! But there is still a little more we can do. Let's change the background to a gradient.

<div>
  <div><pre>.calendar &gt; .month { text-shadow: 0 1px #000;
        background: -webkit-gradient(linear, left top, left bottom, from(#acc0d1), to(#6086a6));
        background: -moz-linear-gradient(top, #acc0d1, #6086a6);
        }
                                         
    .calendar &gt; .day { text-shadow: 0 1px #fff;
        background: -webkit-gradient(linear, left top, left bottom, from(#405b72), to(#e6e6e6), color-stop(.08,#f9f9f9));
        background: -moz-linear-gradient(top, #f9f9f9, #e6e6e6);
        }
</pre></div>
</div>

This gives us the nicer looking backgrounds. Additionally, the text-shadows make the text feel slightly more 'etched'. It probably isn't something you'd want to use all over the place, but here it looks good.

There you have it! With a bit of CSS3, you can really turn up the heat on your HTML, and even ditch the tedium of sizing and uploading gradients.

I uploaded the whole source to <a href="http://github.com/swilliams/CSS3-Calendar-Widget">github</a>, which might be a little overkill for something this small, but I'm trying to start doing more thing in the public square.