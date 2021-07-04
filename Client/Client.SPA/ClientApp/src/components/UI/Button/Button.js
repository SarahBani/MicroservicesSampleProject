"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enums_1 = require("../../../shared/enums");
var classes = require("./Button.module.scss");
;
var button = function (props) {
    var buttonTypeClass = classes[enums_1.ButtonTypeEnum[props.type]];
    return React.createElement("button", { className: [classes.Button, buttonTypeClass].join(' '), onClick: props.clicked, disabled: props.disabled }, props.children);
};
exports.default = button;
//# sourceMappingURL=Button.js.map