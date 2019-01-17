---
layout: post
title: "Changing Your Password"
date: 2014-04-11T15:23:03.000Z
comments: true
categories: servers
---
With news of the [heartbleed vulnerability](http://heartbleed.com/) I've taken the <strike>paranoid</strike> precautionary measure of changing all my passwords. I have over 200 logins in my [1Password](https://agilebits.com/onepassword)<sup>1</sup> library, so I've seen just about every kind of password change process imaginable over the last day or two. My conclusion is that there are a lot of **terrible** implementations of this process.

Security conflicts with convenience, and changing passwords is never convenient. But there are ways to at least make it quick. Here's what I expect when I got to a site to change my password:

1. Sign in.
2. Click something like 'Settings', 'Account', or 'Profile'. Ideally, there should only be one of those on the page to avoid guessing.
3. Have the word 'password' on that Settings page. Be it a button, link, or inline form, just make it easy to find.
4. If I need to enter my old password first, make it the first field.
5. Display some kind of notification that my change was successful.
6. Optionally, send me an email telling me it changed, just in case a bad guy did it.

That's not so bad right? This has been the standard way of doing things ever since [cgi-bin](http://en.wikipedia.org/wiki/Cgi-bin) was a thing. But so many websites get it wrong.

* First of all, *have* a Change Password form. More than a couple sites I went to don't have one and rely on you to do the Reset My Password dance. This means I have to sign out, go back to the sign in page, click the reset link, enter my email, wait for the email, open the email, click the link in the email, then finally enter a new password. Shame on you if you make me do this. Shame.
* Don't restrict password length. 1Password let's me create a 50 character password, yet I'd say at least 40% of the sites I went to couldn't handle a password that long.
* If you have to restrict length for some reason, tell me exactly what that maximum is.

<figure>
    <img alt="Password WTF" src="/images/assets/password-wtf.png" />
</figure>

* Don't restrict what characters I can use. There is no technical reason I shouldn't be able to use spaces or symbols in a password.
* Don't restrict copy/paste in the password field. Paypal was the only one I saw that did this, and it boggles my mind. A random, complex password is going to be more secure than one I can easily type in (which can be [cracked quickly](http://en.wikipedia.org/wiki/Rainbow_tables)). Don't actively prevent me from trying to make my financial data secure!

Security already has its own set of barriers, and a certain subset of people will never take it seriously. As a web developer, it is entirely up to you to keep that subset from growing in size.


<div class="footnotes">
1. You really, really, really, really, really, really, should use it too, or a similar product.
</div>
