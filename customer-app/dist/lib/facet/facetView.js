var React = require('react');
var r = React;
function facetView(context) {
    return React.createElement("div", {"class": "list-group"}, context.props.facetValues.map(function (value) { return React.createElement("div", null, React.createElement("a", {"href": "#", "onClick": context.props.onSelect.bind(null, value), "class": "list-group-item"}, value.name, "(", value.count, ")"), React.createElement("br", null)); }));
}
exports.facetView = facetView;
//# sourceMappingURL=facetView.js.map