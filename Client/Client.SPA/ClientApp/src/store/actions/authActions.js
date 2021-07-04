"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthRedirectPath = exports.autoSignIn = exports.stopAuthTimer = exports.checkAuthTimeout = exports.signOut = exports.signInSucceeded = exports.signIn = void 0;
var actionTypes = require("./authActionTypes");
var signIn = function (email, password) {
    return {
        type: actionTypes.SIGN_IN_START,
        email: email,
        password: password
    };
};
exports.signIn = signIn;
var signInSucceeded = function (token, user) {
    return {
        type: actionTypes.SIGN_IN_SUCCEEDED,
        token: token,
        user: user
    };
};
exports.signInSucceeded = signInSucceeded;
var signOut = function () {
    return {
        type: actionTypes.SIGN_OUT
    };
};
exports.signOut = signOut;
var checkAuthTimeout = function (tokenExpiration) {
    return {
        type: actionTypes.CHECK_AUTH_TIMEOUT,
        tokenExpiration: tokenExpiration
    };
};
exports.checkAuthTimeout = checkAuthTimeout;
var stopAuthTimer = function () {
    return {
        type: actionTypes.STOP_AUTH_TIMER
    };
};
exports.stopAuthTimer = stopAuthTimer;
var autoSignIn = function () {
    return {
        type: actionTypes.AUTO_SIGN_IN
    };
};
exports.autoSignIn = autoSignIn;
var setAuthRedirectPath = function (url) {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        url: url
    };
};
exports.setAuthRedirectPath = setAuthRedirectPath;
//# sourceMappingURL=authActions.js.map