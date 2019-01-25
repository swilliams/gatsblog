---
layout: post
title: "Google OAuth, Ember, Hapi"
date: 2016-09-07T15:10:50.000Z
comments: false
categories: code, ember, oauth, hapi
---

OAuth is, to borrow a phrase, a bag of hurt. Not just any bag, but the kind that is thrown over your head right before you're thrown into a van and driven down to Tijuana and ransomed for $50,000. I don't like OAuth.

Sometimes, though you need to use it. I'm working on an internal tool at [work](http://tallwave.com) and want to make sure that only co-workers can use it. I could do the username/password thing, but the world has enough of those. We use Google docs for the office, so everyone has a Google account that could, theoretically, be used to sign in. Thus, OAuth.

The tool itself is a web app that uses [Ember](http://emberjs.com/) on the front-end and [Hapi](http://hapijs.com/) and [MongoDB](https://www.mongodb.com/) as the API and database. It's my first time using Hapi, and I like it quite a bit, seems like a really good tool for API building. 

Since this is a completely separate client and server, it adds a bit of a wrinkle to the OAuth dance. There are plenty of "Sign in with X" libraries out there, but they mostly seem to be written with the intent that the user will only be interacting with that service. In other words, if I was building a Google Docs client app, my life would be easier, but no, I am only authenticating a user's account and then treating that as the key to my own system... which makes it more manual. It also doesn't help that Google's OAuth documentation is lousy. There are many different ways to authenticate, and [multiple](https://github.com/google/google-auth-library-nodejs) [libraries](https://github.com/google/google-api-nodejs-client) to support the different ways, and they've changed over time, so searching for help is difficult. 

Here's how it's supposed to work:

1. The client (Ember) "signs in with Google". If this is successful it receives an `authorizationCode`. This code by itself is useless, it just means the user signed in ok.
2. The server (Hapi) needs to validate this code and turn it into an `accessToken`.
3. If _that_ is successful, we can query the Google API (from the server still) for the account information, verify that they are from Tallwave, and then send credentials back down to the client.
4. The client receives the credentials, stores them locally, and includes them for subsequent API requests.

Errors need to be handled at all the steps along the way too.

**Step 1 — Client Side**

[Torii](https://github.com/Vestorly/torii) is a pretty good (though a wee bit out of date) library for Ember that handles a good amount of the Google sign in process. Follow its installation instructions and setup the configuration and the proper adapter. Here's my `environment.js` entry:

```javascript
/* The following properties are in ENV */
torii: {
  sessionServiceName: 'session',
  providers: {
    'google-oauth2': {
      redirectUri: signinURL,
      apiKey: googleOAuthAPIKey,
      scope: 'profile email'
    }
  }
}
```

The [`scope`](https://developers.google.com/+/web/api/rest/oauth#authorization-scopes) property is important. That allows you to query for the user's account later on. The only other point with Torii worth mentioning is how I sent the authorization code to my API. The `open` method on the `torii-adapters/application.js` is called after Google auth finishes, and that is where you create the "session" for authentication. 

By default Ember uses the JSON API for the API layer, and I tend to go with the flow. But in this case, since we're sending a single value to the server and will throw it away immediately after... Setting up a model seems overkill for that. We can drop down to regular old jQuery for this.

```javascript
// This is in torii-adapters/application.js
open(authentication) {
  return new Ember.RSVP.Promise((resolve, reject) => {
    Ember.$.ajax({
      method: 'POST',
      data: { authorizationCode: authentication.authorizationCode },
      url: '', // this is the authentication URL in your API
      success: Ember.run.bind(null, resolve), // forward success/error to the Promise
      error: Ember.run.bind(null, reject)
    });
  }).then((account) => {
    this.get('sessionStore').save(account);
    return { currentUser: account };
  });
}
```
Worth pointing out is that we are expecting our API to return some JSON that will be:

1. Stored locally (`sessionStore` is a [service](https://guides.emberjs.com/v2.7.0/applications/services/), which we'll define later), and will be retrieved later.
2. Returning the `currentUser` object will merge it into the underlying session, so that it can be retrieved in routes, components, templates etc. This isn't permanent storage though, if the user refreshes the page, it'll be gone, hence `sessionStore`.

**Step 2 — On the Server**

This is where the fun begins. If you're playing at home, I used Node 5 and Hapi 13.x.x. First, you'll need to get your credentials from the [Google Developer Console](https://console.developers.google.com). I'm not going to walk through those steps, but you'll need an OAuth client ID for a Web Application. Specifically, you'll need the client id, client secret, and redirect URL (yes, even though you won't be redirecting to anything at this point).

Then, install the `googleapis` dependency. 

```
npm install googleapis --save
```
Now, let's build a service that sends Google an `authorizationCode` and gets an accessToken back. You'll call this service from your route handler.

```javascript

const Google = require('googleapis');
const OAuth2 = Google.auth.OAuth2;
const profile = Google.oauth2('v2');

// pull these from an ENV variable or something else
const oauthClient = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL); 
// Omitting the REDIRECT_URL will throw an error

module.exports = {
  // callback is a function whose signature is (error, tokens)
  getTokens(authorizationCode, callback) {
    oauthClient.getToken(authorizationCode, (err, tokens) => {
      if (err) { // the authorization code was bad
        callback(err);
        return;
      }
      // At this point, we have an access token.
      oauthClient.credentials = tokens;

      // Each Google API method takes a params object, 
      // which is where you provide your auth credentials
      const params = {
        auth: oauthClient
      };

      // Retrieve the user's account
      profile.userinfo.v2.me.get(params, (err, response) => {
        if (err) {
          callback(err);
          return;
        }
        // The response object contains all of the account info
        
        // This is where you validate if the user is allowed or not.
        
        // If the user is valid, create a new session for them and save it.
        // It's up to you where you want to save this session. Could be 
        // a redis cache, http session, whatever your needs are.

        // After that, we're going to send our session token and user 
        // account back.
        

        const sessionJSON = {
          token: someSessionToken,
          account: response
        };
        callback(null, newSession);
      }
    });
  }
};
```

That's kind of a mouthful and could definitely stand a good refactoring, but it goes through the steps needed to get some information from Google. You can see more [APIs](http://google.github.io/google-api-nodejs-client/12.4.0/index.html) you can call, but the documentation on a lot of them is rather sparse. For example, adding the `oauthClient` to `params` is not apparent, but necessary for each call.

We've now determined if the user should actually have access to what they just signed in to and sent the response back to the client. That's pretty good! Refresh your beverage, take a deep breath and then let's get handle that response and get our client in order to keep moving.

**Step 3 — Back on the Client**

You might have noticed again that we did not send the session information back in JSON API format either. This was intentional since we aren't going to be storing this in the standard Ember store, and therefore don't need the additional benefit of using something that standardized. You could if you wanted to, but for this occasion, I did not want to set up a model (or in this case model*s* to support the nested structure).

Back up in our `Ember.RSVP.Promise` handler there was this line:

```javascript
// In torii-adapters/application.js
this.get('sessionStore').save(account);
```

Once you receive a response, you'll need to store it. You could use Ember Data, but that felt overkill to me; I needed to access the tokens within the response for subsequent API calls, and nothing else. I ended up building an [Ember service](https://guides.emberjs.com/v2.8.0/applications/services/) that serialized the content and stored it in [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). You can go your own way too.

**Step 4 — Making authenticated requests**

We're authorized (or have displayed a fancy error message) and are ready to make actual requests to get actual data. I like to authenticate my API requests by including my authorization token in the `Authorization` header on requests. Ember allows for this by overriding the `headers` computed property in your Adapter:

```javascript
// adapters/application.js
  headers: Ember.computed(function() {
    const account = this.get('sessionStore').fetch();
    if (account) {
      return {
        'Authorization': account._id
      };
    }
    return {};
  }).volatile()
```

**Step 5 — Verify authentication on the server**

There are may ways to [authenticate requests with Hapi](http://hapijs.com/tutorials/auth). Hapi calls these "Schemes". A Scheme is made up of multiple Strategies but since we only have one, we'll just refer to it as a Scheme.

You define a Scheme as a function that takes a `server` and some `options` as arguments and go from there. Here's `api-auth.js`:

```javascript
module.exports = function (server, options) {

  return {
    // These are the standard Hapi request/reply arguments
    authenticate: function (request, reply) {

      // Get the session token from the HTTP Headers of the request
      const req = request.raw.req;
      const authorization = req.headers.authorization;
      // Fail quickly if it isn't present.
      if (!authorization) {
        return reply(Boom.unauthorized(null, 'Basic'));
      }

      // Pull the credentials from the session store that are 
      // associated with the session token. Fail if it's not valid.
      if (!tokenIsValid) {
        return reply(Boom.unauthorized('Authenication failed', 'Basic'), null);
      }

      // Authenticated, so send the credentials along the chain in 
      // case they need to be used later.
      return reply.continue({ credentials: credentials });
    }
  };
};
```

Now that we've defined our Scheme, we need to register it with Hapi. Wherever the server is set up add this:

```javascript
// Import our Scheme
const apiScheme = require('./config/api-scheme');

exports.register = function (server, options, next) {

  // Auth
  // Schemes have a name which you define here.
  server.auth.scheme('auth-scheme', apiScheme);
  
  // Strategies also have a name. This is what you'll refer 
  // to when setting schemes for routes.
  server.auth.strategy('basic-strategy', 'auth-scheme');
  
  // You can declare all routes to use a one Strategy by default.
  server.auth.default('basic-strategy');
  
  // Routes might go here
};
```

If you do use a default auth strategy, you can override that on individual routes in their handler config:

```javascript
{
  method: 'GET',
  path: '/',
  handler: function(req, reply) { reply(); },
  config: {
    auth: 'another-strategy'
  }
}
```

Or use the boolean `false` to skip auth altogether for a route, such as your session creation API.

And we're done! You now have an authenticated API. There are plenty of other points that could be expanded on, but it's getting a little long in the tooth now.

**Wait, why not use Bell?**

The Hapi organization maintains a project called [Bell](https://github.com/hapijs/bell) that is a "Third-party login plugin for hapi", including OAuth services. It's great, but the catch is that since half of our authentication takes place in the browser, we can't quite use it the way it is intended to be used.