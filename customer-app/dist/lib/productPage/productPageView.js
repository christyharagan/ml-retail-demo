var b = require('react-bootstrap');
var productPageComponent_1 = require('./productPageComponent');
var search = require('../search/searchComponent');
var product = require('../product/productComponent');
var searchResults = require('../searchResults/searchResultsComponent');
var facet = require('../facet/facetComponent');
var React = require('react');
var r = React;
function productPageView(context) {
    return React.createElement("div", null, React.createElement(b.Navbar, {"brand": 'MegaStore Customer App', "inverse": true, "toggleNavKey": 0}, React.createElement(b.Nav, {"right": true, "eventKey": 0}, React.createElement(b.NavItem, {"eventKey": 1, "href": '#', "onClick": context.props.onLogout.bind(context)}, "Logout"))), React.createElement(b.Grid, null, React.createElement(b.Row, null, React.createElement(b.Col, {"xs": 12}, React.createElement(search.Search, {"onSearch": context.onSearch.bind(context)}))), React.createElement(b.Row, null, React.createElement(b.Col, {"md": 4, "className": "container"}, React.createElement(b.Panel, {"header": "Product Categories"}, React.createElement(facet.Facet, {"facetValues": context.props.categories, "onSelect": context.onCategorySelect.bind(context)}))), React.createElement(b.Col, {"md": 8}, context.state.primaryState === productPageComponent_1.PrimaryState.PRODUCT ?
        React.createElement(product.Product, {"product": context.state.product}) :
        React.createElement(searchResults.SearchResults, {"results": context.state.searchResults || [], "onSelect": context.onProductSelect.bind(context)}))), React.createElement("footer", null, React.createElement("p", null, "Copyright (c) Christy Haragan 2015"))));
}
exports.productPageView = productPageView;
//# sourceMappingURL=productPageView.js.map