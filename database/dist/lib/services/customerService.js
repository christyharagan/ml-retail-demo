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
function getUri(username) {
    return "/customers/" + username + ".json";
}
exports.CUSTOMER_NOT_FOUND_ERROR = 'Customer not found';
var CustomerServiceML = (function () {
    function CustomerServiceML() {
    }
    CustomerServiceML.prototype.login = function (username) {
        var uri = getUri(username);
        if (!cts.doc(uri)) {
            return ml_uservices_1.reject(exports.CUSTOMER_NOT_FOUND_ERROR);
        }
        else {
            var customer = cts.doc(uri).toObject();
            if (!customer.loggedIn) {
                customer.loggedIn = true;
                xdmp.documentInsert(uri, customer);
            }
            return ml_uservices_1.resolve(true);
        }
    };
    CustomerServiceML.prototype.logout = function (username) {
        var uri = getUri(username);
        if (!cts.doc(uri)) {
            return ml_uservices_1.reject(exports.CUSTOMER_NOT_FOUND_ERROR);
        }
        else {
            var customer = cts.doc(uri).toObject();
            if (customer.loggedIn) {
                customer.loggedIn = false;
                xdmp.documentInsert(uri, customer);
            }
            return ml_uservices_1.resolve(true);
        }
    };
    CustomerServiceML.prototype.register = function (customer) {
        var uri = getUri(customer.username);
        if (cts.doc(uri)) {
            return ml_uservices_1.resolve(false);
        }
        else {
            xdmp.documentInsert(uri, customer);
            return ml_uservices_1.resolve(true);
        }
    };
    CustomerServiceML.prototype.updateLocation = function (username, latLong) {
        var uri = getUri(username);
        if (!cts.doc(uri)) {
            return ml_uservices_1.reject(exports.CUSTOMER_NOT_FOUND_ERROR);
        }
        else {
            var customer = cts.doc(uri).toObject();
            customer.currentLocation = latLong;
            xdmp.documentInsert(uri, customer);
            return ml_uservices_1.resolve(true);
        }
    };
    Object.defineProperty(CustomerServiceML.prototype, "login",
        __decorate([
            ml_uservices_1.mlMethod({
                method: 'put'
            }), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', [String]), 
            __metadata('design:returntype', Promise)
        ], CustomerServiceML.prototype, "login", Object.getOwnPropertyDescriptor(CustomerServiceML.prototype, "login")));
    Object.defineProperty(CustomerServiceML.prototype, "logout",
        __decorate([
            ml_uservices_1.mlMethod({
                method: 'put'
            }), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', [String]), 
            __metadata('design:returntype', Promise)
        ], CustomerServiceML.prototype, "logout", Object.getOwnPropertyDescriptor(CustomerServiceML.prototype, "logout")));
    Object.defineProperty(CustomerServiceML.prototype, "register",
        __decorate([
            ml_uservices_1.mlMethod({
                method: 'put'
            }), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', [Object]), 
            __metadata('design:returntype', Promise)
        ], CustomerServiceML.prototype, "register", Object.getOwnPropertyDescriptor(CustomerServiceML.prototype, "register")));
    Object.defineProperty(CustomerServiceML.prototype, "updateLocation",
        __decorate([
            ml_uservices_1.mlMethod({
                method: 'put'
            }), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', [String, String]), 
            __metadata('design:returntype', Promise)
        ], CustomerServiceML.prototype, "updateLocation", Object.getOwnPropertyDescriptor(CustomerServiceML.prototype, "updateLocation")));
    CustomerServiceML = __decorate([
        ml_uservices_1.mlService(), 
        __metadata('design:paramtypes', [])
    ], CustomerServiceML);
    return CustomerServiceML;
})();
exports.CustomerServiceML = CustomerServiceML;
//# sourceMappingURL=customerService.js.map