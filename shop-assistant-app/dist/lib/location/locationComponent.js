var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react/addons');
var locationView_1 = require('./locationView');
var Location = (function (_super) {
    __extends(Location, _super);
    function Location() {
        _super.apply(this, arguments);
    }
    Location.prototype.render = function () {
        return locationView_1.locationView(this);
    };
    Location.prototype.onClick = function (event) {
        this.props.onSelect(event.latLng.A, event.latLng.F);
    };
    return Location;
})(React.Component);
exports.Location = Location;
//# sourceMappingURL=locationComponent.js.map