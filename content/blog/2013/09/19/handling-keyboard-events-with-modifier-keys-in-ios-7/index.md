---
layout: post
title: "Handling Bluetooth Keyboard Events With Modifier Keys in iOS 7"
date: 2013-09-19T00:00:00.000Z
comments: false
author: Scott Williams
categories: [code,objective-c]
---
Before iOS 7, if you had a Bluetooth keyboard attached to your iPad, you could only access modifier keys (Command, Control, etc) through [private APIs](http://stackoverflow.com/questions/14791056/ios-how-to-detect-the-escape-control-keys-on-a-hardware-bluetooth-keyboard). You could sneak it in through [selector trickery](http://stackoverflow.com/a/14940898/736) and allegedly Apple would turn a blind eye. Fortunately with iOS 7, there's now a public API to do this.

First, let's talk a bit about the [Responder Chain](https://developer.apple.com/library/ios/documentation/EventHandling/Conceptual/EventHandlingiPhoneOS/event_delivery_responder_chain/event_delivery_responder_chain.html). This is how events are managed in iOS. Most of the `UIKit` classes you use inherit from [`UIResponder`](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIResponder_Class/Reference/Reference.html#//apple_ref/occ/cl/UIResponder) which means that you'll have access to the appropriate methods. This means that you can set the scope for your keyboard shortcuts at any level in the app. I wanted to use have them registered for the entire app, so I subclassed [`UIApplication`](https://developer.apple.com/library/ios/DOCUMENTATION/UIKit/Reference/UIApplication_Class/Reference/Reference.html), though you could use a similar approach in a view or the view controller too:

```objc
// STWApplication.h
@interface STWApplication : UIApplication {
  NSMutableArray *_commands;
}

// STWApplication.m
@implementation STWApplication
// more coming soon
@end
```

Since we're subclassing `UIApplication`, edit `main.m` to tell it that we're doing so in `UIApplicationMain`:

```objc
int main(int argc, char *argv[]) {
  @autoreleasepool {
    NSString *appName = @"STWApplication";
    return UIApplicationMain(argc, argv, appName, NSStringFromClass([STWAppDelegate class]));
  }
}
```

Ok, now let's tell the app what key combinations are valid. iOS 7 adds a [`keyCommands`](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIResponder_Class/Reference/Reference.html#//apple_ref/occ/instp/UIResponder/keyCommands) property to UIResponder. All we need to do is override that and returning an array of [`UIKeyCommands`](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIKeyCommand_class/Reference/Reference.html#//apple_ref/occ/cl/UIKeyCommand). Since we're using a `UIApplication` subclass, add this in there:

```objc
- (NSArray *)keyCommands {
  if (!_commands) {
    UIKeyCommand *commandF = [UIKeyCommand keyCommandWithInput:@"f"
                   modifierFlags:UIKeyModifierCommand
                          action:@selector(handleShortcut:)];
    _commands = [[NSMutableArray alloc] initWithArray:@[commandF]];
  }
  return _commands;
}
```

Every time a keyboard event is raised, if it matches <kbd>⌘F</kbd>, the selector `handleShortcut` will be called on the responder chain. That means you can define that method multiple times and only the most specific will be called. For example, if you defined it in `STWApplication` and in the View Controller, the `STWApplication` version will *never* be called. Speaking of `handleShortcut`, here it is:

```objc
- (void)handleShortcut:(UIKeyCommand *)keyCommand {
  NSLog(@"You pressed ⌘F! Good Job!");
}
```

`UIKeyCommand` is pretty neat. The [`modifierFlags`](https://developer.apple.com/library/ios/documentation/uikit/reference/UIKeyCommand_class/Reference/Reference.html#//apple_ref/doc/c_ref/UIKeyModifierFlags) means that the app can watch for Caps Lock, Shift, Control, Alt/Option, Command, and the Number Pad. Additionally, there are some constants that  can be used for special keys like the arrows and Escape. The [developer forums]() also had some people getting access to Tab and Return by looking for `\t` and `\r`, but I don't know how well those work.

Also, make sure you aren't trying to override system shortcuts. Per the docs: "Key commands that map to known system events (such as cut, copy and paste) are automatically routed to the appropriate responder methods." So don't do that.

Now, remember how I said "every time a keyboard event is raised"? These events will only happen when a text input is the first responder. This means that if you want to have some fancy global shortcuts (say ⌘F to jump to a search box) you'll still need to do a trick with `UITextField` (or similar). That's a little beyond the scope of this article, but the gist is add a UITextField to a view, hide it, and make sure it stays first responder when appropriate in order to keep firing off those events.

I for one am psyched that this is now available. It's definitely more of a power user feature, but those of us who like to use Bluetooth keyboards with our iPads will derive tremendous benefit from it.

