---
layout: post
title: "Putting the Minimum in Minimum Viable Product"
date: 2013-12-22T00:00:00.000Z
comments: false
author: Scott Williams
categories: []
---
There's a common phrase in product development called <a href="http://en.wikipedia.org/wiki/Minimum_viable_product">"Minimum Viable Product"</a>. It means that the first release of your software product should only do the bare minimum needed to survive. This keeps things simple, and prevents scope creep from sneaking in (I mean you could have your app *also* <a href="http://www.catb.org/jargon/html/Z/Zawinskis-Law.html">read email</a>, but why?).

For <a href="https://itunes.apple.com/us/app/zartbonk/id727445952?ls=1&amp;mt=8">Zartbonk</a>, this meant that the user had to be able to:

 * Play sounds
 * Search sounds
 * Add more sounds (through various means)

And all of that had to happen quickly, otherwise what was the point?

That's a good feature list, but there is absolutely more to an app than just checking off a bunch of boxes. I could implement all of those features using giant rectangles with primary colors and almost no interaction. That would certainly be a Minimum Product, but not necessarily a Viable one. 

A viable product means that it has enough going for it so that it lives; it doesn't just die on the vine. On a mobile device that means it isn't just relegated to the dreaded last screen, essentially a junk drawer for unloved apps. Or maybe it's just deleted altogether. 

I'm trying to avoid the junk drawer with Zartbonk. There are a few flourishes here and there to make it fun. Sound clips have their waveforms in the background. The progress bar is accurate as it passes across a clip. When a sound plays in the timeline<sup>1</sup> it's corresponding one in the grid jiggles. You can repeat a sound bite by tapping and holding a play button. I tried to add fades and pretty animations everywhere I could. 

<figure>
    <img alt="Jiggle" src="/images/assets/jiggle.gif">
    <figcaption>Jiggle</figcaption>
</figure>

All of these things took time. A *lot* of time. Remember those three bullet points up there? Implementing those was just 20% of the whole time spent on the app. The fine tuning and iterations of design took weeks and weeks.

And even I'm not immune to the allure of adding more features in there. The whole purpose of the PRO option is to add more than what might be necessary, and to separate from the competition. Looking back, I might not have actually launched with some of the pro features. The timeline in particular was a very tough nut to crack, and still isn't as streamlined as I'd like it.

Perhaps the most important thing to remember is when you have a *minimum*, it's time to consider adding to that. Bugs need to be fixed. Interfaces may need to be refactored. The biggest issue with Zartbonk right now is that editing is pretty painful, especially if you want to edit more than a couple of clips. It'll probably take a couple of weeks to get something better in, but that's what I'm working on now.

I could have delayed even longer on shipping and fixed editing first, but that runs the risk of finding something else that needs to be fixed, which could threaten the entire project.

I'm happy with how I launched 1.0<sup>2</sup>. It wasn't perfect, but I think I was able to strike a decent balance between features and viability.

<div class="footnotes">
1. That's in Zartbonk PRO. What do you mean you haven't upgraded yet?
2. Technically I launched on 1.1, which had some critical bug fixes I didn't see until after 1.0 launched.
</div>
