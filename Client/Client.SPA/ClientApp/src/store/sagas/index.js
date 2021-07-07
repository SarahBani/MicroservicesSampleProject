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
exports.watchBank = exports.watchAuth = void 0;
var effects_1 = require("redux-saga/effects");
var auth_1 = require("./auth");
//import { fetchCountriesSaga, selectCountrySaga, selectCitySaga } from './location';
var bank_1 = require("./bank");
var authActionTypes = require("../actions/authActionTypes");
//import * as locationActionTypes from '../actions/locationActionTypes';
var bankActionTypes = require("../actions/bankActionTypes");
function watchAuth() {
    var payload, bgSyncTask;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.all([
                    effects_1.takeLatest(authActionTypes.AUTO_SIGN_IN, auth_1.autoSignInSaga),
                    effects_1.takeLatest(authActionTypes.SIGN_IN_START, auth_1.signInSaga),
                    effects_1.takeLatest(authActionTypes.SIGN_OUT, auth_1.signOutSaga),
                    //takeLatest(authActionTypes.CHECK_AUTH_TIMEOUT, checkAuthTimeoutSaga);
                ])];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [4 /*yield*/, effects_1.take(authActionTypes.CHECK_AUTH_TIMEOUT)];
            case 3:
                if (!(payload = _a.sent())) return [3 /*break*/, 6];
                return [4 /*yield*/, effects_1.fork(auth_1.checkAuthTimeoutSaga, payload)];
            case 4:
                bgSyncTask = _a.sent();
                //// wait for the user to sign out
                //yield take(authActionTypes.STOP_AUTH_TIMER);
                //// user signed out. cancel the background task
                //// this will cause the forked bgSync task to jump into its finally block
                //yield cancel(bgSyncTask);
                // Or
                return [4 /*yield*/, effects_1.takeLatest(authActionTypes.STOP_AUTH_TIMER, cancelWorkerSaga, bgSyncTask)];
            case 5:
                //// wait for the user to sign out
                //yield take(authActionTypes.STOP_AUTH_TIMER);
                //// user signed out. cancel the background task
                //// this will cause the forked bgSync task to jump into its finally block
                //yield cancel(bgSyncTask);
                // Or
                _a.sent();
                return [3 /*break*/, 2];
            case 6: return [2 /*return*/];
        }
    });
}
exports.watchAuth = watchAuth;
//function* watchCheckAuthTimeout() {
//    yield takeLatest(authActionTypes.CHECK_AUTH_TIMEOUT, checkAuthTimeoutSaga);
//}
//export function* watchLocation() {
//    yield all([
//        takeLatest(locationActionTypes.FETCH_COUNTRIES, fetchCountriesSaga),
//        takeLatest(locationActionTypes.SELECT_COUNTRY, selectCountrySaga),
//        takeLatest(locationActionTypes.SELECT_CITY, selectCitySaga)
//    ]);
//}
function watchBank() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.all([
                    effects_1.takeLatest(bankActionTypes.FETCH_BANKS, bank_1.fetchBanksSaga),
                    effects_1.takeLatest(bankActionTypes.FETCH_BANKS_COUNT, bank_1.fetchBanksCountSaga),
                    effects_1.takeLatest(bankActionTypes.FETCH_BANK, bank_1.fetchBankSaga),
                    effects_1.takeLatest(bankActionTypes.SAVE_BANK, bank_1.saveBankSaga),
                    effects_1.takeLatest(bankActionTypes.DELETE_BANK, bank_1.deleteBankSaga),
                    //takeLatest(bankActionTypes.UPLOAD_BANK_PHOTO, uploadBankPhotoSaga),
                    //takeLatest(bankActionTypes.REMOVE_BANK_PHOTO, removeBankPhotoSaga),
                    //takeLatest(bankActionTypes.SAVE_BANK_PHOTO, saveBankPhotoSaga),
                    //takeLatest(bankActionTypes.DELETE_BANK_PHOTO, deleteBankPhotoSaga),
                    //takeEvery(bankActionTypes.UPLOAD_BANK_PHOTO, function* (action) {
                    //    const file = action.payload;
                    //    yield call(uploadFileSaga, file);
                    //})
                ])];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.watchBank = watchBank;
function cancelWorkerSaga(task) {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.cancel(task)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
//# sourceMappingURL=index.js.map