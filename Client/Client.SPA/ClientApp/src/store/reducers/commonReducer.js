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
var actionTypes = require("../actions/commonActionTypes");
var initialState = {
    isLoading: false,
    error: null,
    successfulOperation: null,
    failedOperation: null
};
var commonReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case actionTypes.SHOW_LOADER:
            return __assign(__assign({}, state), { isLoading: true, error: null, successfulOperation: null, failedOperation: null });
        case actionTypes.HIDE_LOADER:
            return __assign(__assign({}, state), { isLoading: false });
        case actionTypes.RAISE_ERROR:
            return __assign(__assign({}, state), { isLoading: false, error: action.error });
        case actionTypes.CLEAR_ERROR:
            return __assign(__assign({}, state), { isLoading: false, error: null, successfulOperation: null, failedOperation: null });
        case actionTypes.OPERATION_SUCCEEDED:
            return __assign(__assign({}, state), { successfulOperation: action.successfulOperation, failedOperation: null });
        case actionTypes.OPERATION_FAILED:
            return __assign(__assign({}, state), { successfulOperation: null, failedOperation: action.failedOperation });
        default:
            return state;
    }
};
exports.default = commonReducer;
//# sourceMappingURL=commonReducer.js.map