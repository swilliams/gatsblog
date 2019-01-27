---
layout: post
title: "Magic Numbers"
date: 2009-11-04T00:00:00.000Z
comments: false
author: Scott Williams
categories: []
---
In programming, it is generally a good idea to avoid "magic numbers" meaning a number that could change with requirements:

```javascript
if (foo < 3) { do something }
```

That 3 could change, or it's meaning could be lost. A good practice is to define a variable for that magic number with an intelligent name (and possibly store the number in some configuration).

```javascript
const int maxWidgets = 3;
if (foo < maxWidgets) { do something }
```

I did recently see a bit of code that got the concept, but failed in the execution:

```javascript
const int THREE = 3;
if (foo < THREE) { do something }
```

It is possible that the maximum number of widgets might change to 10. Then you're stuck with this brilliant bit of code:

```javascript
const int THREE = 10;
```

Uh oh.