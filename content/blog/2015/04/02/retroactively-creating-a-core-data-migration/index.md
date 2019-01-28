---
layout: post
title: "Retroactively Creating a Core Data Migration"
date: 2015-04-02T17:15:15.000Z
comments: false
categories: cocoa swift
---
Let's take a *completely hypothetical* situation where you're developing an app that uses [Core Data](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/CoreData/cdProgrammingGuide.html) for the local storage and have a bunch of beta testers eagerly awaiting the next version before your product launch. Your previous attitude towards the data model was something along the lines of *"It's still pre-1.0, I'm not bothering with migrations yet, just delete and reinstall, c'mon."* However, you forgot that requiring the beta testers to deal with that isn't exactly a friendly experience for them, and you made at least three changes to the data model since your last Beta release. Now if they run the app it'll crash immediately because the database isn't in sync with the data model.

Oops.

Usually when you make changes to the data model, you do so by creating a new version and telling the `NSPersistentStoreCoordinator` to perform lightweight migrations, *then* make your changes. Adding a new version of the data model after changes were made accomplishes nothing. Fortunately, you're not screwed. We're going to jump back in time, grab the old data model then pretend it was there all along.

Your `MyProject.xcdatamodeld` file is actually a directory. If you browse it in the Finder or Terminal, you'll see more folders inside it, one for each version of your model. Inside those folders is a file simply called `contents`. This is an XML representation of the editor you see in Xcode.

### Step 1 — Find the data model from the last beta version you released
Look through the history the `xcdatamodeld` file in your source control system <sup id="fnref:1"><a href="#fn:1" rel="footnote">1</a></sup>. Hopefully you've been tagging all of your releases and can just checkout that specific one.

```
> git checkout 1.0-beta4
```

If not, you can mess around with `git log` to figure out where to go. This snippet can help you see the commits for a single file:

```
> git log --pretty=format:'%h : %s' --graph -n 45 FILENAME
```

Then, checkout the particular commit with the right version.

### Step 2 — Copy the contents file
Find  the `contents` file within your `.xcdatamodeld` file. Copy all that XML somewhere safe.

Go back to your `HEAD` or wherever you were.

### Step 3 — Create the new version of the data model
If you didn't know, the process is:

* Open the `.xcdatamodeld` file in Xcode
* In the Editor menu, click "Add Model Version". Follow the instructions.
* Open the File Inspector for your `.xcdatamodeld`. There is a Model Version segment in the inspector, make sure it's on the version you just created.

Now you have two data models that are identical. Let's change the history on the original one.

### Step 4 — Change history
Close Xcode. That's not mandatory but I've had it crash when mucking about with these files, and it's just not worth the hassle.

Open the `contents` file for the **original** `.xcdatamodeld` in a text editor.

Paste in the version you created in Step 2.

Open Xcode. If you haven't set up the `NSPersistentStoreCoordinator` to run migrations, do so now. [This tutorial is pretty good](http://www.raywenderlich.com/27657/how-to-perform-a-lightweight-core-data-migration).

Now when the app runs, the migrations update the users' data and keep things from crashing.

Note: This is for *lightweight* migrations. Custom migrations are more complicated. [objc.io](http://www.objc.io/issue-4/core-data-migration.html) has a great article on these. I don't know if you can play fast and loose with the data model file like you can here though.

<div class="footnotes">
  <ol>
    <li class="footnote" id="fn:1">
  <p>You ARE using Source Control, right? Sometimes new developers will ask me why they need Source Control. I usually parrot the usual answers - branching is good, undo mistakes, tool integration, etc - but situations like this are where it really shines. Without source control here, you'd be hosed. You'd have to manually fix the XML in the contents file, which would be monumentally hard or altogether impossible depending on what changed and how good your memory is.</p>
</li>
  </ol>
</div>