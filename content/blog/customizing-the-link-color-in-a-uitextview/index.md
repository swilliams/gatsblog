---
layout: post
title: Customizing the Link Color in a UITextView
date: 2013-08-07T00:00:00.000Z
comments: false
author: Scott Williams
---
[UITextView's](http://developer.apple.com/library/ios/#documentation/uikit/reference/uitextview_class/Reference/UITextView.html) can automatically detect URLs and treat them accordingly. This is a *nice* feature, but when you start to customize your UI, you might run into this situation:

<figure>
    <img alt="eww" src="/images/assets/badpopover.png">
    <figcaption>Ewwwwww</figcaption>
</figure>

That contrast between the background and foreground colors makes it pretty hard to read. A quick poke through the docs and on [StackOverflow](http://stackoverflow.com/questions/1350423/can-i-change-the-color-of-auto-detected-links-on-uitextview) reveals that there isn't any way to change the color of the link, without resorting to [private API's](http://stackoverflow.com/a/17294355/736).

Sooo, the best course of action is to just knuckle down and use a UIWebView to display what you want.

To try to keep things relatively sane, I first added a static `html` file to my project with this content:

```html
<html>
  <head>
     <title></title>
  <style>
     html, body, div {
         background: #3D3D3D;
         font-family: HelveticaNeue-Medium, Helvetica;
         font-size: 12pt;
         color: #FAFAF1;
     }
    
     a {
         color: #FAFAF1;
     }
  </style>
  </head>
  <body>
      REPLACEME
  </body>
</html>
```
	
The CSS code is inlined in the file. There's probably a way to keep it separate and inject it, but I didn't need anything fancier than this.

Loading it was pretty straightforward:

```objc
+ (NSString *)htmlTemplate {
  NSString *path = [[NSBundle mainBundle] pathForResource:@"html-template" ofType:@"html"];
  return [NSString stringWithContentsOfFile:path encoding:NSUTF8StringEncoding error:nil];
}
```

Then on my controller I called this method from `viewDidLoad`:

```objc
- (void)setContentText:(NSString *)contentText {
  NSString *template = [SNDThemeManager attributionTemplate];
  NSString *htmlText = [template stringByReplacingOccurrencesOfString:@"REPLACEME" withString:contentText];
  [contentView loadHTMLString:htmlText baseURL:nil];
}
```

`contentView` is the `UIWebView`. Almost done. If you tap on a link in the webview it'll open that link in itself, which might not be what you want. The way around it is to set your controller to be a `UIWebViewDelegate` and implement [this method](http://stackoverflow.com/a/2899793/736):

```objc
- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType {
    if (navigationType == UIWebViewNavigationTypeLinkClicked) {
        [[UIApplication sharedApplication] openURL:[request URL]];
        return NO;
    }
    return YES;
}
```

That'll open it in Safari. If you want other browsers, well, knock yourself out. This is pretty much a giant mess for something that should be easy, but it's just something that would have to be done if you want total control over the UI. The end result looks well enough:

<figure>
    <img alt="Yay!" src="/images/assets/goodpopover.png">
    <figcaption>Yay!</figcaption>
</figure>

