require('should');
require('should-promised');
var createClient_1 = require('../../lib/createClient');
var remoteServiceProxies_1 = require('../../lib/remoteServiceProxies');
var testServer_1 = require('../testServer');
var customer = {
    username: 'christy',
    twitterId: 'christyharagan',
    name: {
        firstName: 'Christy',
        lastName: 'Haragan'
    },
    currentLocation: '500 500',
    loggedIn: false
};
function testRegisterAndLogin() {
    var _a = testServer_1.createTestServer(), server = _a[0], cb = _a[1];
    var customerProxy = remoteServiceProxies_1.customerServiceProxy(createClient_1.createClient(), server);
    return cb().then(function () {
        //    return customerProxy.register(customer)
        return customerProxy.login('christy').then(function (v) {
            throw 'Customer christy should not exist';
        }, function (e) {
            return customerProxy.register(customer);
        }).then(function () {
            return customerProxy.login('christy');
        }).then(function (result) {
            result.should.be.true;
            return customerProxy.login('christy');
        }).then(function (result) {
            result.should.be.false;
            return customerProxy.logout('christy');
        }).then(function (result) {
            result.should.be.true;
            return true;
        });
    });
}
exports.testRegisterAndLogin = testRegisterAndLogin;
describe('getLastRestartTimestamp', function () {
    it('should return a valid timestamp', function () {
        return testRegisterAndLogin().should.finally.be.true;
    });
});
//# sourceMappingURL=customerServiceTest.js.map