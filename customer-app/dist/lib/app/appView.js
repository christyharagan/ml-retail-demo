var appComponent_1 = require('./appComponent');
var login = require('../login/loginComponent');
var productPage = require('../productPage/productPageComponent');
var React = require('react');
var r = React;
function appView(context) {
    return context.state.primaryState === appComponent_1.PrimaryAppState.LOGIN ?
        React.createElement(login.Login, {"onLogin": context.onLogin.bind(context), "onRegister": context.onRegister.bind(context)}) :
        React.createElement(productPage.ProductPage, {"onLogout": context.onLogout.bind(context), "onError": context.props.onError.bind(context), "productService": context.props.productService, "categories": context.props.categories});
}
exports.appView = appView;
//# sourceMappingURL=appView.js.map