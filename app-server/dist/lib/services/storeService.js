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
var ml_admin_1 = require('ml-admin');
var speckle_1 = require('speckle');
var ml_retail_demo_database_1 = require('ml-retail-demo-database');
var rx_1 = require('rx');
var tschuss_1 = require('tschuss');
var StoreServiceImpl = (function () {
    function StoreServiceImpl(client, mlTwitterService) {
        this.client = client;
        this.mlTwitterService = mlTwitterService;
    }
    StoreServiceImpl.prototype.getHighValueCustomers = function (lat, long) {
        var customer = speckle_1.variable('customer');
        var tweet = speckle_1.variable('tweet');
        var ms = speckle_1.prefix('ms', 'http://megastore.com/');
        var tweetObservable = this.mlTwitterService.updateTweets();
        var client = this.client;
        function doSearch() {
            return ml_admin_1.search(client, {
                semanticQuery: {
                    query: speckle_1.select(customer).where(customer, ms.uri('is'), ms.uri('highValue')), ruleSet: '/rules/twitter.rules', resultPrefix: 'http://megastore.com'
                },
                geoValue: {
                    lat: lat,
                    long: long,
                    geoIndex: ml_retail_demo_database_1.CustomerLocation,
                    radius: 500
                }
            }, { content: true }).then(function (searchResults) {
                return searchResults.results.map(function (result) {
                    return result.content;
                });
            });
        }
        return rx_1.Observable.concat(rx_1.Observable.fromPromise(doSearch()), tweetObservable.flatMap(function (tweet) {
            return doSearch();
        }));
    };
    StoreServiceImpl = __decorate([
        tschuss_1.wired(__dirname),
        __param(1, tschuss_1.inject()), 
        __metadata('design:paramtypes', [Object, Object])
    ], StoreServiceImpl);
    return StoreServiceImpl;
})();
exports.StoreServiceImpl = StoreServiceImpl;
//# sourceMappingURL=storeService.js.map