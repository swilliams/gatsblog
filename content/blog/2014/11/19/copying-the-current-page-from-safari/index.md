---
layout: post
title: "Copying the Current Page From Safari"
date: 2014-11-19T20:22:16.000Z
comments: false
categories: script
---
If I'm preparing a bunch of links for a blog post or something, it'd speed things up if I could hit a button and have the computer do everything for me. Here's an [AppleScript](https://developer.apple.com/library/mac/documentation/AppleScript/Conceptual/AppleScriptLangGuide/introduction/ASLR_intro.html) to do just that. 

```applescript
tell application "Safari"	set theURL to URL of current tab of window 1	set theTitle to name of current tab of window 1	set the clipboard to "[" & theTitle & "](" & theURL & ")"end tell
```

That'll copy the URL and title of the current tab in Safari as a nicely formatted [Markdown](http://daringfireball.net/projects/markdown/) link. I tied that into a [Keyboard Maestro](http://www.keyboardmaestro.com/main/) shortcut, so that I can quickly make the link with ⌘⌥⌃C, then paste it into whichever document I'm working in.

This'll probably work with Chrome too, but I don't know how much it supports AppleScript.