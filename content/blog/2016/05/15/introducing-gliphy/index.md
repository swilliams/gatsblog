---
layout: post
title: "Introducing Gliphy"
date: 2016-05-15T20:47:59.000Z
comments: false
categories: code swift open-source
---
I'm very happy to introduce a new open source library that I've been building. It's called [Gliphy](https://github.com/tallwave/gliphy) and it makes implementing [Dynamic Type](https://developer.apple.com/library/ios/documentation/StringsTextFonts/Conceptual/TextAndWebiPhoneOS/CustomTextProcessing/CustomTextProcessing.html#//apple_ref/doc/uid/TP40009542-CH4-SW65) on iOS with Swift a breeze.

Accessibility is one of those things that everyone knows they should be better at implementing, but falls to the wayside when deadlines are looming. I liked the idea of supporting Dynamic Type in the apps I write, but it was kind of a slog to implement it. There are two main ways to do it right out of the gate with what is built in to iOS, code and Interface Builder.

Let's go with code first. The easiest way to get the preferred font for a given text style. 

```swift
titleLabel.font = UIFont.preferredFontForTextStyle(UIFontTextStyleHeadline)
```
iOS will set whatever the "Headline" style is to your `titleLabel`'s font. If a user changes their default font size in Settings, it'll scale with that. 

Interface Builder makes it fairly simple too:

<figure>
    <img alt="Interface Builder" src="https://raw.githubusercontent.com/Tallwave/Gliphy/gh-pages/images/ib.png">
    <figcaption>Choose a style from the font menu in Interface Builder</figcaption>
</figure>

But there's a catch. If a user launches your app, then changes the font size, your app won't display any new changes until it has quit and is relaunched. You can watch for the `UIContentSizeCategoryDidChangeNotification` notification though and then re-render your text based views then<sup id="fnref:1"><a href="#fn:1" rel="footnote">1</a></sup>. So, regardless of your choice you'll have to code out *a lot* of labels, buttons, and text fields. In a normal app, that's hundreds of lines of boring code.

The other big downside is that you're limited to the system font. So, San Francisco on iOS 9 and Helvetica Neue on older versions. I like those fonts just fine, but sometimes you need to switch it up.

## BNRDynamicTextManager
I first came across [Big Nerd Ranch's](https://www.bignerdranch.com/) [BNRDynamicTextManager](https://github.com/bignerdranch/BNRDynamicTypeManager) library and found it to be pretty useful. You still have to wire up each field (or use subclasses), and you're still stuck with the system font, but it handled all the notification watching for you. Here's a sample: 

```objc
[[BNRDynamicTypeManager sharedInstance] watchLabel:label
                                         textStyle:UIFontTextStyleBody];
```

The library was lightweight and easy to understand<sup id="fnref:2"><a href="#fn:2" rel="footnote">2</a></sup>, which got me thinking.

## Gliphy
I decided to port BNRDynamicTextManager to Swift and see if I could add some functionality to it. Porting it wasn't a big deal, although I made a couple of changes to better match Swift's idioms. I then added a couple of nice features on top.

**Big Feature 1 — Custom Fonts**<br />
Watcher methods can take the name of a custom font:

```swift
DynamicTypeManager.sharedInstance.watchLabel(titleLabel,
                                             textStyle: UIFontTextStyleTitle1,
                                             fontName: "MarkerFelt-Thin")
```
This will apply the font size of the "Headline" style to your label, but keep the glorious MarkerFelt font. If the `fontName` is not associated with an installed font, it will fall back to the system font.

**Big Feature 2 — Custom Styles**<br />
iOS 7 brought us six text styles, and iOS 9 brought four more<sup id="fnref:3"><a href="#fn:3" rel="footnote">3</a></sup>. They cover a decent range of use cases, but sometimes you still want your own. You can do that with the `DynamicFontRegistry` class:

```swift
// This could be in AppDelegate, some custom Theme class, or wherever
DynamicFontRegistry.registry.addTextStyle("UIFontTextStyleReallyReallyBigTitle",
                                          scaledFrom: UIFontTextStyleHeadline,
                                          byFactor: 4)
```
In order to keep with the feel of how Dynamic Type works, you pick a style to serve as a base reference for the new one and then scale it from there. That way you don't hardcode a point size. You can then watch it the same way you would before:

```swift
DynamicTypeManager.sharedInstance.watchLabel(titleLabel, 
                                             textStyle: "UIFontTextStyleReallyReallyBigTitle"", 
                                             fontName: "MarkerFelt-Thin")
```

**Big Feature 3 — Global Styles**<br />
I liked how it was working now, but it was still a long process to cover all the text based views that could be in an app. I wanted a solution that would make it super easy to handle the 90% scenario. Enter the `StyleWatcher` and `StyleConfig` constructs. The `StyleWatcher` will recursively examine each subview in a parent view and watch them with the `DynamicTypeManager` if they have a text style associated with them. That way you can set up the text-styles solely UI within Interface Builder and remove an entire swath of code. Additionally, you can set a global style that the watcher will use to find your custom font (or style).

```swift
// AppDelegate
// Setting up the global styles
StyleWatcher.defaultConfig.label[UIFontTextStyleTitle1] = "MarkerFelt-Thin"
StyleWatcher.defaultConfig.label[UIFontTextStyleTitle1] = "MarkerFelt-Thin"
StyleWatcher.defaultConfig.textField[UIFontTextStyleBody] = "Avenir-Light"
```
Once that has been set up, tell the watcher to watch a view:

```swift
// In some View Controller
let watcher = StyleWatcher()

override func viewDidLoad() {
    super.viewDidLoad()
    watcher.watchViews(inView: view)
}
```
And the magic will happen. 

You can customize that process too. The `watchViews` method can take its own `StyleConfig` as well, allowing you to define multiple different styles and applying them where necessary.

I'm pretty happy with the way Gliphy turned out. The [code](https://github.com/tallwave/gliphy) is pretty straightforward too; no mind bending swiftisms required. There are some downsides though. Attributed strings aren't handled at all, and due to their nature, they probably will never be. Gliphy only watches four kinds of views: labels, buttons, textfields, and textviews, (plus their subclasses) and is a little difficult to extend beyond that.

All said though, it should make supporting Dynamic Type something more than an afterthought in your apps.


<div class="footnotes">
  <ol>
    <li class="footnote" id="fn:1">
  <p>There is a bug in the iOS simulator and Xcode 7.3. You can change the font size, but the notification will not fire. It still works on a device though.</p>
</li>
<li class="footnote" id="fn:2">
  <p>I raise my glass to <a href="https://github.com/jgallagher">jgallagher</a> for that.</p>
</li>
<li class="footnote" id="fn:3">
  <p>Here they are:
  <ul>
    <li>UIFontTextStyleHeadline</li>
    <li>UIFontTextStyleSubheadline</li>
    <li>UIFontTextStyleBody</li>
    <li>UIFontTextStyleFootnote</li>
    <li>UIFontTextStyleCaption1</li>
    <li>UIFontTextStyleCaption2</li>
    <li>UIFontTextStyleTitle1</li>
    <li>UIFontTextStyleTitle2</li>
    <li>UIFontTextStyleTitle3</li>
    <li>UIFontTextStyleCallout</li>        
  </ul>
  </p>
</li>
  </ol>
</div>
