var b = require('react-bootstrap');
var React = require('react');
var r = React;
function customersView(context) {
    return React.createElement("div", {"className": "container"}, React.createElement(b.Navbar, {"brand": 'MegaStore Shop Assistant App', "inverse": true, "toggleNavKey": 0}, React.createElement(b.Nav, {"right": true, "eventKey": 0}, React.createElement(b.NavItem, {"eventKey": 1, "href": '#'}, "Logout"))), React.createElement(b.Row, null, React.createElement(b.Col, {"xs": 12}, React.createElement("h1", null, "High Value Customers")), React.createElement(b.Col, {"xs": 12}, context.props.customers.map(function (result) {
        return React.createElement(b.Panel, null, React.createElement("h3", null, result.name.firstName + ' ' + result.name.lastName), "Location: ", result.currentLocation);
    }))));
}
exports.customersView = customersView;
//# sourceMappingURL=customersView.js.map