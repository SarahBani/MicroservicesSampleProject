"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_1 = require("react");
var react_router_1 = require("react-router");
require("./custom.css");
var Layout_1 = __importDefault(require("../hoc/Layout/Layout"));
var Home_1 = __importDefault(require("./Home/Home"));
var Counter_1 = __importDefault(require("./Counter"));
var FetchData_1 = __importDefault(require("./FetchData"));
exports.default = (function () {
    var Banks = React.lazy(function () {
        return Promise.resolve().then(function () { return __importStar(require('./Banks/Banks')); });
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