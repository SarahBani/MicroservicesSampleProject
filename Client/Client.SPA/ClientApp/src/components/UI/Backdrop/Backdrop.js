"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classes = require("./Backdrop.module.scss");
var enums_1 = require("../../../shared/enums");
var Backdrop = function (_a) {
    var children = _a.children, isShown = _a.isShown, type = _a.type, clicked = _a.clicked;
    return (isShown ?
        React.createElement("div", { onClick: clicked, className: [classes.Backdrop, type === enums_1.ModalTypeEnum.COMPONENT ? '' : classes.Popup].join(' ') }, children)
        : null);
};
exports.default = Backdrop;
//# sourceMappingURL=Backdrop.js.map