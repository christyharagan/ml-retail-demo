var ml_admin_1 = require('ml-admin');
var config = require('../../../config.json');
function createClient() {
    return ml_admin_1.createAdminClient({
        port: config.database.httpPort,
        host: config.database.host,
        password: config.database.adminPassword,
        user: config.database.adminUser,
        database: config.database.database
    });
}
exports.createClient = createClient;
//# sourceMappingURL=createClient.js.map