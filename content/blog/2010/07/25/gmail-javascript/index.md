---
layout: post
title: "GMail & JavaScript"
date: 2010-07-25T00:00:00.000Z
comments: false
author: Scott Williams
categories: []
---
> At the USENIX annual conference last month, Gmail engineer Adam de Boor surprised the audience by <a href="http://www.computerworld.com/s/article/9178558/Google_to_use_HTML5_in_Gmail" target="_blank">noting</a> that the company's Gmail service was written entirely in JavaScript, and that all of its code, around 443,000 lines worth, was written by hand.

Via <a href="http://www.pcworld.idg.com.au/article/354210/google_executive_frustrated_by_java_c_complexity/">PC World</a> and <a href="http://news.ycombinator.com/item?id=1546933">Hacker News</a> (of course).</div>

I'm a little skeptical of that line count on JavaScript though. I really thought that <a href="http://code.google.com/webtoolkit/">GWT</a> was created specifically for GMail. Regardless, that's a pretty astounding size for JavaScript. I truly want to know what tools they use to write and manage that much, since in my experience, once you hit several thousand lines, it starts to become a pain to manage/debug/maintain.