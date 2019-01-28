---
layout: post
title: "Amusing Bad Programming Tip"
date: 2010-04-27T00:00:00.000Z
comments: false
author: Scott Williams
categories: []
---
Say you have a class with a property that's a <span>string</span>. Using object initializers you can do this little nugget:

```C#
  Product p = new Product { ProductName = Console.ReadLine() };
```

It will work as you'd expect (prompt you for input, then assign it to ProductName. <em>However</em>, that's pretty easy to miss when you're quickly scanning code. I'm generally in favor of fewer lines of code, but in this case it would be good design to just break this into two lines.