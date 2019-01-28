---
layout: post
title: "Migrating from Squarespace"
date: 2014-03-05T16:23:18.000Z
comments: false
categories: [code]
---

Squarespace is a popular service to host a website or blog. You might have seen their [Super Bowl commercial](http://www.youtube.com/watch?v=S0Or1f_RxKQ) or heard about them on one of the hundred podcasts they sponsor. I signed up about a year and a half ago and used it as my main blog. I've decided to move away and use [Octopress](http://octopress.org) to host my blog on [GitHub Pages](http://octopress.org/) instead.

Why? Well, for starters, it's slow to use. I think it's a byproduct of the way they organized their [single-page application](http://en.wikipedia.org/wiki/Single-page_application) architecture. I find myself having to wait for things to open in modal windows, or to load another menu. 

The layout tools are bad. If all you do is write text and link to stuff, this doesn't matter. Sometimes I like to have [in depth coding posts](/2014/01/26/demystifying-ruby-dsls) that have multiple blocks of code within them. This is incredibly painful to do with the Squarespace layout tools. Here's the process:

 1. Hover over an existing text block.
 2. Click the appropriate "+" button.
 3. Scroll down to find the "CODE" button.
 4. Paste in the code (after making sure the indentation is correct)
 5. Go to step 1 and this time, select Markdown.
 6. Rinse and repeat for *every* block and image you want.

What you see is *definitely not* what you get. Sizing images to align to the left or right of a paragraph is awful. For some reason, the editing font on the admin page is different than the one on the actual site. This means that even if everything lines up on the admin page, it might not on the live site. Fixing this is tedious. Again, due to the single-pagedness of the admin site, you can't easiliy open the preview in a new tab or window ('Open in new page' does nothing). You need to open a brand new browser window, navigate to your admin site, then click on the preview button there.

Saving a post in the editor closes the modal that contains it. This means that the workflow for making any kind of adjustment is:

 1. Do the thing above to get a second window open to look at the preview.
 2. Click the post in the first window to edit.
 3. Wait a second.
 4. Find the typo to fix. This is extra fun if you have multiple blocks of text.
 5. Fix the typo and hit save. (Modal closes)
 6. Switch over to the preview in the second window and refresh.
 7. If it's not right, repeat steps 2-6 until it is.

All of this for about $100/year (or more).

Octopress is a static site generator that is aimed at developers. If you don't know [Markdown](http://daringfireball.net/projects/markdown/), [git](http://git-scm.com/), as well as HTML + CSS consider something else. However, since I am familiar with all of those, it works for me.

The problem is exporting my content from Squarespace. The only export option available is one for [Wordpress](http://wordpress.org/), which dumps everything into an XML file. Since I'm not using Wordpress, this didn't work for me. My blog has been quite the sojourner, created orginally on Wordpress, then to Posterous (lol), and finally Squarespace. It's accumulated a bit of cruft. For some reason, older posts did not export properly; if they contained an image and text, the text was deleted.

After some fiddling, I put together a [script](https://github.com/swilliams/squarespace-exporter) that would walk each post on the blog, download everything and then move onto the next. I did run into some gotchas though:

 * Some of the older images were named "#img.jpg". I ended up [generating](https://github.com/swilliams/squarespace-exporter/blob/master/script.rb#L151) a random string for the filename and removing the hashtag.
 * `<img>` tags used a `data-src` attribute instead of a standard `src` attribute. [The fix was to rename the attribute](https://github.com/swilliams/squarespace-exporter/blob/master/script.rb#L181).
 * There was a veritable boatload of extra markup and attributes on each post, which made things look weird. I ended up parsing the entire HTML of each post and [stripping](https://github.com/swilliams/squarespace-exporter/blob/master/script.rb#L223) out all the unnecessary stuff.

There are still some issues that I'll need to address on a case by case basis, but it's a good 80% solution right now.

<figure>
    <img src="./octopress.png" alt="Octopress" />
</figure>

I like Octopress because it is fast, easy for me to manage, and keeps my content in a simple (and portable) format. I just hope that this will last me for a while. It doesn't do nearly as many things as Squarespace, but most of those I don't need.
