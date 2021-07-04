"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classes = require("./ConfirmDelete.module.scss");
;
var ConfirmDelete = function (_a) {
    var onOK = _a.onOK, onCancel = _a.onCancel;
    return (React.createElement("div", { className: ["container", classes.ConfirmDelete].join(' ') },
        React.createElement("div", { className: "row text-left" },
            React.createElement("div", { className: "col-12" },
                React.createElement("span", null, "Are you sure to delete this item?"))),
        React.createElement("br", null),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "col-12 text-right" },
                React.createElement("button", { className: "btn btn-danger", type: "button", onClick: onOK }, "Yes"),
                React.createElement("button", { className: "btn btn-warning", type: "button", onClick: onCancel }, " No")))));
};
exports.default = ConfirmDelete;
//# sourceMappingURL=ConfirmDelete.js.map