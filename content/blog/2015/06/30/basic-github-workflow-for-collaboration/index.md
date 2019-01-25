---
layout: post
title: "Basic GitHub Workflow For Collaboration"
date: 2015-06-30T19:16:16.000Z
comments: true
categories: code
---
When you're a solo developer, you can use Git in nearly any darn way you choose. No branching? Ok. Branch on everything? Sure. Want all your commit messages to consist of "stuff"? Knock yourself out. You might regret some of that in the long run, but it's not hassling anyone else. But, as soon as you add another person into the mix, things will have to change.

One gigantic benefit from collaboration is having a second set of eyes look at your code. GitHub makes this easy if you follow a few steps.

*[ed: This might be old hat for some of you, but I don't know if I've ever read an entire guide for this, so I'm writing it all down. Please send me [feedback](https://twitter.com/swilliams), nicely, if there's a problem.]*

## Create an Organization
This one is optional, but does help in a few ways. The Organization becomes the face of any projects underneath it. It also makes a few things a little easier with regard to deployments, issue tracking, and documentation.

## Everyone Forks from the Organization
If the repository is called `some-org/project-x`, then each developer forks that to create `swilliams/project-x`, `sally-developer/project-x`, and so on. If a repository is private on the Organization, your forks will be private too, and won't count against your own private project count.

## Clone Your Fork
Now get your local copy.

`git clone https://github.com/swilliams/project-x.git`

## Set up Remotes
Your fork on GitHub will automatically be your `origin` remote. Add a remote for the Organizations repository. By convention this is typically called `upstream`.

`git remote add upstream https://github.com/some-org/project-x.git`

## Work in Branches
Working on a feature? Create a branch `feature-abc`. Fixing a bug? Create a branch `issue-254-login-done-broke`. Keep `master` clean.

`git checkout -b feature-abc`

## Push Branches to Origin
Done with a feature or an issue? Push it back up to `origin` (your fork).

`git push origin feature-abc` (you can add a `-u` flag too to track the remote branch too)

## Create a Pull Request
Why do we go to the hassle of creating all those branches? Because with branches, you can create multiple outstanding Pull Requests at once. If you did all your development in `master`, any additional commits you push up will be added to an open Pull Request, which can cause issues.

Multiple small Pull Requests are much easier to review. Would you rather review 3 files over 5 commits or 50 files and 75 commits?

## Someone Else Reviews the Pull Request
Perhaps my favorite piece of functionality in GitHub is the Pull Request review process. Use it to annotate code and discuss. Merge it in if everything is good.

## Rules for the Road
1. Keep the master branch clean. That should be ready to go live if necessary. This means tests should be passing, everything compiles, nothing important should be broken, etc.
2. Never commit directly to `upstream`. Upstream should only be updated through Pull Requests. Exception: pushing tags. 
3. Pull from `upstream` regularly. The more codebases diverge, the more likely a nasty merge problem will occur.
4. Keep branches small. Just reiterating it again.
5. There are exceptions to every rule. Use them intelligently.
