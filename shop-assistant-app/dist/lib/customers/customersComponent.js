var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var customersView_1 = require('./customersView');
var Customers = (function (_super) {
    __extends(Customers, _super);
    function Customers() {
        _super.apply(this, arguments);
    }
    Customers.prototype.render = function () {
        return customersView_1.customersView(this);
    };
    return Customers;
})(React.Component);
exports.Customers = Customers;
//# sourceMappingURL=customersComponent.js.map