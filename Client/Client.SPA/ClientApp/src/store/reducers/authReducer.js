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
var actionTypes = require("../actions/authActionTypes");
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