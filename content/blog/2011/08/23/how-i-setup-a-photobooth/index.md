---
layout: post
title: "How I Setup a PhotoBooth"
date: 2011-08-23T00:00:00.000Z
comments: false
author: Scott Williams
categories: []
---
First, a Demo Video<sup>1</sup>

I was slated to take some pictures for my <a href="http://hsministry.com/">church’s high school group’s</a> kick off for the new school year. They gave me the opportunity to either walk around and take “action” shots and candids, or to set up a “booth” and do more posed portraits (with goofy props and such). The booth is typically just a backdrop and a flash or two for lighting.

I wasn’t terribly keen on the booth idea: it get’s a little boring after a while. But, the kids typically love that kind of stuff, so I didn’t want to just abandon it. Sure I could have switched hats and jumped back and forth between the two, but after thinking for a bit, I realized that I could do <em>both</em> using the magic of computers!

My idea was pretty basic: just set up a camera on a tripod and have some sort of remote trigger that the kids could just hit. The trick is to make it easy enough for anyone to use. Here’s the equipment I went with:

* I used my Nikon D300.
* A tripod to put the camera on. I have a Manfrotto something or another.
* Lighting &amp; Backdrop. I just used a single flash and a 45” shoot through umbrella. Backdrop was just a 9’ wide white seemless.
* Computer. Had a 24” iMac available.
* “Trigger” I ended up using an Apple Magic Trackpad.
* Software. I’ll get into this in a bit.

I used the iMac because it could handle all the triggering stuff, and also display the results so that the subjects could immediately see themselves.

The user interaction needed to be as simple as possible: The subject pushes the trackpad button. The computer counts down 5 seconds, takes the picture, displays it for a few seconds, then goes back to the countdown screen for the next shot.

For the trigger, my original thought was to get something like the <a href="http://en.wikipedia.org/wiki/Easy_button#Advertising">Staples “Easy” button</a>. The only similar things I saw online were buttons that could only open a browser and go to a specific URL. And you had to buy a hundred at a time… So that wasn’t going to work. I’m not much of a hardware guy so the thought of hacking something didn’t appeal to me.

After some pondering, I realized that the <a href="http://www.apple.com/magictrackpad/">Magic Trackpad</a> was really just one big button. The trick was going to be how to get a click from that to trigger the camera. I first looked into using <a href="http://www.adobe.com/products/photoshoplightroom/">Adobe Lightroom</a>. It supports tethered shooting right out of the box, and it works pretty well (I use it for 99% of my photo management and editing). The problem is that I don’t want to expose the whole of Lightroom to a kid who just wants to take their picture. Putting a sign up that said “Move the mouse to the gray circular button next to the esoteric camera settings and click it. And please don’t mess with anything else.” wasn’t really an option.

Fortunately Mac OS X has all kinds of scripting support. If you know what you’re doing, you can simulate just about anything. There’s something called <a href="http://developer.apple.com/library/mac/#documentation/AppleScript/Conceptual/AppleScriptX/AppleScriptX.html">AppleScript</a> built in to the system that is designed for something just like this<sup>2</sup>. I figured I could use AppleScript to trigger the tether button in Lightroom to take a picture.

This is when I hit my first big snag. I can’t say for certain, but it looks like the shutter release button isn’t actually a <strong>button</strong>, or at least it’s not recognized by OS X as a button element. This means that you can’t tell AppleScript to click it. There are ways to ask an app to tell you all of its textfields, labels, buttons, etc, and LightRoom wasn’t giving up the goods for that particular one. My best guess is that the programmers at Adobe couldn’t get the traditional OS X button to look the way they wanted it to, so they drew it their own way, captured the mouse click and then triggered the shutter release based on the mouse coordinates. Long story short, that button is simply <strong>not</strong> accessible via scripting.

After some googling around, I found a nifty little app called <a href="http://www.mountainstorm.co.uk/?page_id=100">StudioTether</a>. It is a tiny app whose UI is just a single button that triggers the shutter release on the camera. <em>And</em> it was accessible via AppleScript. Here’s the <a href="https://gist.github.com/1154621">script</a> I ended up going with.

The trick is to get that script to fire every time the Trackpad was clicked. Now, I am a software developer by trade, so this sounded more up my alley. I thought that if an app could stretch to the full screen of the monitor, then no matter where a person clicked, I could capture that event and then call the AppleScript, which would then trigger the camera.

Still with me? Good because then it got complicated. I had never actually written software specifically for the Mac, so this was a first for me. I could dedicate several blog posts about my experiences learning <a href="http://developer.apple.com/technologies/tools/whats-new.html">Xcode</a>, Objective C, and the <a href="http://developer.apple.com/technologies/mac/cocoa.html">Cocoa framework</a>. I was able to stumble through though, taking somewhere between 20-30 hours, and the result is pretty slick.

The camera settings weren’t too exotic. I used an aperture of <em>f</em>/5.6. In my normal portraiture I prefer wider, but the margin of error in terms of where the subjects could stand was bigger, I stopped it down a bit. However, this also meant that there was less light coming into the camera. I didn’t want to blast my flash at full power each time, since that would chew up the battery and drastically length the recharge time, so I bumped the camera’s ISO up to 800. This enabled the flash to be at 1/4 power. ISO 800 isn’t ideal, but doesn’t impact image quality too much on a D300.

I normally shoot photos in RAW mode as well, but decided to use JPG here, at medium quality. The purpose of the whole thing is to just be plain fun for students; nobody was going to be wanting 20x30” blow-ups of these. This also had the benefit of keeping the filesize down, meaning that the images were transferred to the computer and displayed faster.

Nothing is perfect, of course. Because the nature of the TrackPad is to manipulate the cursor, it would sometimes register the user action as a drag, rather than click, and not do anything. If someone just mashed their hand (or fist, sigh) on it, that would sometimes not register as well. The perfect solution to that problem is to get a big “Easy” type button, but as mentioned, I can’t seem to find one that’ll work.

Aside from those small things, it was a rousing success. Over 400 pictures were taken in just a couple of hours. Every time I walked by, people were having a fun time and taking multiple pictures.

1. Video done by my friend, <a href="http://blog.everlyfilms.com/">Jay Worsley</a>. If you need a video made, look him up.
1. AppleScript is generally a poorly written programming language, but it does work pretty well for scripting UI elements.