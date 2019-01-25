---
layout: post
title: "Private Extensions in Swift"
date: 2015-12-11T18:08:59.000Z
comments: true
categories: code, swift
---
Here's a quickie. In Swift, the default [accessor](https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/AccessControl.html) for strcutures is `internal`, meaning that it is available to everything else within the module. You can change this by adding `private` or `public` in front of them like so:

```swift
private class Foo {
}
```

`private` means that the construct is only available within the same file. I just "discovered"<sup id="fnref:1"><a href="#fn:1" rel="footnote">1</a></sup> that you can also mark an [Extension](https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Extensions.html) as `private`, which I hadn't considered before. This let's you add functionality to a struct or class that may be useful in the current context of everything within that same file, but doesn't make sense elsewhere.

For example, in a [HealthKit](https://developer.apple.com/healthkit/) project you may be only dealing with fluid ounces for an `HKQuantitySample` and converting all the time is a bit of a pain. You don't necessarily want to make a `quantityInOunces` computed variable  available on the whole app, but in a specific file where you're computed all those ounces, it makes sense.

```swift
private extension HKQuantitySample {
	var quantityInOunces: Double? { /* blah */ }
}

class HealthKitManager {
	func doStuff() {
		// Calculate a bunch of ounces easy peasy.
	}
}
```

<div class="footnotes">
  <ol>
    <li class="footnote" id="fn:1">
  <p>Couldn't think of a better word, but yeah I'm regular Vasco de Gama.</p>
</li>
  </ol>
</div>