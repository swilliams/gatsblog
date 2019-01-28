---
layout: post
title: "RVM Tip When Working on Rails With Multiple Consoles"
date: 2010-09-09T00:00:00.000Z
comments: false
author: Scott Williams
categories: []
---
I've been meaning to test out Rails 3 ever since <a href="http://weblog.rubyonrails.org/2010/8/29/rails-3-0-it-s-done">it was finally released</a>. But I didn't want to deal with the issues of having concurrent versions of Rails 2.3.x and 3 running side by side. The word on the street is that <a href="http://rvm.beginrescueend.com/">RVM handles them both well</a>.

<a href="http://rvm.beginrescueend.com/rvm/install/">RVM itself is relative easy to set up</a>. Although, I should note that trying to run the source-head version (from github) on my laptop caused errors... Running the latest rvm tarball did the trick though. (#2 on that list linked)

I installed both Ruby 1.8.7 and 1.9.2 in RVM, and installed the Rails 3 gem on the 1.9.2 install. Everything went smoothly here.

Now to sidestep for just a second: I like to have multiple terminal tabs running when developing in Rails. One just runs the local dev server, one will run <a href="http://rspec.info/">autospec</a> (or the Rails console), and another [one or two] is the utility one for running various shell commands.

So I was in a second terminal tab and wanted to just create a new scaffold with:

```
&gt; rails generate scaffold User name:string email:string
```

This generated a brand new rails app in a new folder called 'generate'. What gives? I double and triple checked my syntax to make sure it was correct. It was. I stopped the web server in the other tab and ran the same command there. Bingo, worked like a charm. Argh!

Finally the light turned on. <em>You need to run RVM in each tab/window. </em>Since RVM is a virtual environment, that state doesn't persist in different sessions.

```
&gt; rvm use 1.9.2
&gt; rails generate scaffold User name:string email:string
```

Makes sense once you realize what's going on, but was rather frustrating before that point was reached.