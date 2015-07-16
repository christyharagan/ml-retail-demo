var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var productView_1 = require('./productView');
var Product = (function (_super) {
    __extends(Product, _super);
    function Product() {
        _super.apply(this, arguments);
    }
    Product.prototype.render = function () {
        return productView_1.productView(this);
    };
    return Product;
})(React.Component);
exports.Product = Product;
//# sourceMappingURL=productComponent.js.map