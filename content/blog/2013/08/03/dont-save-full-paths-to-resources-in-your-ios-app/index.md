---
layout: post
title: "Don't Save Full Paths to Resources in Your iOS app"
date: 2013-08-03T00:00:00.000Z
comments: false
author: Scott Williams
categories: []
---
Don't save full paths to resources in your iOS app<sup>1</sup>. 
I'm working on an iPad application, and this just bit me pretty hard.

Your application lives in a directory kind of like this: <code>/blah/blah/blah/Applications/EE8E3EBF-A7A9-4680-81D0-BB5E7DFE859E/Thing.app/</code> That big old string of capital letters and numbers is a <a href="http://en.wikipedia.org/wiki/Guid">GUID</a>, which means that your app is guarenteed to have its own unique folder in the file system. What I <strong>didn't</strong> know was that this will change every time you update the app. This behavior doesn't happend during development/debugging.

I was storing the whole path to audio files in a database<sup>2</sup>, so when I released a second beta to my testers, all their clips from the first beta stopped working and caused crashes because the app was looking for files in paths that no longer existed.

The fix was to only store the filename of the audio because the whole path could just be generated at runtime, and then migrating everyone's data to the new way (which also was bug prone).

1. Don't ever accuse me of burying the lede.
1. This would've happened if those values were stored in a plist, xml file, or anywhere.