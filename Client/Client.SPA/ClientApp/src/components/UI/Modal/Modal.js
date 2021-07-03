"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var classes = require("./Modal.module.scss");
var Backdrop_1 = require("../Backdrop/Backdrop");
var enums_1 = require("../../../shared/enums");
var initialModalState = {
    typeClass: null,
    title: null,
    icon: null
};
var modalReducer = function (currentState, action) {
    switch (action.type) {
        case enums_1.ModalTypeEnum.INFO:
            return __assign(__assign({}, currentState), { typeClass: classes.Info, title: null, icon: React.createElement("span", { className: "fa fa-info" }) });
        case enums_1.ModalTypeEnum.QUESTION:
            return __assign(__assign({}, currentState), { typeClass: classes.Question, title: null, icon: React.createElement("span", { className: "fa fa-question" }) });
        case enums_1.ModalTypeEnum.WARNING:
            return __assign(__assign({}, currentState), { typeClass: classes.Warning, title: 'Warning', icon: React.createElement("span", { className: "fa fa-warning" }) });
        case enums_1.ModalTypeEnum.ERROR:
            return __assign(__assign({}, currentState), { typeClass: classes.Error, title: 'Error', icon: React.createElement("span", { className: "fa fa-warning" }) });
        case enums_1.ModalTypeEnum.COMPONENT:
            return __assign(__assign({}, currentState), { typeClass: classes.Component, title: null, icon: null });
        default:
            return __assign(__assign({}, currentState), { typeClass: classes.Component, title: null, icon: null });
    }
};
;
var Modal = function (_a) {
    var children = _a.children, type = _a.type, isShown = _a.isShown, hide = _a.hide;
    var _b = react_1.useReducer(modalReducer, initialModalState), modalState = _b[0], dispatch = _b[1];
    react_1.useEffect(function () {
        dispatch({ type: type });
    }, [type]);
    return (React.createElement(react_1.Fragment, null,
        React.createElement(Backdrop_1.default, { isShown: isShown, clicked: function () { return hide; }, type: type }),
        React.createElement("div", { className: [classes.Modal, modalState.typeClass].join(' '), style: {
                transform: isShown ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: isShown ? '1' : '0'
            } },
            modalState.icon,
            children)));
};
exports.default = react_1.memo(Modal, function (prevProps, nextProps) {
    return (prevProps.isShown === nextProps.isShown && prevProps.children === nextProps.children);
});
//# sourceMappingURL=Modal.js.map