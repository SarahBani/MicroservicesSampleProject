"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var classes = require("./Footer.module.scss");
var Logo_1 = require("../Logo/Logo");
;
var Footer = function () {
    var isLoggedIn = react_redux_1.useSelector(function (state) { return ({
        isLoggedIn: state.auth.loggedIn
    }); }).isLoggedIn;
    return (React.createElement("footer", { className: classes.Footer },
        React.createElement("div", { className: "container" },
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-offset-0 col-5 col-sm-offset-2 col-sm-4 col-md-3 col-lg-2" },
                    React.createElement(Logo_1.default, null)),
                React.createElement("div", { className: "col-2 col-sm-8" },
                    React.createElement("div", { className: "row" },
                        React.createElement("ul", { className: "col-2 list-unstyled" },
                            React.createElement("li", null,
                                React.createElement(react_router_dom_1.Link, { to: { pathname: "/" } }, "Home")),
                            isLoggedIn &&
                                React.createElement("li", null,
                                    React.createElement(react_router_dom_1.Link, { to: { pathname: "/Profile" } }, "Profile")),
                            React.createElement("li", null,
                                React.createElement(react_router_dom_1.Link, { to: { pathname: "/Banks" } }, "Banks")),
                            React.createElement("li", null,
                                React.createElement(react_router_dom_1.Link, { to: { pathname: "/About" } }, "About")))))),
            React.createElement("div", { className: "text-center pb-1" },
                "\u00A9 2020 Copyright:",
                React.createElement("em", null, " Sarah Banieghbal")))));
};
exports.default = Footer;
//# sourceMappingURL=Footer.js.map