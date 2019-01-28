---
layout: post
title: "Combining if let and where in Swift"
date: 2016-05-05T17:55:32.000Z
comments: false
categories: swift
---
What I like about Swift is that it feels like a natural progression when learning more of the language's features. Case in point: I've known about the `where` keyword for a while, and have used it plenty of times before, but just found this little ditty:

```swift
if let someBool = someThing?.someBool where someBool {
  // do stuff if someBool is true
}
```

That will only execute the body of the statement if `someThing` is not nil and `someBool` is true. Before, I had thought that would've been two separate statements, and extra indenting. Kinda cool.