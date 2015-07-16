var b = require('react-bootstrap');
var React = require('react');
var r = React;
function productView(context) {
    return React.createElement(b.Panel, {"header": context.props.product.name, "bsStyle": 'primary'}, React.createElement(b.Row, {"className": 'show-grid'}, React.createElement(b.Col, {"xs": 6, "md": 4}, React.createElement(b.Row, {"className": 'show-grid'}, React.createElement(b.Col, {"xs": 12}, React.createElement("img", {"className": "img-responsive", "src": context.props.product.imageUrl}))), React.createElement(b.Row, {"className": 'show-grid'}, React.createElement(b.Col, {"xs": 12}, context.props.product.basePrice))), React.createElement(b.Col, {"xs": 12, "md": 8}, context.props.product.description)));
}
exports.productView = productView;
//# sourceMappingURL=productView.js.map