var UpdateLocation = (function () {
    function UpdateLocation(customerService, refreshRate) {
        this.customerService = customerService;
        this.refreshRate = refreshRate;
    }
    UpdateLocation.prototype.updateLocation = function () {
        if (this.username) {
            var self_1 = this;
            navigator.geolocation.getCurrentPosition(doUpdatePosition);
            function doUpdatePosition(position) {
                self_1.customerService.updateLocation(self_1.username, position.coords.latitude + " " + position.coords.longitude).then(function () {
                    setTimeout(self_1.updateLocation.bind(self_1), self_1.refreshRate);
                });
            }
        }
    };
    UpdateLocation.prototype.login = function (username) {
        this.username = username;
        this.updateLocation();
    };
    UpdateLocation.prototype.logout = function () {
        this.username = null;
    };
    return UpdateLocation;
})();
exports.UpdateLocation = UpdateLocation;
//# sourceMappingURL=updateLocation.js.map