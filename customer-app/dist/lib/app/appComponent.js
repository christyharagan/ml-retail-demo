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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var React = require('react');
var rx_1 = require('rx');
var updateLocation_1 = require('../geolocation/updateLocation');
var tschuss_1 = require('tschuss');
var appView_1 = require('./appView');
(function (PrimaryAppState) {
    PrimaryAppState[PrimaryAppState["LOGIN"] = 0] = "LOGIN";
    PrimaryAppState[PrimaryAppState["PRODUCT"] = 1] = "PRODUCT";
})(exports.PrimaryAppState || (exports.PrimaryAppState = {}));
var PrimaryAppState = exports.PrimaryAppState;
var App = (function (_super) {
    __extends(App, _super);
    function App(props, customerService, productService) {
        _super.call(this, props);
        this.state = {
            primaryState: PrimaryAppState.LOGIN
        };
        this.customerService = customerService;
        this.productService = productService;
        this.updateLocation = new updateLocation_1.UpdateLocation(this.props.customerService, 60000);
    }
    App.prototype.onLogin = function (username) {
        var self = this;
        this.props.customerService.login(username).then(function (success) {
            if (success) {
                self.setState({
                    primaryState: PrimaryAppState.PRODUCT,
                    username: username
                });
                self.updateLocation.login(username);
            }
        }, function (error) {
            self.props.onError(error);
        });
    };
    App.prototype.onRegister = function (customer) {
        var self = this;
        this.props.customerService.register(customer).then(function (success) {
            if (success) {
                self.setState({
                    primaryState: PrimaryAppState.PRODUCT,
                    username: customer.username
                });
                self.updateLocation.login(customer.username);
            }
        }, function (error) {
            self.props.onError(error);
        });
    };
    App.prototype.onLogout = function () {
        var self = this;
        this.props.customerService.logout(this.state.username).then(function (success) {
            if (success) {
                self.setState({
                    primaryState: PrimaryAppState.LOGIN,
                    username: null
                });
                self.updateLocation.logout();
            }
        }, function (error) {
            self.props.onError(error);
        });
    };
    App.prototype.render = function () {
        return appView_1.appView(this);
    };
    App = __decorate([
        tschuss_1.wired(__dirname),
        __param(1, tschuss_1.inject()),
        __param(2, tschuss_1.inject()), 
        __metadata('design:paramtypes', [Object, Object, Object])
    ], App);
    return App;
})(React.Component);
exports.App = App;
function app(drivers) {
    return {
        DOM: rx_1.Observable.just(function () {
            return drivers.services.get().flatMap(function (services) {
                return services.product.getCategories();
            }).combineLatest(drivers.services.get(), function (categories, services) {
                return React.createElement(App, {"categories": categories, "customerService": services.customer, "productService": services.product, "onError": function (e) { return console.log(e); }});
            });
        })
    };
}
exports.app = app;
//# sourceMappingURL=appComponent.js.map