var http = require('http');
var RxRouter = require('koa-rx-router');
function createTestServer() {
    var koa = require('koa');
    var app = koa();
    var config = require('../../../config.json');
    var router = new RxRouter({
        prefix: config.middle.listenerPath
    });
    return [router, function () {
            return new Promise(function (resolve, reject) {
                app.use(router.routes());
                var fn = app.callback();
                var httpServer = http.createServer(fn);
                httpServer.listen(8080, function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        }];
}
exports.createTestServer = createTestServer;
//# sourceMappingURL=testServer.js.map