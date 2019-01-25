---
layout: post
title: "Tracking Down an EXC_BAD_ACCESS in Swift"
date: 2015-03-31T18:05:51.000Z
comments: true
categories: swift, programming
---

Managing memory has become easier. Things like [ARC](https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/AutomaticReferenceCounting.html) take away much of  what was once a painful and bug-ridden task. Things are not always panacea of course; it is still far too possible to do the wrong thing and access memory you are not supposed to and receive the dreaded `EXC_BAD_ACCESS` error. 

Today I was working on a project in Swift. And despite my [appreciation]() of the language, the tooling still remains... *suspect*. I have covered that topic a [couple](http://blog.swilliams.me/words/2015/01/21/the-madness-of-errors-in-swift/) of [times](http://blog.swilliams.me/words/2014/10/30/dealing-with-xcode-and-swift/) before.

Sometimes it's obvious where the problem is based on the call-stack. This time it was not so obvious. The problem occurred at the end of a series of steps in a wizard when all the prior screens were finally being released from memory. From what I could tell the error was when one of the view controllers that represented one of the steps in the wizard was being deinitialized, but otherwise I couldn't immediately see where the problem was.

In Objective C you can turn on what's called ["NS Zombies" mode](https://developer.apple.com/library/ios/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/MemoryManagementforYourApp/MemoryManagementforYourApp.html), which keeps objects allocated (as a special "Zombie" object) and then raises warnings you try to access one of those Zombie objects. In my experience this has not worked quite was well with Swift. With Zombies mode enabled the app ran fine without crashing, but also didn't raise any warnings about accessing bad memory. It was a [Heisenbug](http://en.wikipedia.org/wiki/Heisenbug)!

<figure class="center">
    <img alt="Heisenberg" src="./heisenberg.jpg">
    <figcaption>Eh, close enough</figcaption>
</figure>

Next I started to play around with the code thinking that I was improperly handling the lifecycle of some of the properties of several classes. I changed around some lazy properties and made certain other things optional, but this was just wheel spinning.

I backed up and reviewed the callstack again. The last frame before explosion was now at `swift_unknownWeakRelease` in a helper class referenced by the offending ViewController. This helper had this property:

```
// SearchBarHelper.swift
private unowned let searchBar: UISearchBar
```

I then re-checked the [documentation for `unowned`](https://developer.apple.com/library/prerelease/mac/documentation/Swift/Conceptual/Swift_Programming_Language/AutomaticReferenceCounting.html).

> If you try to access an unowned reference after the instance that it references is deallocated, you will trigger a runtime error. Use unowned references only when you are sure that the reference will always refer to an instance.

> Note also that Swift guarantees your app will crash if you try to access an unowned reference after the instance it references is deallocated. You will never encounter unexpected behavior in this situation. Your app will always crash reliably, although you should, of course, prevent it from doing so.

That `searchBar` was originally defined as an `IBOutlet` on the ViewController:

```
// ViewController.swift
@IBOutlet weak var searchBar: UISearchBar!
```

The lights turned on. *Of course* it was crashing. An outlet that's a weak property can and will be deallocated when the controller referencing it is no longer visible. I forgot about that when I created the other class to manage certain characteristics about that search bar. So, the `searchBar` was released at some point, and when the helper was next called (in deallocation) part of its representation in memory was an `unowned` property that was nil, a state it cannot be in. Thus, `EXC_BAD_ACCESS`.

The solution was simple, I still didn't want `SearchBarHelper` to have ownership of the `searchBar`, so I changed it to a weak optional.

```
// SearchBarHelper.swift
private weak var searchBar: UISearchBar?
```

Success! 

Takeaway lesson: read and understand the documentation. Memory and how it is handled is still something that absolutely must be understood if you want to manage it well.