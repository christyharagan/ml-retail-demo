var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var facetView_1 = require('./facetView');
var Facet = (function (_super) {
    __extends(Facet, _super);
    function Facet() {
        _super.apply(this, arguments);
    }
    Facet.prototype.render = function () {
        return facetView_1.facetView(this);
    };
    return Facet;
})(React.Component);
exports.Facet = Facet;
//# sourceMappingURL=facetComponent.js.map