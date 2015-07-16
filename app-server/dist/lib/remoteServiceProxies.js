var s = require('typescript-schema');
var uservices_socket_io_client_1 = require('uservices-socket.io-client');
var commonSchema = s.rawSchemaToSchema(require('../../../ml-retail-demo-common/dist/json/schema.json'));
function productServiceProxy(client) {
    return uservices_socket_io_client_1.createRemoteProxy(client, commonSchema['ml-retail-demo-common/services/productService'].interfaces['ProductService']);
}
exports.productServiceProxy = productServiceProxy;
function customerServiceProxy(client) {
    return uservices_socket_io_client_1.createRemoteProxy(client, commonSchema['ml-retail-demo-common/services/customerService'].interfaces['CustomerService']);
}
exports.customerServiceProxy = customerServiceProxy;
function storeServiceProxy(client) {
    return uservices_socket_io_client_1.createRemoteProxy(client, commonSchema['ml-retail-demo-common/services/storeService'].interfaces['StoreService']);
}
exports.storeServiceProxy = storeServiceProxy;
//# sourceMappingURL=remoteServiceProxies.js.map