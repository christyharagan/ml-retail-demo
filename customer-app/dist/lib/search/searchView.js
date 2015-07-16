var b = require('react-bootstrap');
var React = require('react');
var r = React;
function searchView(context) {
    return React.createElement(b.Input, {"type": 'text', "placeholder": 'Enter text', "label": 'Search for products', "groupClassName": 'group-class', "labelClassName": 'label-class', "ref": 'input', "onKeyUp": context.onKeyUp.bind(context)});
}
exports.searchView = searchView;
//# sourceMappingURL=searchView.js.map