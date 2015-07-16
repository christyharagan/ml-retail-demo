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
var TwitterServiceML = (function () {
    function TwitterServiceML() {
    }
    TwitterServiceML.prototype.getTweets = function (username, hashtag) { return null; };
    TwitterServiceML = __decorate([
        ml_uservices_1.mlProxy(), 
        __metadata('design:paramtypes', [])
    ], TwitterServiceML);
    return TwitterServiceML;
})();
exports.TwitterServiceML = TwitterServiceML;
//# sourceMappingURL=twitterService.js.map