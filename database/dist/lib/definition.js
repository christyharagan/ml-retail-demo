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
var ml_admin_1 = require('ml-admin');
var speckle_1 = require('speckle');
var RetailDemo = (function () {
    function RetailDemo(config) {
        this.contentDatabase = {
            name: 'retail-demo-content',
            triples: true,
            defaultRulesets: ['/rules/twitter.rules']
        };
        this.triggersDatabase = {
            name: 'retail-demo-triggers'
        };
        this.modulesDatabase = {
            name: 'retail-demo-modules'
        };
        this.schemaDatabase = {
            name: 'retail-demo-schema'
        };
        this.config = config;
    }
    Object.defineProperty(RetailDemo.prototype, "server", {
        get: function () {
            return {
                name: 'retail-demo',
                host: this.config.database.host,
                port: this.config.database.httpPort
            };
        },
        enumerable: true,
        configurable: true
    });
    RetailDemo.prototype.customerRuleSet = function () {
        var megaStore = speckle_1.prefix('ms', 'http://megastore.com/');
        var customer = speckle_1.variable('customer');
        var tweet = speckle_1.variable('tweet');
        return speckle_1.rule('isHighValueCustomer')
            .when(customer, megaStore.uri('tweeted'), tweet)
            .and(tweet, megaStore.uri('sentiment'), megaStore.uri('positiveSentiment'))
            .then(customer, megaStore.uri('is'), megaStore.uri('highValue')).toSparql();
    };
    __decorate([
        ml_admin_1.contentDatabase(), 
        __metadata('design:type', Object)
    ], RetailDemo.prototype, "contentDatabase");
    __decorate([
        ml_admin_1.triggersDatabase(), 
        __metadata('design:type', Object)
    ], RetailDemo.prototype, "triggersDatabase");
    __decorate([
        ml_admin_1.modulesDatabase(), 
        __metadata('design:type', Object)
    ], RetailDemo.prototype, "modulesDatabase");
    __decorate([
        ml_admin_1.schemaDatabase(), 
        __metadata('design:type', Object)
    ], RetailDemo.prototype, "schemaDatabase");
    Object.defineProperty(RetailDemo.prototype, "customerRuleSet",
        __decorate([
            ml_admin_1.ruleSet({
                path: '/rules/twitter.rules'
            }), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', []), 
            __metadata('design:returntype', String)
        ], RetailDemo.prototype, "customerRuleSet", Object.getOwnPropertyDescriptor(RetailDemo.prototype, "customerRuleSet")));
    RetailDemo = __decorate([
        ml_admin_1.mlDeploy(), 
        __metadata('design:paramtypes', [Object])
    ], RetailDemo);
    return RetailDemo;
})();
exports.RetailDemo = RetailDemo;
//# sourceMappingURL=definition.js.map