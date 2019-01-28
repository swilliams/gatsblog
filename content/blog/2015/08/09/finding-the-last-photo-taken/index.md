---
layout: post
title: "Finding the Last Photo Taken"
date: 2015-08-10T02:40:43.000Z
comments: true
categories: code
---

Getting the last photo taken is a convenient feature to have in your app when dealing with photo picking. Prior to iOS 8, you could get it by using the [Assets Library Framework](https://developer.apple.com/library/ios/documentation/AssetsLibrary/Reference/AssetsLibraryFramework/index.html#//apple_ref/doc/uid/TP40009730) and then [looping through the various groups](http://stackoverflow.com/a/10200857/736) to get the right photo.

In iOS 8, the Asset Library is still available, but Apple introduced a new framework to go along with [Photos.app](http://www.apple.com/osx/photos/). It's creatively called the [Photos Framework](https://developer.apple.com/library/ios/documentation/Photos/Reference/Photos_Framework/index.html#//apple_ref/doc/uid/TP40014408) and it makes certain things, such as querying for the recent image much easier. To further entice you to use it, the Assets Library is deprecated in iOS 9.

Here's a function that'll get the most recent photo with the Photos Framework:

```swift
import UIKit
import Photos

// I like to typealias my blocks, makes for easier reading
typealias ImageCallback = (UIImage? -> Void)

func fetchLastPhoto(resizeTo size: CGSize?, imageCallback: ImageCallback) {
    let fetchOptions = PHFetchOptions()
    fetchOptions.sortDescriptors = [NSSortDescriptor(key: "creationDate", ascending: false)]
    
//        fetchOptions.fetchLimit = 1 // Available in iOS 9

    if let fetchResult = PHAsset.fetchAssetsWithMediaType(.Image, options: fetchOptions) {
        if let asset = fetchResult.firstObject as? PHAsset {
            let manager = PHImageManager.defaultManager()
            let targetSize = size == nil ? CGSize(width: asset.pixelWidth, height: asset.pixelHeight) : size!
            manager.requestImageForAsset(asset,
                targetSize: targetSize,
                contentMode: .AspectFit,
                options: nil,
                resultHandler: { image, info in
                imageCallback(image)
            })
        } else {
            imageCallback(nil)
        }
    }
}
```

There's a fair amount going on in there. First, we create a [`PHFetchOptions`](https://developer.apple.com/library/prerelease/ios/documentation/Photos/Reference/PHFetchOptions_Class/index.html#//apple_ref/occ/cl/PHFetchOptions) object which we can use to pass in additional information to filter the query. In this case we only need to sort by `creationDate` descending. iOS 9 introduces `fetchLimit` which could reduce a bit of overhead since we know we only need 1 image.

`PHFetchOptions` also has a `predicate` property that has a bunch of interesting capabilities, such as restricting the search to specific `mediaSubtypes` like `PhotoHDR` or `PhotoPanorama`. If you want all photos just ignore it; that's determined later. Do note that *"Photos does not support predicates created with the `predicateWithBlock:` method."*.

Once we have our options we are ready to query. The Photos Framework gives you access to 3 types of things that are stored in Photos.app: `PHAsset`, `PHAssetCollection`, and `PHCollectionList`. We only care about [`PHAsset`](https://developer.apple.com/library/prerelease/ios/documentation/Photos/Reference/PHAsset_Class/index.html#//apple_ref/occ/cl/PHAsset) right now. A `PHAsset` is a representation of the media stored on the device (photo or video). The other two are ways to group those assets in general.

Querying happens through class-level methods on the `PHAsset` class. There are [a few to choose from](https://developer.apple.com/library/prerelease/ios/documentation/Photos/Reference/PHAsset_Class/index.html#//apple_ref/doc/uid/TP40014383-CH1-SW2), but we want `fetchAssetsWithMediaType:options:`. This returns a [`PHFetchResult`](https://developer.apple.com/library/prerelease/ios/documentation/Photos/Reference/PHFetchResult_Class/index.html#//apple_ref/occ/cl/PHFetchResult) which is kinda like an `NSArray`, but not exactly. In Swift it's filled with optional `AnyObject`s. The first one should be the most recently created file so we cast it to a `PHAsset`.

Now comes the time to convert that `PHAsset` into what we really want: a `UIImage`. This is the responsibility of [`PHImageManager`](https://developer.apple.com/library/prerelease/ios/documentation/Photos/Reference/PHImageManager_Class/index.html#//apple_ref/occ/cl/PHImageManager). 

Most of the time when querying for images, we just want to resize the photo to fit into a `UIImageView` so Photos does most of the heavy lifting for you. Give it the size you want and a couple other options and off it will go. This happens asynchronously, so hand off the results to your callback block when it's done. This'd be especially handy for generating a bunch of thumbnails.

Photos gives you quite a bit of flexability. We didn't touch on how it helps you to edit assets, manage/query video, or observe changes to photos. I wasn't aware of this framework until today, but it looks like a powerful one worth getting to know if you do anything with the images on your device.