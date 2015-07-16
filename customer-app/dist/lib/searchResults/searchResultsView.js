var b = require('react-bootstrap');
var React = require('react');
var r = React;
function matchTextToHtml(match) {
    return match['match-text'].map(function (text) {
        var highlighted = text;
        if (highlighted.highlight) {
            return React.createElement("b", null, highlighted.highlight);
        }
        else {
            return highlighted;
        }
    });
}
function searchResultsView(context) {
    return React.createElement("div", null, context.props.results.map(function (result) {
        return React.createElement(b.Panel, null, React.createElement("a", {"href": "#"}, React.createElement("h3", {"onClick": context.props.onSelect.bind(null, result.product)}, result.product.name)), matchTextToHtml(result.match));
    }));
}
exports.searchResultsView = searchResultsView;
//# sourceMappingURL=searchResultsView.js.map