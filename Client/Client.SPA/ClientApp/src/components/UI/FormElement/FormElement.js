"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var FormControl_1 = require("./FormControl/FormControl");
;
var FormElement = function (_a) {
    var formElement = _a.formElement, onChange = _a.onChange, onSelect = _a.onSelect, onLostFocus = _a.onLostFocus;
    return (React.createElement(FormControl_1.default, { type: formElement.content.elementType, elementConfig: formElement.content.elementConfig, value: formElement.content.value, options: formElement.content.options, disabled: formElement.content.disabled, autoComplete: formElement.content.autoComplete, touched: formElement.content.touched, valid: formElement.content.valid, 
        //onChange={(event: FormEvent<EventTarget>) => onChange(event, formElement.id)}
        onChange: function (event) { return onChange === null || onChange === void 0 ? void 0 : onChange(event, formElement.id); }, onSelect: function (id) { return onSelect === null || onSelect === void 0 ? void 0 : onSelect(id); }, 
        //onLostFocus={(event: FormEvent<EventTarget>) => onLostFocus(event, formElement.id)}
        onLostFocus: function (event) { return onLostFocus === null || onLostFocus === void 0 ? void 0 : onLostFocus(event, formElement.id); } }));
};
exports.default = FormElement;
//# sourceMappingURL=FormElement.js.map