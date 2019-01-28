---
layout: post
title: "Podcast Technology"
date: 2015-02-18T15:32:31.000Z
comments: true
categories: podcasts
---
You should listen to [Relay.fm's](http://www.relay.fm/) new series on Inquisitive, ["Behind the App"](http://www.relay.fm/inquisitive/27). Myke opens the show with how the iPhone (and smartphones in general) helped bring podcasts to a larger audience. He's absolutely right. 

Before smartphones, you had to sync everything to an iPod with your computer before you could listen to it. For me, this usually happened at home, and if I forgot to plug in my iPod and sync it, I'd go without new episodes for the day; a fate worse than death. Syncing an iPod at the office was usually out of the question. IT policy at the time disallowed connecting personal hardware to company PCs <sup id="fnref:1"><a href="#fn:1" rel="footnote">1</a></sup> and blacklisted many of the sites hosting the audio files anyway.

I could live with the first issue, but I would go to great lengths to work around the latter one. Even though the experience wasn't as nice, downloading and listening to a podcast on my work PC was still something. Here's how:

* SSH into my Linux based web server
* [`wget`](http://www.gnu.org/software/wget/manual/wget.html#Overview) the RSS feed
* Find the link to the newest mp3 file
* `wget` the mp3
* Copy it into a folder publicly accessible on my server (this wasn't blocked by IT)
* Download it locally with my web browser (this was Windows and installing something like wget was also strictly verboten from IT)
* Listen

Easy peesy lemon squeezey, right?<sup id="fnref:2"><a href="#fn:2" rel="footnote">2</a></sup> Now, if I want to listen to a podcast, I open up [Overcast](https://overcast.fm/) and see if there's anything new. The only thing I have to think about now if I want to download over my cellular connection or not.

The future is good.

<div class="footnotes">
  <ol>
    <li class="footnote" id="fn:1">
  <p>For <em>very</em> good reason. God only knows what kind of malware you brought along with your external drive...</p>
</li>
<li class="footnote" id="fn:2">
  <p>"OK... First I'll access the secret military spy satellite that's in a geosynchronous orbit over the Midwest. Then, I'll ID the limo by the vanity plate 'MR. BIGGG' and get his approximate position. Then, I'll reposition the transmitter dish on the remote truck to 17.32 degrees east, hit WESTAR 4 over the Atlantic, bounce the signal down into the Azores, up to COMSAT 6, beam it back to SATCOM 2 transmitter number 137, and down on the dish on the back of Mr. Big's limo... It's almost too easy." — <a href="http://www.imdb.com/title/tt0105793/">Garth Algar</a></p>
</li>
  </ol>
</div>