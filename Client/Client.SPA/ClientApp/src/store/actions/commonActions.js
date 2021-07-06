"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operationFailed = exports.operationSucceeded = exports.clearError = exports.raiseError = exports.hideLoader = exports.showLoader = void 0;
var actionTypes = require("./commonActionTypes");
var Constants = require("../../shared/constants");
var unknownError = {
    message: Constants.ERROR_UNKNOWN
};
var showLoader = function () {
    return {
        type: actionTypes.SHOW_LOADER
    };
};
exports.showLoader = showLoader;
var hideLoader = function () {
    return {
        type: actionTypes.HIDE_LOADER
    };
};
exports.hideLoader = hideLoader;
var raiseError = function (error) {
    if (error === void 0) { error = unknownError; }
    return {
        type: actionTypes.RAISE_ERROR,
        error: error
    };
};
exports.raiseError = raiseError;
var clearError = function () {
    return {
        type: actionTypes.CLEAR_ERROR
    };
};
exports.clearError = clearError;
var operationSucceeded = function (operation) {
    return {
        type: actionTypes.OPERATION_SUCCEEDED,
        successfulOperation: operation
    };
};
exports.operationSucceeded = operationSucceeded;
var operationFailed = function (operation) {
    return {
        type: actionTypes.OPERATION_FAILED,
        failedOperation: operation
    };
};
exports.operationFailed = operationFailed;
//# sourceMappingURL=commonActions.js.map