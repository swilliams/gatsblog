---
layout: post
title: "Demystifying Ruby DSLs"
date: 2014-01-26T00:00:00.000Z
comments: false
author: Scott Williams
categories: [ruby,code]
---
I like [Ruby](https://www.ruby-lang.org/en/). It has a way of appearing clean and simple, while still being expressive. Due to its [typing system](http://en.wikipedia.org/wiki/Dynamic_typing#Dynamic_type-checking_and_runtime_type_information) you can bend it in a variety of ways to do certain things that would be very complicated in other languages, or make you write an entire compiler. I'm talking, of course, about Domain Specific Languages, or [DSLs](http://en.m.wikipedia.org/wiki/Domain_specific_language). If you've ever used a popular Ruby library (like Rails, or RSpec, or anything else) then you've used a DSL. Rails in particular has a couple different ones:

``` ruby
 # Routes
 # config/routes.rb
 DerptyDerp::Application.routes.draw do
   resources :users
   resources :dinguses, only: [:new, :show]
 end
 
 # ActiveRecord
 # app/models/user.rb
 class User < ActiveRecord::Base
   validates :email, presence: true, uniqueness: true
   has_one :dingus, dependent: :destroy
 end
```
    
And so on. At first glance, the code that allows this can be intimidating, especially when it's been broken up and refactored across 20 different classes and modules. Fortunately, there are probably only about 10 things that you really need to know to read along, and to make them yourself.

###Class Methods
Did you know that you can execute code right from within a class declaration? Well, you can. Try it!

``` ruby
class Derp
  def self.can_eat_sandwiches
    puts "I LOVE CATS"
  end
  
  can_eat_sandwiches
end
```

When that class is read by the interpreter, it'll execute the `can_eat_sandwiches` method and print the non-sequitur to the console. This'll even work through inheritance.

``` ruby
class Herp < Derp
  can_eat_sandwiches
end
```

And you'll have a wonderful message printed out twice. This technique can be used to do more than just clutter up a log file too! For example, in Rails when you [setup validation](https://github.com/rails/rails/blob/9c025ab6e9731dde56186b41ba5d4f216a48c831/activemodel/lib/active_model/validations.rb#L140), all you're doing is calling another method.

###Put it into a Module
Sometimes you want to add functionality to a class without locking it into a long inheritance chain. Ruby uses [Modules](http://www.tutorialspoint.com/ruby/ruby_modules.htm) to accomplish this, so you can pull your methods into a separate file to include them at will. There's a catch though before you dive in. Traditionally, you'd include a module like this:

``` ruby
module TheHerppening
  def can_eat_sandwiches
  end
end

class Sandwichable
  include TheHerppening
end
```
    
If you know how modules work, you might've noticed that will only add `can_eat_sandwiches` to *instances* of `Sandwichable`, not to `Sandwichable` itself. Which means that calling `can_eat_sandwiches` directly in the class won't work. But fear not! Ruby can be molded in many dark and fearsome ways. Rather than using `include`, you can use `extend` to add methods to a class.

``` ruby
class Sandwichable
  extend TheHerppening
  
  can_eat_sandwiches
end
```
    
Aaaaand we're back in business. But, say you wanted to have some methods that needed to be on instances, and some for the class? Can you mix both? Sure. Just wrap them in different modules and add them with the appropriate calls. There's even a pattern to follow for naming the modules: `ClassMethods` and `InstanceMethods`:

``` ruby
module TheHerppening
  module ClassMethods
    def can_eat_sandwiches
      puts 'DING'
    end
  end
  
  module InstanceMethods
    def eat_the_sandwich
      puts 'I wish I could marry a sandwich.'
    end
  end
end
```
    
They can even be in the same file. As a side note, this is also how you can do namespacing in Ruby. Including these can be a little tedious if you have to add this to lots of classes. 

``` ruby
class Sandwichable
    extend TheHerppening::ClassMethods
    include TheHerppening::InstanceMethods
  
    can_eat_sandwiches
end
```
    
Not to mention ugly. And if there's one thing a good Ruby coder can't stand, it's ugly code. Let's fix that.

[Modules](http://ruby-doc.org/core-2.1.0/Module.html) (and classes) have all kinds of meta-programming capabilities built in. I encourage you to go and peruse them at your leisure. What we'll focus on here is the `[included](http://ruby-doc.org/core-2.1.0/Module.html#method-i-included)` method. 

``` ruby
module Dingus
  class << self
    def included(base)
      base.send :include, Dingus::InstanceMethods
      base.extend Dingus::ClassMethods
    end
  end
end
```

All of a sudden, your class now has all of the extra stuff from the `Dingus` module inside it.

That might be jumping ahead a few steps, what with the `class << self` and all. Don't forget that in Ruby, *everything* is a class, even modules. Conceptually it might be easier to understand if you look at `Module`'s ancestors: 

``` ruby
> Module.ancestors
=> [Module, Object, PP::ObjectMixin, Kernel, BasicObject]
```
    
So, a `Module` is just a subclass of `Object` and can be treated as such. [Whoa](http://www.youtube.com/watch?v=WFNEgdwjEhs). Specifically, the `class << self` allows you to put class level methods on the module (you can also do this to a class as an alternative to ` def self.whatevers`).

``` ruby
module Dingus
  class << self
    def say_hi
      puts 'HI'
    end
  end
end

Dingus.say_hi # HI
```
    
And, `included` is called when that module is included in a class. This means you can set off a chain reaction of includes with just a single one.

This is just the start. Ruby gives you enough metaprogramming rope to build a hammock and then hang yourself with the leftovers. We'll get into some of the other ways to do this later on, including [blocks](http://stackoverflow.com/q/4911353/736), [eval](http://www.ruby-doc.org/core-2.1.0/Kernel.html#method-i-eval), and the infamous [method-missing](http://www.ruby-doc.org/core-2.1.0/BasicObject.html#method-i-method_missing). I encourage you to start digging into some code, and even trying a little of this yourself. Once you get a few reps in, understanding how DSLs work becomes much easier.
