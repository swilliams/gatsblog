---
layout: post
title: "SVN Report Generator"
date: 2008-09-27T00:00:00.000Z
comments: false
author: Scott Williams
categories: []
---
I have always hated writing status reports. Some of my past managers can attest to this. And since I'd always put them off to the last minute, I'd forget exactly what it was I'd been working on, and bosses don't like it when a status report consists solely of "I did stuff."

Since I am a programmer, I figured that computers could automate part, if not most, of the process for me. I generally prefer to use <a href="http://subversion.tigris.org/">SubVersion</a> as my Source Control Management system, and there is a handy api out there called <a href="http://pysvn.tigris.org/">pysvn</a>. Using this and the <a href="http://www.djangoproject.com/">Django web framework</a>, I cooked up a <a href="http://krazyyak.com/svnreport/">neat little application</a> that automatically creates a report based on the messages logged with each check-in. 

This is a 0.1 release, so it doesn't do a whole lot other than look pretty and make a report. But, here are some other features nonetheless:

* Works with a password protected repository, just enter the username and password (these are not stored).
* Intelligent date ranges. If you enter a start date and no enter, it assumes you want every check-in from that date on. Vice versa with end date as well. 
* Check-in messages can be formatted using the <a href="http://textism.com/tools/textile/">Textile</a> markup generator to look extra pretty.

Additionally, if and when bugs are discovered, they can be logged in <a href="https://swilliams.fogbugz.com/default.asp?pg=pgPublicEdit">FogBugz</a>. I do have a slate of features I want to implement in the next revision, but I'm not sure when I will have the time.
