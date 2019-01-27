---
layout: post
title: "Quick Tech Tip - Rails & Authlogic"
date: 2010-06-23T00:00:00.000Z
comments: false
author: Scott Williams
categories: []
---
I was following along with the <a href="http://github.com/binarylogic/authlogic_example">example project</a> for getting AuthLogic setup on a Rails app, and almost immediately got this error when running <span>UserSession.find</span>:

> Couldn't find User Session without an ID

After poking around a little bit, I realized that I accidentally set the UserSession model to inherit from the default <span>ActiveRecord::Base</span> rather than <span><span>Authlogic::Session::Base</span></span><span>.</span>

Changing it to use the proper base class fixed the problem.