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
exports.bankReducer = void 0;
var actionTypes = require("../actions/bankActionTypes");
var initialState = {
    banks: [],
    count: 0,
    selectedBank: null
};
var bankReducer = function (state, payload) {
    if (state === void 0) { state = initialState; }
    switch (payload.type) {
        case actionTypes.RESET_BANKS:
            return __assign(__assign({}, state), { banks: null, count: 0 });
        case actionTypes.SET_BANKS:
            return __assign(__assign({}, state), { banks: payload.banks });
        case actionTypes.SET_BANKS_COUNT:
            return __assign(__assign({}, state), { count: payload.count });
        case actionTypes.SET_BANK:
            return __assign(__assign({}, state), { selectedBank: payload.bank });
        case actionTypes.CLEAR_SELECTED_BANK:
            return __assign(__assign({}, state), { selectedBank: null });
        default:
            return state;
    }
};
exports.bankReducer = bankReducer;
exports.default = exports.bankReducer;
//# sourceMappingURL=bankReducer.js.map