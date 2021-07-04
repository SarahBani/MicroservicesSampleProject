"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classes = require("./Backdrop.module.scss");
var enums_1 = require("../../../shared/enums");
var Backdrop = function (props) { return (props.isShown ?
    React.createElement("div", { onClick: props.onClick, className: [classes.Backdrop, props.type === enums_1.ModalTypeEnum.Component ? '' : classes.Popup].join(' ') }, props.children)
    : null); };
exports.default = Backdrop;
//# sourceMappingURL=Backdrop.js.map