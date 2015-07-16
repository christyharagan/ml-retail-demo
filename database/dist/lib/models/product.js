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
var ml_admin_1 = require('ml-admin');
var CategoriesFacet = (function (_super) {
    __extends(CategoriesFacet, _super);
    function CategoriesFacet() {
        _super.apply(this, arguments);
        this.name = 'categories';
    }
    return CategoriesFacet;
})(ml_admin_1.Facet);
exports.CategoriesFacet = CategoriesFacet;
var MLProduct = (function () {
    function MLProduct() {
    }
    __decorate([
        ml_admin_1.rangeIndexed({
            facet: CategoriesFacet
        }), 
        __metadata('design:type', Array)
    ], MLProduct.prototype, "categories");
    return MLProduct;
})();
exports.MLProduct = MLProduct;
//# sourceMappingURL=product.js.map