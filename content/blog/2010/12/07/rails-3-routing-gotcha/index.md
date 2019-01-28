---
layout: post
title: "Rails 3 Routing Gotcha"
date: 2010-12-07T00:00:00.000Z
comments: false
author: Scott Williams
categories: []
---
<img alt="Since I have a certain level of self-loathing I decided to upgrade our app to the latest version of Rails (as of now, 3.0.3). Rails 3 is a big upgrade and change from Rails 2. One of the biggest areas getting a facelift is the routing system. In general this guide does a great job explaining everything, but I recently ran into a rather specific wall. By default Rails prefers you to use what they call &quot;RESTful Routes&quot;. I'm rather indifferent to the idea, but I go along with it. This provides you with 7 default routes for a resource. For example, say you create routes for a Model called &quot;Photo&quot;. This will create the following routes (stolen from the aforementioned guide): This kind of approach works for 95% of my needs, but sometimes you just need to define something beyond the defaults. Say you need an action called &quot;DoThis&quot;. You can simply modify your Photo route like so:     resources :photos do         member do             get :dothis         end     end And then /photos/1/dothis will map to a dothis method in your controller. This works as expected, but I needed to submit a form to a custom route as well. So, I just added this to my member do function:     post :dothat I then attempted to submit a form to the dothat action, but got a Routing Error telling me the route wasn't found. I double checked and the URL was definitely correct.     &lt;%= form_for(@photo, :url =&gt; {:controller =&gt; 'photos', :action =&gt; 'dothat'} ) do |f| %&gt; It generated the correct URL: photos/1/dothat, which I confirmed by calling rake routes at the command line.  After searching the Interent and only getting frustrated I finally saw something that jogged my memory. In REST, 'post' is for creating new resources. I was editing my model. Simply changing it to:     put :dothat Fixed everything.  I'll attribute that mixup to years and years of having only GET and POST available drilled into my head. It doesn't exactly help that Rails doesn't use a &quot;real&quot; PUT in the form's method attribute. It uses POST, but includes a hidden input, &quot;_method&quot; to store the verb it should respond to." src="./1291761300000.jpg">

Since I have a certain level of self-loathing I decided to upgrade our app to the latest version of Rails (as of now, <a href="http://weblog.rubyonrails.org/2010/11/15/rails-3-0-3-faster-active-record-plus-plenty-of-fixes">3.0.3</a>). Rails 3 is a big upgrade and change from Rails 2. One of the biggest areas getting a facelift is the routing system.

In general this <a href="http://guides.rubyonrails.org/routing.html">guide</a> does a great job explaining everything, but I recently ran into a rather specific wall. By default Rails prefers you to use what they call "<a href="http://en.wikipedia.org/wiki/REST">RESTful</a> Routes". I'm rather indifferent to the idea, but I go along with it. This provides you with 7 default routes for a resource. For example, say you create routes for a Model called "Photo". This will create the following routes (stolen from the aforementioned guide):

This kind of approach works for 95% of my needs, but sometimes you just need to define something beyond the defaults. Say you need an action called "DoThis". You can simply modify your Photo route like so:

```ruby
resources :photos do
  member do
    get :dothis
  end
end
```

And then <span>/photos/1/dothis</span> will map to a <span>dothis</span> method in your controller. This works as expected, but I needed to submit a form to a custom route as well. So, I just added this to my member do function:

```ruby
post :dothat
```

I then attempted to submit a form to the <span>dothat</span> action, but got a Routing Error telling me the route wasn't found. I double checked and the URL was definitely correct.

```ruby
<%= form_for(@photo, :url => {:controller => 'photos', :action => 'dothat'} ) do |f| %>
```

It generated the correct URL: <span>photos/1/dothat</span>, which I confirmed by calling rake routes at the command line.

After searching the Interent and only getting frustrated I finally saw <a href="http://asciicasts.com/episodes/203-routing-in-rails-3">something</a> that jogged my memory.

In REST, 'post' is for <em>creating</em> new resources. I was <em>editing</em> my model. Simply changing it to:

```ruby
put :dothat
```

Fixed everything.

I'll attribute that mixup to years and years of having only GET and POST available drilled into my head. It doesn't exactly help that Rails doesn't use a "real" PUT in the form's method attribute. It uses POST, but includes a hidden input, "<span>_method</span>" to store the verb it should respond to.
