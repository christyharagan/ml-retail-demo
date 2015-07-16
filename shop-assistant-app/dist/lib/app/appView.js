var appComponent_1 = require('./appComponent');
var customers = require('../customers/customersComponent');
var location = require('../location/locationComponent');
var React = require('react');
var r = React;
function appView(context) {
    return context.state.primaryState === appComponent_1.PrimaryAppState.MAP ?
        React.createElement(location.Location, {"onSelect": context.onMap.bind(context)}) :
        React.createElement(customers.Customers, {"customers": context.state.customers});
}
exports.appView = appView;
//# sourceMappingURL=appView.js.map