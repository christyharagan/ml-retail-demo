var s = require('typescript-schema');
var ml_uservices_1 = require('ml-uservices');
var dbSchema = s.rawSchemaToSchema(require('../json/schema.json'));
var commonSchema = s.rawSchemaToSchema(require('../../../common/dist/json/schema.json'));
function productServiceProxy(client, server) {
    return ml_uservices_1.createRemoteProxy(dbSchema['ml-retail-demo-database/services/productService'].classes['ProductService'], client, server);
}
exports.productServiceProxy = productServiceProxy;
function customerServiceProxy(client, server) {
    return ml_uservices_1.createRemoteProxy(dbSchema['ml-retail-demo-database/services/customerService'].classes['CustomerServiceML'], client, server);
}
exports.customerServiceProxy = customerServiceProxy;
function twitterServiceProxy(client, server) {
    return ml_uservices_1.createRemoteProxy(dbSchema['ml-retail-demo-database/services/twitterService'].classes['TwitterService'], client, server);
}
exports.twitterServiceProxy = twitterServiceProxy;
function twitterSpec() {
    return commonSchema['ml-retail-demo-common/services/twitterService'].interfaces['TwitterService'];
}
exports.twitterSpec = twitterSpec;
//# sourceMappingURL=remoteServiceProxies.js.map