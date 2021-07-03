"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var react_router_1 = require("react-router");
var react_redux_1 = require("react-redux");
require("./custom.scss");
var Layout_1 = require("../hoc/Layout/Layout");
var Home_1 = require("./Home/Home");
var Counter_1 = require("./Counter");
var FetchData_1 = require("./FetchData");
var NotFound_1 = require("./NotFound/NotFound");
var About_1 = require("./About/About");
var authActions = require("../store/actions/authActions");
;
var Auth = React.lazy(function () {
    return Promise.resolve().then(function () { return require('./Auth/Auth'); });
});
//const Profile = React.lazy(() => {
//    return import('./Profile/Profile');
//});
var Banks = React.lazy(function () {
    return Promise.resolve().then(function () { return require('./Banks/Banks'); });
});
exports.default = (function () {
    var isLoggedIn = react_redux_1.useSelector(function (state) { return ({
        isLoggedIn: state.auth.loggedIn
    }); }).isLoggedIn;
    var dispatch = react_redux_1.useDispatch();
    react_1.useEffect(function () {
        dispatch(authActions.autoSignIn());
    }, []);
    var routes = null;
    routes =
        React.createElement(react_router_1.Switch, null,
            React.createElement(react_router_1.Route, { path: '/banks/new', render: function (props) { return React.createElement(Banks, __assign({}, props, { add: true })); } }),
            React.createElement(react_router_1.Route, { path: '/banks/:id?/:action?', exact: true, component: Banks }),
            React.createElement(react_router_1.Route, { path: '/counter', component: Counter_1.default }),
            React.createElement(react_router_1.Route, { path: '/fetch-data/:startDateIndex?', component: FetchData_1.default }),
            React.createElement(react_router_1.Route, { path: '/about', component: About_1.default }),
            React.createElement(react_router_1.Route, { path: '/auth', render: function (props) { return React.createElement(Auth, __assign({}, props)); } }),
            React.createElement(react_router_1.Route, { path: '/', exact: true, component: Home_1.default }),
            React.createElement(react_router_1.Route, { component: NotFound_1.default }));
    return (React.createElement(Layout_1.default, null,
        React.createElement(react_1.Suspense, { fallback: React.createElement("p", { className: "container" }, "Loading...") }, routes)));
});
//# sourceMappingURL=App.js.map