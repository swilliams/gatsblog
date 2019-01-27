---
layout: post
title: "How I Started to Understand Model Binding Magic in Ember"
date: 2014-05-12T20:16:18.000Z
comments: false
categories: code
---
I'm learning [Ember.js](http://emberjs.com/) in efforts to stay [reasonably up to date](http://blog.swilliams.me/2014/01/20/keep-your-developer-saw-sharp/) with client side web technologies. [This hasn't been the easiest going.](http://blog.swilliams.me/2014/05/06/oh-cool-you-want-to-be-a-web-developer/)

Ember's best feature is that it easily binds values in HTML to their corresponding properties on objects. I've found the implementations of this a little confusing sometimes. Going through the Getting Started guide has been helpful, though [this part tripped](http://emberjs.com/guides/getting-started/displaying-the-number-of-incomplete-todos/) me up for a good hour, specifically this snippet: 

```js Within todos_controller.js 
remaining: function() {
  return this.filterBy('isCompleted', false).get('length');
}.property('@each.isCompleted'),
```

That last line turns the associatied method into a [computed property](http://emberjs.com/guides/object-model/computed-properties/).  My understanding of computed properties was as a means to provide a simple call to complex data (eg. a `fullName` property that joins `firstName` and `lastName` properties). This particular method is on a *controller*, has a previously foreign syntax (`@each`), and the template that refers to it still uses it's canonical name (`remaining`).

<figure>
	<img src="./zoidberg.gif" alt="Wha?" />
</figure>

In order to understand just what was happening, I pumped the brakes and dug into the sample application. My first question was why they were using a computed property altogether. I whipped up another method and added it to my controller:

```js todos_controller.js 
remaining: function() {
  return this.filterBy('isCompleted', false).get('length');
}.property('@each.isCompleted'),

derp: function() {
  return 'derp!';
}
```

{% raw %}
```html index.html
<h1>todos {{derp}}</h1>
```
{% endraw %}

This resulted in the method body being substituted in the template, which reminded me that {% raw %}`{{derp}}`{% endraw %} was just printing out whatever `derp` evaluated to, in this case a function.<sup>1</sup> So I made `derp` a computed property:

```js todos_controller.js 
derp: function() {
  return 'derp!';
}.property('what')
```

This worked. My `<h1>` was now 'todos derp!'. In fact, you could simplify it even more by doing this: `property()` and leaving off a name altogether. It also demonstrated that the first argument to `property` didn't have a bearing on what goes in the Template. Next step was to substitute my static text with something useful.

```js todos_controller.js 
derp: function() {
  return this.filterBy('isCompleted', false).get('length');
}.property()
```

And sure enough, the title was now 'todos 2'. I suspected this would work because my controller extended `Ember.ArrayController`, giving it access to `filterBy`. This lead me back to one of my original questions: what is the purpose of `'@each.isCompleted'`?

I played around with the todo app a little more and noticed that my {% raw %}`{{derp}}`{% endraw %} was not automatically updating when todos where checked off while the original {% raw %}`{{remaining}}`{% endraw %} was. Then it hit me: `'@each'` must be a special directive for an `ArrayController` that bound that function to the `isCompleted` property of [*each*](http://emberjs.com/api/classes/Ember.ArrayController.html#property__each) object in its array. Putting a `console.log('called');` confirmed this suspicion — it's called every time `isCompleted` is accessed.

After this bit of forensics, things make a little more sense now. I do wish this association was a little more spelled out in the documentation though for us thick-headed developers.

<div class="footnotes">
1. This is what JavaScript does. Open the dev tools and log a function without executing it — the body of that function prints out.
</div>
