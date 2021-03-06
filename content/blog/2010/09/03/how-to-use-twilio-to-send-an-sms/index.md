---
layout: post
title: "How to Use Twilio to Send an SMS"
date: 2010-09-03T00:00:00.000Z
comments: false
author: Scott Williams
categories: []
---
I wrote about <a href="./1279646643000.jpg">liking Twilio's UI</a> not too long ago. Unfortunately the actual usability of their API isn't quite as sharp.

Signing up was straightforward enough, but beyond that things got incredibly murky. All I want is to be able to send an SMS from my app; I don't really care about anything else.

The examples provided for ruby don't detail this, but fortunately I stumbled around long enough to figure it out.

First, you need to <a href="https://www.twilio.com/user/account/phone-numbers/">register the phone number</a> you will be sending the SMSes to (this limitation is only for the developer trial period, I believe). Under "My Outgoing CallerID Numbers" section click the "Add Caller ID" button. This will prompt you for a phone number. Enter yours, and it will present you with a PIN and call the number entered. Pick up the call when it rings and enter the PIN when prompted.

Next grab the helper library <a href="http://www.twilio.com/docs/libraries/">over here</a>. I did this in Ruby, so just extract the zip and get 'twiliolib.rb' from the 'lib' folder. For a simple test I wrote the following script:

```ruby
require 'twiliolib.rb'

# your Twilio authentication credentials
ACCOUNT_SID = 'xxx' # these are on your account page
ACCOUNT_TOKEN = 'xxx'
 
# version of the Twilio REST API to use
API_VERSION = '2010-04-01'

account = Twilio::RestAccount.new(ACCOUNT_SID, ACCOUNT_TOKEN)

d = {
    'From' =&gt; '415-599-2671',
    'To' =&gt; '480-555-1234', # this is the number you registered
    'Body' =&gt; 'This is an SMS Test',
}

resp = account.request("/#{API_VERSION}/Accounts/#{ACCOUNT_SID}/SMS/Messages",
    'POST', d)
    
resp.error! unless resp.kind_of? Net::HTTPSuccess
puts "code: %s\nbody: %s" % [resp.code, resp.body]
```

The key here is that the 'From' number is the Sandbox Phone Number listed on your account dashboard, and the 'To' number is the one you registered up above. <strong>Any other numbers will not work</strong>. Don't forget to put in your ACCOUNT_SID and ACCOUNT_TOKEN too, those are also on the dashboard.

Fire up your console and run the script. If you see a bunch of XML and a 'code: 201' returned, you should be receiving and SMS shortly. If you see a '400 "Bad Request" (Net::HTTPServerException)' error, then double check that the From and To numbers are right.

This information is buried and I was very close to just throwing my hands up and looking elsewhere. If you are writing an application, these details are critical.