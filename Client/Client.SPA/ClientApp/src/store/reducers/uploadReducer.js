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
var actionTypes = require("../actions/uploadActionTypes");
var initialState = {
    fileUploadPercentage: null
};
var uploadReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case actionTypes.RESET:
            return __assign(__assign({}, state), { fileUploadPercentage: null });
        case actionTypes.START_UPLOAD:
            return __assign(__assign({}, state), { fileUploadPercentage: 0 });
        case actionTypes.SHOW_PROGRESS:
            return __assign(__assign({}, state), { fileUploadPercentage: action.progress });
        default:
            return state;
    }
};
exports.default = uploadReducer;
//# sourceMappingURL=uploadReducer.js.map