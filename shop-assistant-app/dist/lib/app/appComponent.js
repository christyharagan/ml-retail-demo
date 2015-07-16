var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var rx_1 = require('rx');
var appView_1 = require('./appView');
(function (PrimaryAppState) {
    PrimaryAppState[PrimaryAppState["MAP"] = 0] = "MAP";
    PrimaryAppState[PrimaryAppState["CUSTOMERS"] = 1] = "CUSTOMERS";
})(exports.PrimaryAppState || (exports.PrimaryAppState = {}));
var PrimaryAppState = exports.PrimaryAppState;
var App = (function (_super) {
    __extends(App, _super);
    function App(props) {
        _super.call(this, props);
        this.state = {
            primaryState: PrimaryAppState.MAP,
            customers: []
        };
    }
    App.prototype.onMap = function (lat, long) {
        var self = this;
        self.setState({
            primaryState: PrimaryAppState.CUSTOMERS
        });
        this.props.storeService.getHighValueCustomers(lat, long).subscribe(function (customers) {
            self.setState({
                customers: customers
            });
        });
    };
    App.prototype.render = function () {
        return appView_1.appView(this);
    };
    return App;
})(React.Component);
exports.App = App;
function app(drivers) {
    return {
        DOM: rx_1.Observable.just(function () {
            return drivers.services.get().map(function (services) {
                return React.createElement(App, {"storeService": services.store, "onError": function (e) { return console.log(e); }});
            });
        })
    };
}
exports.app = app;
//# sourceMappingURL=appComponent.js.map