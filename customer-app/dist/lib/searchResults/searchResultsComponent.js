var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var searchResultsView_1 = require('./searchResultsView');
var SearchResults = (function (_super) {
    __extends(SearchResults, _super);
    function SearchResults() {
        _super.apply(this, arguments);
    }
    SearchResults.prototype.render = function () {
        return searchResultsView_1.searchResultsView(this);
    };
    return SearchResults;
})(React.Component);
exports.SearchResults = SearchResults;
//# sourceMappingURL=searchResultsComponent.js.map