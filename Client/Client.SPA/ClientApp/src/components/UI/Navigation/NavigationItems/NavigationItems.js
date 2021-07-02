"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var classes = require("./NavigationItems.module.scss");
var NavigationItem_1 = require("./NavigationItem/NavigationItem");
var actions = require("../../../../store/actions/authActions");
;
var navigationItems = function () {
    var loggedIn = react_redux_1.useSelector(function (state) { return ({
        loggedIn: state.auth.loggedIn
    }); }).loggedIn;
    var dispatch = react_redux_1.useDispatch();
    function signOutHandler() {
        dispatch(actions.signOut());
    }
    ;
    var links = null;
    if (loggedIn) {
        links = (React.createElement(react_1.Fragment, null,
            React.createElement(NavigationItem_1.default, { link: '/', exact: true },
                React.createElement("span", { className: "fa fa-home" })),
            React.createElement(NavigationItem_1.default, { link: '/Profile' }, "Profile"),
            React.createElement(NavigationItem_1.default, { link: '/Banks' }, "Banks"),
            React.createElement(NavigationItem_1.default, { link: '/About' }, "About"),
            React.createElement(NavigationItem_1.default, { clicked: signOutHandler }, "Sign Out")));
    }
    else {
        links = (React.createElement(react_1.Fragment, null,
            React.createElement(NavigationItem_1.default, { link: '/', exact: true },
                React.createElement("i", { className: "fa fa-home" })),
            React.createElement(NavigationItem_1.default, { link: '/Banks' }, "Banks"),
            React.createElement(NavigationItem_1.default, { link: '/About' }, "About"),
            React.createElement(NavigationItem_1.default, { link: '/Auth' }, "Sign In")));
    }
    return (React.createElement("nav", null,
        React.createElement("ul", { className: classes.NavigationItems }, links)));
};
exports.default = navigationItems;
//# sourceMappingURL=NavigationItems.js.map