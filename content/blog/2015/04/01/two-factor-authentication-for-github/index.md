---
layout: post
title: "Two Factor Authentication for GitHub"
date: 2015-04-01T17:48:48.000Z
comments: true
categories: security github
---

In the interest of security I've started to turn on [Two Factor Authentication](http://en.wikipedia.org/wiki/Multi-factor_authentication) (aka 2FA) for some of the services I use. I tried it out with GitHub about a year ago, but turned it off shortly thereafter because I encountered a bunch of problems and didn't have the time to figure them all out. That and [Google's Authenticator app having data loss issues after an update](https://support.google.com/accounts/answer/3376859?hl=en) was a big red flag too.

Today it's a little easier to manage. [1Password](https://itunes.apple.com/us/app/1password-password-manager/id443987910?mt=12&at=11lxUn) has 2FA support built in now, and there's also [Duo Mobile's app](https://itunes.apple.com/us/app/duo-mobile/id422663827?mt=8&at=11lxUn). Turning it on was pretty easy: Go to the [security](https://github.com/settings/security) page, click a few buttons, and follow instructions. Once it was enabled I decided to push some changes for a project, and then this happened:

```
> git push origin master
remote: Invalid username or password.
fatal: Authentication failed for 'https://github.com/swilliams/my-repo.git/'
```

Umm, ok. I mean, I guess the most secure repository is one that **nobody** can access.

The solution isn't immediately obvious. I looked at [GitHub's setup docs](https://help.github.com/articles/caching-your-github-password-in-git/) again, but they didn't mention anything about 2FA. When in doubt, try it again right? This time I got a username/password prompt. I had assumed I would get some sort of additional prompt to enter a single use code for the 2FA, so I pasted in my GitHub password. 

```
> git push origin master
Username for 'https://github.com': swilliams
Password for 'https://swilliams@github.com':
remote: Invalid username or password.
fatal: Authentication failed for 'https://github.com/swilliams/my-repo.git/'
```

No dice.

Googling around a bit finally brought me to [this page, "Creating an access token for command-line use"](https://help.github.com/articles/creating-an-access-token-for-command-line-use/). When you enable 2FA you need to use a token as your password for the Terminal. I created this with the default scopes provided<sup id="fnref:1"><a href="#fn:1" rel="footnote">1</a></sup>, then copy/pasted the resulting token into the password prompt in my Terminal window.

```
± git push origin master
Username for 'https://github.com': swilliams
Password for 'https://swilliams@github.com':
Counting objects: 80, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (78/78), done.
Writing objects: 100% (80/80), 9.02 KiB | 0 bytes/s, done.
Total 80 (delta 58), reused 0 (delta 0)
To https://github.com/swilliams/my-repo.git
   01efb2c..445a0b6  master -> master
```

Yay!

I *think* that should handle all the headaches for 2FA with GitHub. I like the warm security feeling it brings, and it seems like the user experience has been cleared up too.

<div class="footnotes">
  <ol>
    <li class="footnote" id="fn:1">
  <p>For standard git operations, I don't think you would need any of the other scopes available for apps, and you could probably remove <pre>gist</pre> from it too.</p>
</li>
  </ol>
</div>