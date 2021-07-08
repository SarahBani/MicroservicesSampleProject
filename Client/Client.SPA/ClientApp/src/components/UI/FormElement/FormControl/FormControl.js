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
var enums_2 = require("../../../../shared/enums");
;
var FormControl = function (props) {
    var _a, _b, _c;
    var formElement;
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
        case enums_1.ElementTypeEnum.TextArea:
            formElement =
                React.createElement("textarea", __assign({}, props.elementConfig, { value: props.value, className: controlClasses.join(' '), onChange: props.onChange, onBlur: props.onLostFocus, disabled: props.disabled }));
            break;
        case enums_1.ElementTypeEnum.Select:
            formElement =
                React.createElement("select", { name: props.id, className: controlClasses.join(' '), title: props.value.toString(), onChange: props.onChange, onBlur: props.onLostFocus, disabled: props.disabled }, (_b = (_a = props.elementConfig) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.map(function (option) { return (React.createElement("option", { key: option.value, value: option.value }, option.text)); }));
            break;
        case enums_1.ElementTypeEnum.DropDown:
            formElement =
                React.createElement(DropDown_1.default, __assign({}, props.elementConfig, { id: props.id, className: controlClasses.join(' '), data: props.options, value: props.value.toString(), title: props.title, disabled: props.disabled, onSelect: props.onSelect, onBlur: props.onLostFocus }));
            break;
        case enums_1.ElementTypeEnum.Input:
        default:
            //let patternConfig: { pattern: string } | undefined;
            //if (props.elementConfig!.type === ElementConfigTypeEnum.Number &&
            //    props.elementConfig!.maxLength &&
            //    !props.elementConfig!.pattern) {
            //    props.elementConfig!.type = ElementConfigTypeEnum.Text;
            //    patternConfig = { pattern: "\\d".repeat(props.elementConfig!.maxLength!) };
            //}
            var keyPressHandler = void 0;
            if (props.elementConfig.type === enums_2.ElementConfigTypeEnum.Number &&
                props.elementConfig.maxLength) {
                keyPressHandler = {
                    onKeyPress: numberInputHandler
                };
            }
            var inputType = (_c = enums_2.ElementConfigTypeEnum[props.elementConfig.type]) === null || _c === void 0 ? void 0 : _c.toLowerCase();
            formElement =
                React.createElement("input", __assign({}, props.elementConfig, { type: inputType, name: props.id, value: props.value, className: controlClasses.join(' '), onChange: props.onChange, onBlur: props.onLostFocus, disabled: props.disabled, autoComplete: props.autoComplete ? 'on' : undefined }, keyPressHandler));
    }
    return (React.createElement("div", { className: classes.FormControl },
        props.label && React.createElement("label", null, props.label),
        formElement,
        validationError));
};
var numberInputHandler = function (e) {
    var _a = e.target, value = _a.value, maxLength = _a.maxLength;
    if (String(value).length >= maxLength) {
        e.preventDefault();
    }
};
exports.default = FormControl;
//# sourceMappingURL=FormControl.js.map