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
var classes = require("./FormControl.module.scss");
var DropDown_1 = require("../../DropDown/DropDown");
var enums_1 = require("../../../../shared/enums");
;
var FormControl = function (props) {
    var _a;
    var formElement = null;
    var controlClasses = [classes.FormElement];
    var validationError = null;
    if (!props.valid && props.touched) {
        controlClasses.push(classes.Invalid);
        validationError = (React.createElement("p", { className: classes.ValidationError },
            "Please enter a valid ",
            props.label ? props.label : 'value',
            "!"));
    }
    switch (props.type) {
        case enums_1.FormControlType.TextArea:
            formElement = React.createElement("textarea", __assign({}, props.elementConfig, { value: props.value, className: controlClasses.join(' '), onChange: props.onChange, onBlur: props.onLostFocus, disabled: props.disabled }));
            break;
        case enums_1.FormControlType.Select:
            formElement =
                React.createElement("select", { name: props.id, className: controlClasses.join(' '), title: props.value, onChange: props.onChange, onBlur: props.onLostFocus, disabled: props.disabled }, (_a = props.elementConfig) === null || _a === void 0 ? void 0 : _a.options.map(function (option) { return (React.createElement("option", { key: option.value, value: option.value }, option.text)); }));
            break;
        case enums_1.FormControlType.DropDown:
            formElement =
                React.createElement(DropDown_1.default, __assign({}, props.elementConfig, { name: props.id, className: controlClasses.join(' '), data: props.options, value: props.value, title: props.title, disabled: props.disabled, onSelect: props.onSelect, onBlur: props.onLostFocus }));
            break;
        case enums_1.FormControlType.Input:
        default:
            formElement = React.createElement("input", __assign({}, props.elementConfig, { name: props.id, value: props.value, className: controlClasses.join(' '), onChange: props.onChange, onBlur: props.onLostFocus, disabled: props.disabled, autoComplete: props.autoComplete }));
    }
    return (React.createElement("div", { className: classes.FormControl },
        props.label && React.createElement("label", null, props.label),
        formElement,
        validationError));
};
exports.default = FormControl;
//# sourceMappingURL=FormControl.js.map