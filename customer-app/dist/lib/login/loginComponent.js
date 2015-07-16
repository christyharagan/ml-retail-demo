var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var loginView_1 = require('./loginView');
var ENTER_KEY = 13;
var Login = (function (_super) {
    __extends(Login, _super);
    function Login(props) {
        _super.call(this, props);
        this.state = {
            loginDisabled: true,
            registerDisabled: true,
            loginUsername: '',
            registerFirstName: '',
            registerLastName: '',
            registerTwitterId: '',
            registerUsername: ''
        };
    }
    Login.prototype.loginOnClick = function (e) {
        if (!this.state.loginDisabled) {
            this.props.onLogin(this.state.loginUsername);
        }
        e.stopPropagation();
        e.preventDefault();
    };
    Login.prototype.registerOnClick = function (e) {
        if (!this.state.registerDisabled) {
            this.props.onRegister({
                name: {
                    firstName: this.state.registerFirstName,
                    lastName: this.state.registerLastName
                },
                loggedIn: true,
                username: this.state.registerUsername,
                twitterId: this.state.registerTwitterId
            });
        }
        e.stopPropagation();
        e.preventDefault();
    };
    Login.prototype.loginUsernameOnKeyUp = function (ev) {
        if (ev.keyCode === ENTER_KEY) {
            this.loginOnClick(ev);
        }
        else {
            var loginUsername = this.refs['loginUsername'].getValue().trim();
            this.setState({
                loginDisabled: loginUsername.length === 0,
                loginUsername: loginUsername
            });
        }
    };
    Login.prototype.registerFirstNameOnKeyUp = function (ev) {
        if (ev.keyCode === ENTER_KEY) {
            this.registerOnClick(ev);
        }
        else {
            var registerFirstName = this.refs['registerFirstName'].getValue().trim();
            this.setState({
                registerDisabled: registerFirstName.length === 0 || this.state.registerLastName.length === 0 || this.state.registerUsername.length === 0 || this.state.registerTwitterId.length === 0,
                registerFirstName: registerFirstName
            });
        }
    };
    Login.prototype.registerLastNameOnKeyUp = function (ev) {
        if (ev.keyCode === ENTER_KEY) {
            this.registerOnClick(ev);
        }
        else {
            var registerLastName = this.refs['registerLastName'].getValue().trim();
            this.setState({
                registerDisabled: this.state.registerFirstName.length === 0 || registerLastName.length === 0 || this.state.registerUsername.length === 0 || this.state.registerUsername.length === 0,
                registerLastName: registerLastName
            });
        }
    };
    Login.prototype.registerUsernameOnKeyUp = function (ev) {
        if (ev.keyCode === ENTER_KEY) {
            this.registerOnClick(ev);
        }
        else {
            var registerUsername = this.refs['registerUsername'].getValue().trim();
            this.setState({
                registerDisabled: this.state.registerFirstName.length === 0 || this.state.registerLastName.length === 0 || registerUsername.length === 0 || this.state.registerTwitterId.length === 0,
                registerUsername: registerUsername
            });
        }
    };
    Login.prototype.registerTwitterIdOnKeyUp = function (ev) {
        if (ev.keyCode === ENTER_KEY) {
            this.registerOnClick(ev);
        }
        else {
            var registerTwitterId = this.refs['registerTwitterId'].getValue().trim();
            this.setState({
                registerDisabled: this.state.registerFirstName.length === 0 || this.state.registerLastName.length === 0 || this.state.registerUsername.length === 0 || registerTwitterId.length === 0,
                registerTwitterId: registerTwitterId
            });
        }
    };
    Login.prototype.render = function () {
        return loginView_1.loginView(this);
    };
    return Login;
})(React.Component);
exports.Login = Login;
//# sourceMappingURL=loginComponent.js.map