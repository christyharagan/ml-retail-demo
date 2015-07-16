var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ml_uservices_1 = require('ml-uservices');
var tschuss_1 = require('tschuss');
exports = {};
var TwitterTask = (function () {
    function TwitterTask(twitterService) {
        this.twitterService = twitterService;
    }
    TwitterTask.prototype.fetchTweets = function () {
        var sem = require('/MarkLogic/semantics.xqy');
        declareUpdate();
        xdmp.directory('/customers/').toArray().forEach(function (node) {
            var customer = cts.doc(xdmp.nodeUri(node)).root;
            this.twitterService.getTweets(customer.twitterId, 'marklogic').then(function (tweets) {
                if (tweets.length > 0) {
                    for (var i = 0; i < tweets.length; i++) {
                        var tweet = tweets[i];
                        var uri = "/tweets/" + tweet.id + ".json";
                        if (!cts.doc(uri)) {
                            xdmp.documentInsert(uri, tweet);
                            sem.rdfInsert(sem.triple(sem.iri("http://megastore.com/customers/" + customer.username + ".json"), sem.iri('http://megastore.com/tweeted'), sem.iri("http://megastore.com/" + uri)));
                        }
                    }
                }
            });
        });
    };
    Object.defineProperty(TwitterTask.prototype, "fetchTweets",
        __decorate([
            ml_uservices_1.task({
                type: ml_uservices_1.FrequencyType.MINUTES,
                frequency: 1
            }), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', []), 
            __metadata('design:returntype', Object)
        ], TwitterTask.prototype, "fetchTweets", Object.getOwnPropertyDescriptor(TwitterTask.prototype, "fetchTweets")));
    TwitterTask = __decorate([
        tschuss_1.wired(__dirname),
        __param(0, tschuss_1.inject()), 
        __metadata('design:paramtypes', [Object])
    ], TwitterTask);
    return TwitterTask;
})();
exports.TwitterTask = TwitterTask;
new TwitterTask().fetchTweets();
//# sourceMappingURL=twitter.js.map