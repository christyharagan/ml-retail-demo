Marklogic Retail Demo
==

Overview
--

A retail demo built on Marklogic

Usage
--

You will need node v0.12 or iojs

(Note: the ```npm link``` commands may need to be run as sudo if running on a Mac, although ``` npm link X``` probably doesn't)

Check out from github, then perform the following:

From the ml-retail-demo folder change the config.json file to suit your requirements. Note: For the database host name, use the one that existing Marklogic forests use (on a Mac especially, the hostname Marklogic references can be different from localhost)

From the common project run:

```
npm install
npm link
gulp build-schema
```

Then from the database project run:

```
npm link ml-retail-demo-common
npm install
npm link
gulp build-schema
gulp build-database
```

Then from the app-server project run: (Note: currently the gulp-build schema command here fails. Assuming you didn't change any of the middle tier options in config.josn, you won't need to run this command. But a fix for this is coming soon)

```
npm link ml-retail-demo-common
npm link ml-retail-demo-database
npm install
npm link
gulp build-schema
```

To run the app-server do:

```
cd dist/lib
node --harmony appServer.js
```

There are a couple of post-install steps you need to run until all the code is working:

Go to the Marklogic query console and under the retail-demo-modules database run the following javascript query (Note: there is a reference to your hostname and port of the app-server in that code; change as necessary)

```JavaScript
declareUpdate();
  var textNode = new NodeBuilder();
  textNode.addText('var RemoteProxy = require("/ext/ml-uservices").RemoteProxy;\n'+
'var TwitterTask = (function () {\n'+
'    function TwitterTask(twitterService) {\n'+
'    }\n'+
'    TwitterTask.prototype.fetchTweets = function () {\n'+
'        var proxy = new RemoteProxy("http://localhost:8080/mlListener/ml-retail-demo-app-server-services-twitterService-TwitterServiceImpl", {headers:{"content-type": "application/json"}})\n' +
'        var twitterService = {\n'+
'          getTweets: proxy.invokeMethod.bind(proxy, "getTweets")\n'+
'        }\n' +
'        var sem = require("/MarkLogic/semantics.xqy");\n'+
'        declareUpdate();\n'+
'        xdmp.directory("/customers/").toArray().forEach(function (node) {\n'+
'            var customer = cts.doc(xdmp.nodeUri(node)).root;\n'+
'            twitterService.getTweets(customer.twitterId, "marklogic2").then(function (tweets) {\n'+
'                if (tweets.length > 0) {\n'+
'                    for (var i = 0; i < tweets.length; i++) {\n'+
'                        var tweet = tweets[i];\n'+
'                        var uri = "/tweets/" + tweet.id + ".json";\n'+
'                        if (!cts.doc(uri)) {\n'+
'                            xdmp.documentInsert(uri, tweet);\n'+
'                            sem.rdfInsert(sem.triple(sem.iri("http://megastore.com/customers/" + customer.username + ".json"), sem.iri("http://megastore.com/tweeted"), sem.iri("http://megastore.com/" + uri)));\n'+
'                        }\n'+
'                    }\n'+
'                }\n'+
'            });\n'+
'        });\n'+
'    };\n'+
'    return TwitterTask;\n'+
'})();\n'+
'new TwitterTask().fetchTweets();');

textNode = textNode.toNode()
xdmp.documentInsert('/ext/ml-retail-demo-database-tasks-twitter.sjs', textNode)
```

And from the retail-demo-schemas database run:

```JavaScript
declareUpdate();
  var textNode = new NodeBuilder();
  textNode.addText('# geographic rules for inference\\n'+
    'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns>\\n' +
    'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema/>\\n' +
    'PREFIX ex: <http://example.com/>\\n' +
    'rule "isHVC" CONSTRUCT {\\n' +
    '  ?customer <http://megastore.com/is> <http://megastore.com/highValue>\\n' +
    '} {\\n' +
    '  ?customer <http://megastore.com/tweeted> ?tweet .\\n' +
    '  ?tweet <http://megastore.com/sentiment> <http://megastore.com/positiveSentiment>\\n' +
    '}');
  textNode = textNode.toNode();

  xdmp.documentInsert('/rules/twitter.rules', textNode)
```

To open the customer app go to:

[http://localhost:8080/customer/index.html]

To open the store-assistant app go to:

[http://localhost:8080/store/index.html]

Obviously replacing the hostname and port as necessary

Optional steps - if you wish to change the client code are:

From the customer-app/shop-assistant-app project (the commands are the same)

```
npm link ml-retail-demo-common
npm link ml-retail-demo-database
npm link ml-retail-demo-app-server
npm install
```

If you make any changes to the code then run

```
gulp build
```

Known Issues:
--

 - As of now, the Twitter code stopped working. I need to check that out. The "high value customer" appears to work, but it isn't actually fetching tweets.
