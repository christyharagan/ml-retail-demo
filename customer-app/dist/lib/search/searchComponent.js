var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var searchView_1 = require('./searchView');
var ENTER_KEY = 13;
var Search = (function (_super) {
    __extends(Search, _super);
    function Search() {
        _super.apply(this, arguments);
    }
    Search.prototype.onKeyUp = function (ev) {
        if (ev.keyCode === ENTER_KEY) {
            this.props.onSearch(this.refs['input'].getValue());
        }
    };
    Search.prototype.render = function () {
        return searchView_1.searchView(this);
    };
    return Search;
})(React.Component);
exports.Search = Search;
//# sourceMappingURL=searchComponent.js.map