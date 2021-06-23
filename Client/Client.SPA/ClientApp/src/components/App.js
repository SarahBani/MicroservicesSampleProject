"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var react_router_1 = require("react-router");
require("./custom.css");
var Layout_1 = require("../hoc/Layout/Layout");
var Home_1 = require("./Home/Home");
var Counter_1 = require("./Counter");
var FetchData_1 = require("./FetchData");
exports.default = (function () {
    var Banks = React.lazy(function () {
        return Promise.resolve().then(function () { return require('./Banks/Banks'); });
    });
    var routes = null;
    routes =
        React.createElement(react_router_1.Switch, null,
            React.createElement(react_router_1.Route, { exact: true, path: '/', component: Home_1.default }),
            React.createElement(react_router_1.Route, { path: '/banks', component: Banks }),
            React.createElement(react_router_1.Route, { path: '/counter', component: Counter_1.default }),
            React.createElement(react_router_1.Route, { path: '/fetch-data/:startDateIndex?', component: FetchData_1.default }));
    return (React.createElement(Layout_1.default, null,
        React.createElement(react_1.Suspense, { fallback: React.createElement("p", { className: "container" }, "Loading...") }, routes)));
});
//# sourceMappingURL=App.js.map