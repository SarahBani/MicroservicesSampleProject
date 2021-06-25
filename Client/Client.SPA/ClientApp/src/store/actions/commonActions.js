"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.operationFailed = exports.operationSucceeded = exports.clearError = exports.raiseError = exports.hideLoader = exports.showLoader = void 0;
var actionTypes = __importStar(require("./commonActionTypes"));
var constant_1 = require("../../shared/constant");
var unknownError = {
    message: constant_1.UNKNOWN_ERROR_MESSAGE
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