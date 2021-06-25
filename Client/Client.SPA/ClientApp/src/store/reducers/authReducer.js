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
var actionTypes = __importStar(require("../actions/authActionTypes"));
var initialState = {
    loggedIn: false,
    token: null,
    authRedirectPath: '/',
    user: null
};
var authReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case actionTypes.SIGN_IN_SUCCEEDED:
            return __assign(__assign({}, state), { loggedIn: true, token: action.token, user: action.user });
        case actionTypes.SIGN_OUT:
            return __assign(__assign({}, state), { loggedIn: false, token: null, user: null, authRedirectPath: '/' });
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return __assign(__assign({}, state), { authRedirectPath: action.url });
        default:
            return state;
    }
};
exports.default = authReducer;
//# sourceMappingURL=authReducer.js.map