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
var ProductService = (function (_super) {
    __extends(ProductService, _super);
    function ProductService() {
        _super.apply(this, arguments);
    }
    ProductService.prototype.updateCategories = function () {
        return this.observableFactory().map(function (value) {
            var x = cts.values(cts.pathReference('/categories')).toArray();
            var arr = [];
            for (var i = 0; i < x.length; i++) {
                var value_1 = x[i];
                arr.push({ name: value_1, value: value_1, count: cts.frequency(value_1) });
            }
            return arr;
        });
    };
    Object.defineProperty(ProductService.prototype, "updateCategories",
        __decorate([
            ml_uservices_1.mlEvent({
                scope: '/products/'
            }), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', []), 
            __metadata('design:returntype', Object)
        ], ProductService.prototype, "updateCategories", Object.getOwnPropertyDescriptor(ProductService.prototype, "updateCategories")));
    ProductService = __decorate([
        ml_uservices_1.mlService(), 
        __metadata('design:paramtypes', [])
    ], ProductService);
    return ProductService;
})(ml_uservices_1.MLService);
exports.ProductService = ProductService;
//# sourceMappingURL=productService.js.map