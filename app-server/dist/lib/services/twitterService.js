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
var Twitter = require('twitter');
var tschuss_1 = require('tschuss');
var TwitterServiceImpl = (function () {
    function TwitterServiceImpl(config) {
        this.config = config;
        this.client = new Twitter(this.config);
    }
    TwitterServiceImpl.prototype.getTweets = function (username, hashtag) {
        var client = this.client;
        return new Promise(function (resolve, reject) {
            client.get('search/tweets', { q: "from:" + username + " #" + hashtag }, function (error, tweets, response) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(tweets.statuses.map(function (tweet) {
                        return {
                            message: tweet.text,
                            id: tweet.id
                        };
                    }));
                }
            });
        });
    };
    TwitterServiceImpl = __decorate([
        tschuss_1.bind(), 
        __metadata('design:paramtypes', [Object])
    ], TwitterServiceImpl);
    return TwitterServiceImpl;
})();
exports.TwitterServiceImpl = TwitterServiceImpl;
//# sourceMappingURL=twitterService.js.map