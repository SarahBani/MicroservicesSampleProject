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
var actionTypes = __importStar(require("../actions/commonActionTypes"));
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