"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var classes = require("./NavigationItem.module.scss");
;
var navigationItem = function (props) {
    function clickHandler(event) {
        var _a;
        console.log(111111111);
        console.log(event);
        event.preventDefault();
        (_a = props.clicked) === null || _a === void 0 ? void 0 : _a.call(props);
    }
    ;
    var link = (!!props.clicked ?
        React.createElement("a", { href: '#', onClick: clickHandler }, props.children)
        :
            React.createElement(react_router_dom_1.NavLink, { to: props.link, exact: props.exact, activeClassName: classes.active }, props.children));
    return (React.createElement("li", { className: classes.NavigationItem }, link));
};
exports.default = navigationItem;
//# sourceMappingURL=NavigationItem.js.map