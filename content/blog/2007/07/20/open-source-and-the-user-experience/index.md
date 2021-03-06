---
layout: post
title: "Open source and the 'user experience'"
date: 2007-07-20T00:00:00.000Z
comments: false
author: Scott Williams
categories: []
---
In the past, I have been rather unkind to open source projects. Some of my criticisms may not have been valid, but one thing that I feel still holds is my beef with the "user experience." I use quotes because that expression sounds an awful lot like marketing-speak, which I try to avoid, but can't think of a better term.

What I mean is that it is an all too common trend in open source projects to put forth a titanic effort to code the software, but an abysmal one to make it user friendly and to document it well.

Just recently, I needed to implement some form of complicated logging in an application I was tasked with. Most suggestions on the web pointed to the open source library <a href="http://logging.apache.org/log4net/" title="log4net homepage">log4net</a>. Those recommendations did come with a word of warning though that it was a little heady to jump right into. But, since time was of the essence, I threw myself off from the high dive and into the deep-end.

Those guys were right.

Log4net is a very robust and extensible logging framework, and it performs well, but it took me the better part of a day and a half to figure out how have it write to Oracle and properly extend the formatters to my fit my will. The documentation is what we in the industry call "sparse." It provides some very basic examples and then just chucks the API at you and throws you to the wolves.

Contrast that with something like <a href="http://subversion.tigris.org/" title="SubVersion homepage">SubVersion</a>. SubVersion may not be the greatest Source Control Provider out there, but it has <a href="http://tortoisesvn.tigris.org/" title="Tortoise">TortoiseSVN</a>. The Tortoise UI makes managing a repository of code brain dead simple; even a non-programmer(!) could do it. Installation is easy: a typical windows installer package that requires the standard amount of clicks to get up and running. The app itself is built right into the Windows shell; just right-click and there you are!

Perhaps most importantly though, the <a href="http://svnbook.red-bean.com/">documentation</a><a href="#21_1"><sup>1</sup></a> was up to snuff. No, more than that, it was superb! It sounded like a <em>real</em> human being wrote it, not a coder! I actually wanted to read the thing. Additionally I learned a thing or two about code management in general, not just pertaining to SubVersion.

I'd bet that one of the reasons SubVersion is so popular is because it manages to hold the user's hand without treating him like a child. From what I can tell, <a href="http://git.or.cz/" title="Git homepage">git</a> is a pretty powerful competitor to SubVersion, but until it has as nice an interface as Tortoise, it will never see as high of an adoption.

I would argue that the single greatest hurdle that the open source movement still needs to overcome is the notion that their audience is not just the geeky programmers huddled up in their caves. It is a tricky line to walk though, too much hand-holding is just as big of a product killer as too little.
<div> <a></a>1.  This may not be the fairest comparisons, the "documentation" for SubVersion was originally published as a real book by O'Reilly. However, my underlying point about documentation still stands. <a href="#21_1_orig">Â«</a>
