var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var productPageView_1 = require('./productPageView');
(function (PrimaryState) {
    PrimaryState[PrimaryState["SEARCH_EMPTY"] = 0] = "SEARCH_EMPTY";
    PrimaryState[PrimaryState["SEARCH_RESULT"] = 1] = "SEARCH_RESULT";
    PrimaryState[PrimaryState["PRODUCT"] = 2] = "PRODUCT";
})(exports.PrimaryState || (exports.PrimaryState = {}));
var PrimaryState = exports.PrimaryState;
var ProductPage = (function (_super) {
    __extends(ProductPage, _super);
    function ProductPage(props) {
        _super.call(this, props);
        this.state = {
            primaryState: PrimaryState.SEARCH_EMPTY
        };
    }
    ProductPage.prototype.onSearch = function (query) {
        var self = this;
        this.props.productService.searchProducts(query, this.state.selectedCategory ? [this.state.selectedCategory] : null).then(function (results) {
            self.setState({
                selectedCategory: null,
                primaryState: PrimaryState.SEARCH_RESULT,
                searchResults: results
            });
        });
    };
    ProductPage.prototype.onCategorySelect = function (category) {
        this.setState({
            selectedCategory: category
        }, function () {
            var self = this;
            this.props.productService.searchProducts('', this.state.selectedCategory ? [this.state.selectedCategory] : null).then(function (results) {
                self.setState({
                    primaryState: PrimaryState.SEARCH_RESULT,
                    searchResults: results
                });
            });
        });
    };
    ProductPage.prototype.onProductSelect = function (product) {
        this.setState({
            product: product,
            primaryState: PrimaryState.PRODUCT
        });
    };
    ProductPage.prototype.render = function () {
        return productPageView_1.productPageView(this);
    };
    return ProductPage;
})(React.Component);
exports.ProductPage = ProductPage;
//# sourceMappingURL=productPageComponent.js.map