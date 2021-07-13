"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var classes = require("./ListFooter.module.scss");
var Pagination_1 = require("../Pagination/Pagination");
;
var ListFooter = react_1.memo(function (props) { return (props.listCount > 0 ?
    React.createElement("div", { className: classes.ListFooter },
        React.createElement("div", null,
            React.createElement(Pagination_1.default, { pageNo: props.pageNo, pagesCount: props.pagesCount, onChange: props.onChangePage })),
        React.createElement("div", null,
            React.createElement("b", null, "Count:"),
            React.createElement("span", null, props.listCount)))
    : null); });
exports.default = ListFooter;
//# sourceMappingURL=ListFooter.js.map