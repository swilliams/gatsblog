---
layout: post
title: "The Madness of Errors in Swift"
date: 2015-01-22T03:18:43.000Z
comments: true
categories: swift coding
---

Let's take a common scenario. You are making an HTTP request and are checking the response for an error. If there is one, you'd like to post a notification and let some error handler deal with it. 

```
        Alamofire.request(.GET, someURL).response { (request, response, data, error) in
            if error != nil {
                let userInfo = ["error": error]
                let nc = NSNotificationCenter.defaultCenter()
                nc.postNotificationName("HTTPERROR", object: nil, userInfo: userInfo)
            }
        }
```
Uh oh, there's a compiler error on the `userInfo` argument with the message "Extra argument 'userInfo' in call". Huh? [`postNotificationName` definitely allows for a `userInfo` parameter](https://developer.apple.com/library/ios/documentation/Cocoa/Reference/Foundation/Classes/NSNotificationCenter_Class/index.html#//apple_ref/occ/instm/NSNotificationCenter/postNotificationName:object:userInfo:). Maybe it's a hidden typing error? According to the docs `userInfo` is supposed to be an optional dictionary like of type: `[NSObject : AnyObject]`. My key is a String which is bridged from `NSString`, which is an `NSObject` and `NSError` is also an `AnyObject`, so what gives? 

<figure class="center">
    <img alt="Lying" src="/images/assets/xcode-lying-cat.jpg">
    <figcaption></figcaption>
</figure>

After banging my head on the wall for a while I remembered that the `error` variable from [AlamoFire](https://github.com/Alamofire/Alamofire) is an optional. Therefore, the correct declaration for `userInfo` is to unwrap the error:

```
let userInfo = ["error": error!]
```

And voilà, no more compilation errors. 

"Extra argument 'userInfo' in call" is a crappy error message. The proper one should have been something about values in the `userInfo` dictionary not being optional.

Swift is full of these unfortunately. Between these and your friendly SourceKit crashes it's getting untenable. My wish for 2015 is for Apple to address these shortcomings.