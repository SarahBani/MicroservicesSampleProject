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
exports.getTokenHeaders = exports.getHeaders = exports.getErrorMessage = exports.disableForm = exports.checkValidity = exports.ValidateForm = exports.getUpdatedForm = exports.getFormElements = exports.updateObject = void 0;
var Constants = require("./constants");
var enums_1 = require("./enums");
var updateObject = function (oldObject, updatedProperties) {
    return __assign(__assign({}, oldObject), { updatedProperties: updatedProperties });
};
exports.updateObject = updateObject;
var getFormElements = function (formControls) {
    var formElements = [];
    for (var key in formControls) {
        formElements.push({
            id: key,
            content: formControls[key]
        });
    }
    return formElements;
};
exports.getFormElements = getFormElements;
//export const getUpdatedForm = (event: { target: HTMLInputElement }, formControls, controlId) => {
var getUpdatedForm = function (event, formControls, controlId) {
    var _a;
    var isControlValid = exports.checkValidity(event.target.value, formControls[controlId].validation);
    var updatedForm = __assign(__assign({}, formControls), (_a = {}, _a[controlId] = __assign(__assign({}, formControls[controlId]), { value: event.target.value, valid: isControlValid, touched: true }), _a));
    return updatedForm;
};
exports.getUpdatedForm = getUpdatedForm;
var ValidateForm = function (formControls) {
    var isValid = true;
    for (var controlId in formControls) {
        if (!formControls[controlId].valid) {
            isValid = false;
            break;
        }
    }
    return isValid;
};
exports.ValidateForm = ValidateForm;
var checkValidity = function (value, rules) {
    if (!rules) {
        return true;
    }
    if (rules.required) {
        if (!value || value.toString().trim() === '') {
            return false;
        }
    }
    if (rules.minLength) {
        if (value.toString().length < rules.minLength) {
            return false;
        }
    }
    if (rules.maxLength) {
        if (value.toString().length > rules.maxLength) {
            return false;
        }
    }
    if (rules.min) {
        if (value < rules.min) {
            return false;
        }
    }
    if (rules.max) {
        if (value > rules.max) {
            return false;
        }
    }
    if (rules.email) {
        var emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegEx.test(value.toString())) {
            return false;
        }
    }
    if (rules.pattern) {
        if (!new RegExp(rules.pattern).test(value.toString())) {
            return false;
        }
    }
    return true;
};
exports.checkValidity = checkValidity;
var disableForm = function (formControls, isDisabled) {
    var updatedForm = __assign({}, formControls);
    for (var inputId in updatedForm) {
        formControls[inputId].disabled = isDisabled;
    }
    return updatedForm;
};
exports.disableForm = disableForm;
var getErrorMessage = function (error) {
    switch (error) {
        case enums_1.HttpErrorEnum.Unauthorized:
            return Constants.ERROR_UNAUTHORIZED;
        case enums_1.HttpErrorEnum.Forbidden:
            return Constants.ERROR_FORBIDDEN;
        case enums_1.HttpErrorEnum.BadRequest:
            return Constants.ERROR_BAD_REQUEST;
        case enums_1.HttpErrorEnum.BadGateway:
            return Constants.ERROR_BAD_GATEWAY;
        case enums_1.HttpErrorEnum.NotFound:
        case enums_1.HttpErrorEnum.InternalServerError:
        default:
            return Constants.ERROR_UNKNOWN;
    }
};
exports.getErrorMessage = getErrorMessage;
var getHeaders = function () { return ({
    'Content-Type': 'application/json; charset=utf-8',
}); };
exports.getHeaders = getHeaders;
var getTokenHeaders = function (token) { return ({
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: "Bearer " + token
}); };
exports.getTokenHeaders = getTokenHeaders;
//# sourceMappingURL=utility.js.map