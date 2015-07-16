var core_1 = require('@cycle/core');
var cycle_react_1 = require('cycle-react');
var rx_1 = require('rx');
var ml_retail_demo_app_server_1 = require('ml-retail-demo-app-server');
var io = require('socket.io-client');
var appComponent_1 = require('./app/appComponent');
var config = require('../../../config.json');
var ioClient = io("http://" + config.middle.host + ":" + config.middle.port);
var productService = ml_retail_demo_app_server_1.productServiceProxy(ioClient);
var customerService = ml_retail_demo_app_server_1.customerServiceProxy(ioClient);
core_1.run(appComponent_1.app, {
    DOM: cycle_react_1.makeDOMDriver('.app'),
    services: function () {
        return {
            get: function () {
                return rx_1.Observable.just({
                    customer: customerService,
                    product: productService
                });
            }
        };
    }
});
//# sourceMappingURL=index.js.map