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
var http = require('http');
var RxRouter = require('koa-rx-router');
var ml_uservices_1 = require('ml-uservices');
var uservices_socket_io_server_1 = require('uservices-socket.io-server');
var path = require('path');
var s = require('typescript-schema');
var productService_1 = require('./services/productService');
var twitterService_1 = require('./services/twitterService');
var storeService_1 = require('./services/storeService');
var ml_retail_demo_database_1 = require('ml-retail-demo-database');
var tschuss_1 = require('tschuss');
var koa = require('koa');
var serve = require('koa-static');
var io = require('socket.io');
var mount = require('koa-mount');
var config = require('../../../config.json');
var dbSchema = s.rawSchemaToSchema(require('../../../database/dist/json/schema.json'));
var schema = s.rawSchemaToSchema(require('../json/schema.json'));
var commonSchema = s.rawSchemaToSchema(require('../../../common/dist/json/schema.json'));
var listenerPath = config.middle.listenerPath;
if (listenerPath.charAt(0) !== '/') {
    listenerPath = '/' + listenerPath;
}
var AppServer = (function () {
    function AppServer(customerService) {
        this.customerService = customerService;
    }
    AppServer.prototype.start = function () {
        var app = koa();
        var customerApp = koa();
        var shopAssistantApp = koa();
        var router = new RxRouter({
            prefix: listenerPath
        });
        var client = ml_retail_demo_database_1.createClient();
        var productService = new productService_1.ProductServiceImpl(client);
        var twitterService = new twitterService_1.TwitterServiceImpl({
            consumer_key: 'NBhEhVOMu0qmRJPxg5f8CNUNY',
            consumer_secret: 'RYwQtPFGTjzaJtwvuqluS80Fh5INlrtyH6eDkRzarIM2NDJDL1',
            access_token_key: '2836075834-gDCpDRnqc1MpNqHLKTutq8Nx8fOX6R8RMXKEzM5',
            access_token_secret: 'kvKG7mejlcXE1v66Nst35h5GVqgqyLjod9RjFSivoc20m'
        });
        var storeService = new storeService_1.StoreServiceImpl(client);
        app.use(router.routes());
        shopAssistantApp.use(serve(path.join(__dirname, '../../../shop-assistant-app/dist/www')));
        customerApp.use(serve(path.join(__dirname, '../../../customer-app/dist/www')));
        app.use(mount('/customer', customerApp));
        app.use(mount('/store', shopAssistantApp));
        var fn = app.callback();
        var httpServer = http.createServer(fn);
        var ioServer = io(httpServer);
        uservices_socket_io_server_1.createLocalProxy(ioServer, commonSchema['ml-retail-demo-common/services/productService'].interfaces['ProductService'], productService);
        uservices_socket_io_server_1.createLocalProxy(ioServer, commonSchema['ml-retail-demo-common/services/customerService'].interfaces['CustomerService'], this.customerService);
        uservices_socket_io_server_1.createLocalProxy(ioServer, commonSchema['ml-retail-demo-common/services/storeService'].interfaces['StoreService'], storeService);
        ml_uservices_1.createLocalProxy(dbSchema['ml-retail-demo-database/proxies/twitterService'].classes['TwitterServiceML'], twitterService, client, router);
        httpServer.listen(config.middle.port, config.middle.host, function (err) {
            if (err) {
                throw err;
            }
            console.log('Server listening on port %s', this.address().port);
        });
    };
    AppServer.prototype.stop = function () {
    };
    AppServer = __decorate([
        __param(0, tschuss_1.inject()), 
        __metadata('design:paramtypes', [Object])
    ], AppServer);
    return AppServer;
})();
exports.AppServer = AppServer;
function createAppServer() {
    var app = koa();
    var customerApp = koa();
    var shopAssistantApp = koa();
    var router = new RxRouter({
        prefix: listenerPath
    });
    var client = ml_retail_demo_database_1.createClient();
    var mlProductService = ml_retail_demo_database_1.productServiceProxy(client, router);
    var customerService = ml_retail_demo_database_1.customerServiceProxy(client, router);
    var mlTwitterService = ml_retail_demo_database_1.twitterServiceProxy(client, router);
    var productService = new productService_1.ProductServiceImpl(client, mlProductService);
    var twitterService = new twitterService_1.TwitterServiceImpl({
        consumer_key: 'NBhEhVOMu0qmRJPxg5f8CNUNY',
        consumer_secret: 'RYwQtPFGTjzaJtwvuqluS80Fh5INlrtyH6eDkRzarIM2NDJDL1',
        access_token_key: '2836075834-gDCpDRnqc1MpNqHLKTutq8Nx8fOX6R8RMXKEzM5',
        access_token_secret: 'kvKG7mejlcXE1v66Nst35h5GVqgqyLjod9RjFSivoc20m'
    });
    var storeService = new storeService_1.StoreServiceImpl(client, mlTwitterService);
    app.use(router.routes());
    shopAssistantApp.use(serve(path.join(__dirname, '../../../shop-assistant-app/dist/www')));
    customerApp.use(serve(path.join(__dirname, '../../../customer-app/dist/www')));
    app.use(mount('/customer', customerApp));
    app.use(mount('/store', shopAssistantApp));
    var fn = app.callback();
    var httpServer = http.createServer(fn);
    var ioServer = io(httpServer);
    uservices_socket_io_server_1.createLocalProxy(ioServer, commonSchema['ml-retail-demo-common/services/productService'].interfaces['ProductService'], productService);
    uservices_socket_io_server_1.createLocalProxy(ioServer, commonSchema['ml-retail-demo-common/services/customerService'].interfaces['CustomerService'], customerService);
    uservices_socket_io_server_1.createLocalProxy(ioServer, commonSchema['ml-retail-demo-common/services/storeService'].interfaces['StoreService'], storeService);
    ml_uservices_1.createLocalProxy(schema['ml-retail-demo-app-server/services/twitterService'].classes['TwitterServiceImpl'], twitterService, client, router);
    httpServer.listen(config.middle.port, config.middle.host, function (err) {
        if (err) {
            throw err;
        }
        console.log('Server listening on port %s', this.address().port);
    });
}
exports.createAppServer = createAppServer;
createAppServer();
//# sourceMappingURL=appServer.js.map