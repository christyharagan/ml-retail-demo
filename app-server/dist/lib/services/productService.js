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
var rx_1 = require('rx');
var ml_admin_1 = require('ml-admin');
var ml_retail_demo_database_1 = require('ml-retail-demo-database');
var tschuss_1 = require('tschuss');
var ProductServiceImpl = (function () {
    function ProductServiceImpl(client, mlProductService) {
        this.client = client;
        this.mlProductService = mlProductService;
    }
    ProductServiceImpl.prototype.searchProducts = function (query, facetValues) {
        var fvs;
        if (facetValues) {
            fvs = facetValues.map(function (facetValue) {
                return {
                    value: facetValue.value,
                    facet: ml_retail_demo_database_1.CategoriesFacet
                };
            });
        }
        return ml_admin_1.search(this.client, {
            query: query,
            facetValues: fvs
        }, { highlights: true, content: true }).then(function (results) {
            return results.results.map(function (result) {
                return {
                    product: result.content,
                    match: result.matches[0]
                };
            });
        });
    };
    ProductServiceImpl.prototype.getCategories = function () {
        var promise = ml_admin_1.getFacetValues(this.client, ml_retail_demo_database_1.CategoriesFacet, '/products');
        var firstResult = rx_1.Observable.fromPromise(promise);
        var restOfPromises = this.mlProductService.updateCategories();
        return firstResult.concat(restOfPromises);
    };
    ProductServiceImpl = __decorate([
        __param(1, tschuss_1.inject()), 
        __metadata('design:paramtypes', [Object, Object])
    ], ProductServiceImpl);
    return ProductServiceImpl;
})();
exports.ProductServiceImpl = ProductServiceImpl;
//# sourceMappingURL=productService.js.map