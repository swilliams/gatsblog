---
layout: post
title: "Setting Up CouchDB on Windows"
date: 2009-09-17T00:00:00.000Z
comments: false
author: Scott Williams
categories: []
---
From their <a href="http://wiki.apache.org/couchdb/Installing_on_Windows">wiki</a>:</p>

* Install the cygwin environment.
* Install the MS C compiler.
* Install and possibly build a number of pre-requisites, such as curl, icu, seamonkey, etc.
* get the sources to erlang and couch
* configure and build erlang according to the instructions.
* configure and build couch according to the <a href="http://svn.apache.org/viewvc/couchdb/trunk/README?view=co" class="external" rel="nofollow"><img src="http://wiki.apache.org/wiki/modern/img/moin-&lt;a%20href=">www.png</a>" height="11" alt="[WWW]" width="11" /&gt; README file in couch</p>

> After executing 'make install', you will find a couchdb directory structure inside your erlang directory - that is, the couch build process simply installs its libraries into the erlang binaries you previously build. This directory structure should be ready to roll - it can be zipped up, packaged by an installer, etc.

Why not just say "Don't Install this on Windows"?