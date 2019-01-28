---
layout: post
title: "TFS versus Open Source"
date: 2007-08-31T00:00:00.000Z
comments: false
author: Scott Williams
categories: []
---
As I've stated before, I haven't had the opportunity to use <a href="http://www.krazyyak.com/category/tfs/" title="My ongoing TFS experience">TFS</a> in my programming lifetime yet. One of the things that has struck me about it is shear cost of all the stuff that is needed. TFS <a href="http://msdn2.microsoft.com/en-us/library/ms400745(VS.80).aspx" title="TFS hardware requirements">requires</a> a server OS, a SQL Server database, and "prefers" to run on an Active Directory domain. Even on the cheap that easily tops $5,000. There are certain open source products that can provide similar functionality, so for a small business is the extra cost worth it?</p> <p>Before we answer that question, let's compare the "stacks." For argument's sake, let's assume that the goal is to produce a high quality .NET based application, and that Visual Studio 2005 is the base product used in development<sup><a href="#34_footnotes">1</a></sup>.

For the supplementary server based components, some flavor of Linux would satisfy. <a href="http://www.mysql.com">MySQL</a> or <a href="http://www.postgresql.org">PostgreSQL</a> could serve as a database supporting <a href="http://www.bugzilla.org">BugZilla</a> or <a href="http://www.mantisbt.org">Mantis</a> for bug tracking. I have already spoken about <a href="http://www.krazyyak.com/2007/07/20/open-source-and-the-user-experience/" title="SubVersion's superior experience">SubVersion</a> as an excellent Source Control Management system, but you could certainly also use <a href="http://www.nongnu.org/cvs/" title="CVS kind of sucks, use SubVersion instead">CVS</a> or whatever else strikes your fancy.

Back in Windows land <a href="http://www.nunit.org">NUnit</a> or <a href="http://www.mbunit.com">mbUnit</a> can more than adequately run unit tests, and <a href="http://cruisecontrol.sourceforge.net">CruiseControl.Net</a> combined with <a href="http://nant.sourceforge.net">NAnt</a> or <a href="http://msdn2.microsoft.com/en-us/library.0k6kkbsd.aspx" title="MSBuild Reference">msbuild</a> can create a build system. Lastly, there is <a href="http://www.gotdotnet.com/Team/FxCop/">FxCop</a> and <a href="http://ncover.org">nCover</a> for code analysis and coverage (the former was even originally built by Microsoft!).

For standard development, there isn't a whole let else you need for a project's lifecycle. So, what does the $5-$15,000 price tag give you over open source?

For starters, TFS does wrap all of those things up into one central location - Visual Studio. In the OSS world, you'll have to switch through multiple apps to get the same functionality. This can be annoying, and does take a little while to get everything set up properly<sup><a href="#34_footnotes">2</a></sup>.

Additionally, TFS does make it easier for non-programmers to have more input in the project. In my experience, email has been shoehorned as the "great" management tool; tasks are assigned, documents are passed around, bugs are tracked, and so on. Needless to say, this tends to be catastrophic. TFS, combined with SharePoint does take great lengths to make this work better, <em>for the non-developer</em>.

My feelings right now are mixed - there are certain aspects of TFS that I really like, and some that I do not. I don't think that it is possible to render <strong>final judgement</strong> on anything until I get a little more experience with it. So stay tuned!

1. Yes, you could even use something like <a href="http://www.icsharpcode.net/OpenSource/SD/" title="An open source dot net IDE">SharpDevelop</a> for even more open source, but if you are so gung ho about OSS, why are you using .NET in the first place? <a href="#34_1">Â«</a>
2. Of course, the installation for TFS ain't exactly <em>easy</em> itself. <a href="#34_2">Â«</a>
