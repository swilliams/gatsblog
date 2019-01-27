---
layout: post
title: "My Beef with Razor"
date: 2010-07-28T00:00:00.000Z
comments: false
author: Scott Williams
categories: []
---
(Note, for non-programmers, this is <i><span>not</span></i> about shaving)</span>

<a href="http://ASP.NET">ASP.NET</a> MVC has <a href="http://weblogs.asp.net/scottgu/archive/2010/07/27/introducing-asp-net-mvc-3-preview-1.aspx">shipped the first preview of version 3</a>. This is a good thing, mostly. By default it will be using the brand spanking new <a href="http://weblogs.asp.net/scottgu/archive/2010/07/02/introducing-razor.aspx">Razor</a> view engine... and I'm having a hard time trying to figure out why it's even in there.

The <i>raison d'être</i> for Razor is to allow for less code in the Views. This too, is a good thing. But I just don't think it does <i>enough</i>. Here's one of the samples provided:

<div>@inherits System.Web.Mvc.WebViewPage</div>
<p></p> <div>&lt;!DOCTYPE HTML&gt;</div>
<p></p>
<div>&lt;html&gt;</div> <div>&lt;head&gt;</div>
<div>
<span>	</span>&lt;title&gt;@View.Title&lt;/title&gt;</div> <div>&lt;/head&gt;</div>
<div>&lt;body&gt;</div>
<div>
<span>	</span>@RenderBody()</div> <div>&lt;/body&gt;</div>
<div>&lt;/html&gt;</div>
</div>

It <i>is</i> nice that you don't need a gigantic header any more, and I like that the masterpage syntax is a little slimmer, but in general all you're saving are a bunch of &lt;%= %&gt; tags. That's nice, but is that really that great of an improvement to warrant an entirely new ViewEngine? Am I missing something important here? Especially once you get into non-trivial pages with hundreds of tags and template syntax.

What I think would have been awesome would be to use the reduced &lt;%= %&gt; footprint but also incorporate something like NHaml, which would <i>really</i> minimize the code footprint.