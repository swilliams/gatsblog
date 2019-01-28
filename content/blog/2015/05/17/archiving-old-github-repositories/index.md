---
layout: post
title: "Archiving Old GitHub Repositories"
date: 2015-05-17T20:37:51.000Z
comments: true
categories: code
---
What do you do with a codebase for a client project that ended years ago? Since it's client work it shouldn't be made public, but if you keep it "live" in GitHub your private repository count will creep up. Deleting the repository outright seems wrong; it's not that unusual to have an old client cold call you with an update, and having that old codebase handy can save some headaches. The lazy way to fix this would be to just give GitHub more money to increase the limit. But I felt the itch to solve the problem with code.

Git itself is flexible. It's trivial to clone a repository, put it in a safe place (or alternate service) and call it a day. But with GitHub, that doesn't include Issues. There could be some solid ideas (or bugs) stored in Open Issues that should be preserved. [GitHub has a great API](https://developer.github.com/v3/issues/) to retrieve those, and I decided to create a simple Ruby script to make it a smooth process.

Take a look at [GitHub Issue Exporter](https://github.com/Tallwave/github_issue_exporter). It's pretty basic right now — just downloads Issues into a bunch of JSON and will also let you import them back into a new project. The idea is that you clone the repository you want to archive, then export all the open issues, store it all in a safe place, then you can safely delete the repository and free up some space.


