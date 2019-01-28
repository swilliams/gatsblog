---
layout: post
title: "All that work"
date: 2010-08-05T00:00:00.000Z
comments: false
author: Scott Williams
categories: []
---
I'm using the awesome <a href="http://github.com/thoughtbot/paperclip">Paperclip</a> plugin in my <a href="swilliams">rails app</a>. One of the great selling points for it is that it will automatically resize images and create thumbnails for them. To do this, it needs the <a href="http://www.imagemagick.org/script/index.php">ImageMagick</a> library installed.

No worries, I headed over to their site and saw that the "best" way to install it is via <a href="http://www.macports.org/">mac ports</a>, a package manager similar to <a href="http://wiki.debian.org/Apt">Debian's apt</a>, but for OS X. 

So I headed over there, and downloaded the 100k installer for that. Only to see that it needed XCode as a dependency, roughly a 1 GB install.

<i>sigh</i>

So, I broke out the system DVD and installed XCode. And then mac ports. And then ImageMagick. Just so that I could resize an image programatically.