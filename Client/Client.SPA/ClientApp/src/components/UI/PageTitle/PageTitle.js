"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classes = require("./PageTitle.module.scss");
var PageTitle = function (_a) {
    var title = _a.title;
    return (React.createElement("div", { className: classes.PageTitle },
        React.createElement("h1", null,
            React.createElement("span", null, "\u2318"),
            " ",
            title)));
};
exports.default = PageTitle;
//# sourceMappingURL=PageTitle.js.map