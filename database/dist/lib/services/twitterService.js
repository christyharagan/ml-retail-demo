var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var ml_uservices_1 = require('ml-uservices');
var TwitterService = (function (_super) {
    __extends(TwitterService, _super);
    function TwitterService() {
        _super.apply(this, arguments);
    }
    TwitterService.prototype.updateTweets = function () {
        return this.observableFactory().map(function (value) {
            declareUpdate();
            xdmp.log(value.uri);
            var sem = require('/MarkLogic/semantics.xqy');
            xdmp.log('CHECK 0');
            if (cts.search(cts.andQuery([cts.wordQuery(['awesome', 'great', 'brilliant', 'fantastic', 'amazing']), cts.documentQuery(value.uri)]))) {
                xdmp.log('CHECK 1');
                sem.rdfInsert(sem.triple(sem.iri("http://megastore.com" + value.uri), sem.iri('http://megastore.com/sentiment'), sem.iri('http://megastore.com/positiveSentiment')));
                xdmp.log('CHECK 2');
            }
            return true;
        });
    };
    Object.defineProperty(TwitterService.prototype, "updateTweets",
        __decorate([
            ml_uservices_1.mlEvent({
                scope: '/tweets/'
            }), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', []), 
            __metadata('design:returntype', Object)
        ], TwitterService.prototype, "updateTweets", Object.getOwnPropertyDescriptor(TwitterService.prototype, "updateTweets")));
    TwitterService = __decorate([
        ml_uservices_1.mlService(), 
        __metadata('design:paramtypes', [])
    ], TwitterService);
    return TwitterService;
})(ml_uservices_1.MLService);
exports.TwitterService = TwitterService;
//# sourceMappingURL=twitterService.js.map