"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoSignInSaga = exports.checkAuthTimeoutSaga = exports.signOutSaga = exports.signInSaga = exports.delay = void 0;
var effects_1 = require("redux-saga/effects");
var axios_instance_1 = require("../../shared/axios-instance");
var actions = require("../actions/authActions");
var commonActions = require("../actions/commonActions");
var Constants = require("../../shared/constants");
var authStorageKeyName = 'auth_token';
var delay = function (ms) {
    return new Promise(function (res) { return setTimeout(res, ms); });
};
exports.delay = delay;
function signInSaga(payload) {
    var data, response, authResponse, user, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, effects_1.put(commonActions.showLoader())];
            case 1:
                _b.sent();
                data = {
                    email: payload.email,
                    password: payload.password
                };
                _b.label = 2;
            case 2:
                _b.trys.push([2, 12, , 14]);
                return [4 /*yield*/, axios_instance_1.default.post('/login', data)];
            case 3:
                response = _b.sent();
                if (!((response === null || response === void 0 ? void 0 : response.status) === 200)) return [3 /*break*/, 8];
                return [4 /*yield*/, localStorage.setItem(authStorageKeyName, JSON.stringify(response.data))];
            case 4:
                _b.sent();
                authResponse = response.data;
                user = {
                    email: authResponse.email
                };
                return [4 /*yield*/, effects_1.call([localStorage, 'setItem'], authStorageKeyName, JSON.stringify(authResponse))];
            case 5:
                _b.sent();
                return [4 /*yield*/, effects_1.put(actions.signInSucceeded(authResponse.token, user))];
            case 6:
                _b.sent();
                return [4 /*yield*/, effects_1.put(actions.checkAuthTimeout(authResponse.tokenExpiration))];
            case 7:
                _b.sent();
                return [3 /*break*/, 10];
            case 8: return [4 /*yield*/, effects_1.put(commonActions.raiseError({
                    message: (_a = response === null || response === void 0 ? void 0 : response.data) !== null && _a !== void 0 ? _a : Constants.ERROR_UNKNOWN
                }))];
            case 9:
                _b.sent();
                _b.label = 10;
            case 10: return [4 /*yield*/, effects_1.put(commonActions.hideLoader())];
            case 11:
                _b.sent();
                return [3 /*break*/, 14];
            case 12:
                error_1 = _b.sent();
                return [4 /*yield*/, effects_1.put(commonActions.raiseError(error_1))];
            case 13:
                _b.sent();
                return [3 /*break*/, 14];
            case 14: return [2 /*return*/];
        }
    });
}
exports.signInSaga = signInSaga;
function signOutSaga() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.all([
                    //localStorage.removeItem(authStorageKeyName),
                    effects_1.call([localStorage, 'removeItem'], authStorageKeyName),
                    effects_1.put(actions.stopAuthTimer()),
                ])];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.signOutSaga = signOutSaga;
function checkAuthTimeoutSaga(payload) {
    var duration;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (new Date(payload.tokenExpiration).getTime() - new Date().getTime())];
            case 1:
                duration = _a.sent();
                //delay(duration);
                return [4 /*yield*/, effects_1.call(exports.delay, duration)];
            case 2:
                //delay(duration);
                _a.sent();
                return [4 /*yield*/, effects_1.put(actions.signOut())];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.checkAuthTimeoutSaga = checkAuthTimeoutSaga;
function autoSignInSaga() {
    var authResponse, _a, _b, expirationDateTime, user;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = JSON).parse;
                return [4 /*yield*/, effects_1.call([localStorage, 'getItem'], authStorageKeyName)];
            case 1:
                authResponse = _b.apply(_a, [_c.sent()]);
                if (!authResponse) return [3 /*break*/, 6];
                expirationDateTime = new Date(authResponse.tokenExpiration);
                if (!(expirationDateTime > new Date())) return [3 /*break*/, 4];
                user = {
                    email: authResponse.email
                };
                return [4 /*yield*/, effects_1.put(actions.signInSucceeded(authResponse.token, user))];
            case 2:
                _c.sent();
                return [4 /*yield*/, effects_1.put(actions.checkAuthTimeout(authResponse.tokenExpiration))];
            case 3:
                _c.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, effects_1.put(actions.signOut())];
            case 5:
                _c.sent();
                _c.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}
exports.autoSignInSaga = autoSignInSaga;
//# sourceMappingURL=auth.js.map