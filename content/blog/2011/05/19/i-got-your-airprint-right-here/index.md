---
layout: post
title: "I Got Your AirPrint Right Here"
date: 2011-05-19T00:00:00.000Z
comments: false
author: Scott Williams
categories: []
---
<img alt="Due to various circumstances, my wife's computer can't connect to the printer (the problem rhymes with &quot;Bindows Vista&quot;). Her solution is to just email the files to herself (or me), log in on my computer and print. This offends my Nerd OCD, so I came up with a geekier way. This'll only work in OS X. Step 1 Install DropBox. If you don't already use DropBox, there's something wrong with you, and you need to sign up with my affiliate link so I can get more space. Step 2 Create a folder in DropBox. I ingeniously called mine &quot;To Print&quot;. Share it with your wife (or friend, or dog). Right click the folder, select the DropBox menu and click &quot;Share This Folder...&quot; follow the instructions there. Step 3 (Advanced) Create an AppleScript that watches a folder and then prints whatever gets added to it. I borrowed this script and made a gist of it on github. Step 4 Save your script to: Macintosh HD &gt; Library &gt; Scripts &gt; Folder Action Scripts. I called mine: &quot;custom - print folder&quot; Step 5 Right click on your To Print folder on your computer, and click &quot;Folder Action Setup...&quot; This'll open a multicolumn window and then a modal dialog. Find your script in the list and click &quot;Attach&quot;. Make sure the &quot;Enable Folder Actions&quot; checkbox is checked too, and close the dialog. Here's the final result: Bingo! Now, anything that is placed in that folder will be printed. And since it is tied in to DropBox, you can do this from anywhere. Now, if I want to frighten my wife, I can create a threatening document on my iPad at a coffee shop and print it from there!" src="./1305860605000.jpg">

Due to various circumstances, my wife's computer can't connect to the printer (the problem rhymes with "Bindows Vista"). Her solution is to just email the files to herself (or me), log in on my computer and print. This offends my Nerd OCD, so I came up with a geekier way. This'll only work in OS X.

<b>Step 1</b> Install DropBox. If you don't already use DropBox, there's something wrong with you, and you need to <a href="http://db.tt/yh2b24E">sign up with my affiliate link</a> so I can get more space.

<b>Step 2</b> Create a folder in DropBox. I ingeniously called mine "To Print". Share it with your wife (or friend, or dog). Right click the folder, select the DropBox menu and click "Share This Folder..." follow the instructions there.

<b>Step 3</b> <i>(Advanced)</i> Create an AppleScript that watches a folder and then prints whatever gets added to it. I borrowed <a href="http://hints.macworld.com/article.php?story=20041104011839378">this script</a> and made a <a href="https://gist.github.com/982258">gist of it on github</a>.

<b>Step 4</b> Save your script to: Macintosh HD &gt; Library &gt; Scripts &gt; Folder Action Scripts. I called mine: "custom - print folder"

<b>Step 5</b> Right click on your To Print folder on your computer, and click "Folder Action Setup..." This'll open a multicolumn window and then a modal dialog. Find your script in the list and click "Attach". Make sure the "Enable Folder Actions" checkbox is checked too, and close the dialog. Here's the final result:

Bingo! Now, anything that is placed in that folder will be printed. And since it is tied in to DropBox, you can do this from anywhere. Now, if I want to frighten my wife, I can create a threatening document on my iPad at a coffee shop and print it from there!