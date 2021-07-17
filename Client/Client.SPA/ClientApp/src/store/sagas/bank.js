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
exports.deleteBankSaga = exports.saveBankSaga = exports.removeBankLogoSaga = exports.uploadBankLogoSaga = exports.fetchBankSaga = exports.fetchBanksCountSaga = exports.fetchBanksSaga = void 0;
var effects_1 = require("redux-saga/effects");
var enums_1 = require("../../shared/enums");
var actions = require("../actions/bankActions");
var commonActions = require("../actions/commonActions");
var uploadActions = require("../actions/uploadActions");
var axios_instance_1 = require("../../shared/axios-instance");
var uploadFileChannel_1 = require("./uploadFileChannel");
var utility_1 = require("../../shared/utility");
//const cancelSource = axios.CancelToken.source();
function fetchBanksSaga(payload) {
    var filters, queryString, response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.put(commonActions.showLoader())];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 16, , 18]);
                filters = [];
                if (!payload.cityId) return [3 /*break*/, 4];
                return [4 /*yield*/, filters.push("cityId=" + payload.cityId)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                if (!payload.countryId) return [3 /*break*/, 6];
                return [4 /*yield*/, filters.push("countryId=" + payload.countryId)];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                if (!payload.pageNo) return [3 /*break*/, 8];
                return [4 /*yield*/, filters.push("pageNo=" + payload.pageNo)];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8:
                if (!payload.pageCount) return [3 /*break*/, 10];
                return [4 /*yield*/, filters.push("pageCount=" + payload.pageCount)];
            case 9:
                _a.sent();
                _a.label = 10;
            case 10: return [4 /*yield*/, (filters.length > 0 ? '?' + filters.join('&') : '')];
            case 11:
                queryString = _a.sent();
                return [4 /*yield*/, axios_instance_1.default.get('/banks' + queryString, {
                        headers: utility_1.getHeaders(),
                        //cancelToken: cancelSource.token
                    })];
            case 12:
                response = _a.sent();
                if (!((response === null || response === void 0 ? void 0 : response.status) === 200)) return [3 /*break*/, 14];
                return [4 /*yield*/, effects_1.put(actions.setBanks(response.data))];
            case 13:
                _a.sent();
                _a.label = 14;
            case 14: return [4 /*yield*/, effects_1.put(commonActions.hideLoader())];
            case 15:
                _a.sent();
                return [3 /*break*/, 18];
            case 16:
                error_1 = _a.sent();
                return [4 /*yield*/, effects_1.put(commonActions.raiseError(error_1))];
            case 17:
                _a.sent();
                return [3 /*break*/, 18];
            case 18: return [2 /*return*/];
        }
    });
}
exports.fetchBanksSaga = fetchBanksSaga;
function fetchBanksCountSaga(payload) {
    var filters, queryString, response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.put(commonActions.showLoader())];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 12, , 14]);
                filters = [];
                if (!payload.cityId) return [3 /*break*/, 4];
                return [4 /*yield*/, filters.push("cityId=" + payload.cityId)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                if (!payload.countryId) return [3 /*break*/, 6];
                return [4 /*yield*/, filters.push("countryId=" + payload.countryId)];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [4 /*yield*/, (filters.length > 0 ? '?' + filters.join('&') : '')];
            case 7:
                queryString = _a.sent();
                return [4 /*yield*/, axios_instance_1.default.get('/bank/count' + queryString, {
                        headers: utility_1.getHeaders()
                    })];
            case 8:
                response = _a.sent();
                if (!((response === null || response === void 0 ? void 0 : response.status) === 200)) return [3 /*break*/, 10];
                return [4 /*yield*/, effects_1.put(actions.setBanksCount(response.data))];
            case 9:
                _a.sent();
                _a.label = 10;
            case 10: return [4 /*yield*/, effects_1.put(commonActions.hideLoader())];
            case 11:
                _a.sent();
                return [3 /*break*/, 14];
            case 12:
                error_2 = _a.sent();
                return [4 /*yield*/, effects_1.put(commonActions.raiseError(error_2))];
            case 13:
                _a.sent();
                return [3 /*break*/, 14];
            case 14: return [2 /*return*/];
        }
    });
}
exports.fetchBanksCountSaga = fetchBanksCountSaga;
function fetchBankSaga(payload) {
    var response, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.put(commonActions.showLoader())];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 9, , 11]);
                return [4 /*yield*/, axios_instance_1.default.get('/bank/' + payload.id, {
                        headers: utility_1.getHeaders()
                    })];
            case 3:
                response = _a.sent();
                if (!((response === null || response === void 0 ? void 0 : response.status) === 200)) return [3 /*break*/, 5];
                return [4 /*yield*/, effects_1.put(actions.setBank(response.data))];
            case 4:
                _a.sent();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, effects_1.put(commonActions.operationFailed(enums_1.FailedOperationEnum.FetchBank))];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [4 /*yield*/, effects_1.put(commonActions.hideLoader())];
            case 8:
                _a.sent();
                return [3 /*break*/, 11];
            case 9:
                error_3 = _a.sent();
                return [4 /*yield*/, effects_1.put(commonActions.raiseError(error_3))];
            case 10:
                _a.sent();
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}
exports.fetchBankSaga = fetchBankSaga;
function uploadBankLogoSaga(payload) {
    var formData, channel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.put(commonActions.showLoader())];
            case 1:
                _a.sent();
                return [4 /*yield*/, effects_1.put(uploadActions.startUpload())];
            case 2:
                _a.sent();
                formData = new FormData();
                formData.append("file", payload.file, payload.file.name);
                channel = effects_1.call(uploadFileChannel_1.default, '/Bank/UploadLogo/', formData, payload.token);
                console.log(channel);
                return [2 /*return*/];
        }
    });
}
exports.uploadBankLogoSaga = uploadBankLogoSaga;
function removeBankLogoSaga(payload) {
    var response, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.put(commonActions.showLoader())];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 6]);
                response = axios_instance_1.default.delete("/Bank/RemoveLogoFile?filePath=" + payload.filePath, {
                    headers: utility_1.getTokenHeaders(payload.token)
                });
                //const response: Promise<{ status: number } > = yield axiosInstance.delete(`/Bank/RemoveLogoFile?filePath=${payload.filePath}`,
                //    {
                //        headers: getTokenHeaders(payload.token)
                //    });
                //if (response?.status === 200) {
                //    console.log(433333334444);
                //    //yield put(actions.deleteBankLogo(payload.id, payload.token));
                //}
                return [4 /*yield*/, effects_1.put(commonActions.hideLoader())];
            case 3:
                //const response: Promise<{ status: number } > = yield axiosInstance.delete(`/Bank/RemoveLogoFile?filePath=${payload.filePath}`,
                //    {
                //        headers: getTokenHeaders(payload.token)
                //    });
                //if (response?.status === 200) {
                //    console.log(433333334444);
                //    //yield put(actions.deleteBankLogo(payload.id, payload.token));
                //}
                _a.sent();
                return [3 /*break*/, 6];
            case 4:
                error_4 = _a.sent();
                return [4 /*yield*/, effects_1.put(commonActions.raiseError(error_4))];
            case 5:
                _a.sent();
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}
exports.removeBankLogoSaga = removeBankLogoSaga;
function saveBankSaga(payload) {
    var response, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.put(commonActions.showLoader())];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 11, , 13]);
                response = void 0;
                if (!!payload.bank.id) return [3 /*break*/, 6];
                return [4 /*yield*/, axios_instance_1.default.post('/bank', payload.bank, {
                        headers: utility_1.getTokenHeaders(payload.token)
                    })];
            case 3:
                response = _a.sent();
                if (!((response === null || response === void 0 ? void 0 : response.status) === 201)) return [3 /*break*/, 5];
                return [4 /*yield*/, effects_1.put(commonActions.operationSucceeded(enums_1.SuccessfulOperationEnum.Insert))];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [3 /*break*/, 9];
            case 6: return [4 /*yield*/, axios_instance_1.default.put('/bank', payload.bank, {
                    headers: utility_1.getTokenHeaders(payload.token)
                })];
            case 7:
                response = _a.sent();
                if (!((response === null || response === void 0 ? void 0 : response.status) === 200)) return [3 /*break*/, 9];
                return [4 /*yield*/, effects_1.put(commonActions.operationSucceeded(enums_1.SuccessfulOperationEnum.Update))];
            case 8:
                _a.sent();
                _a.label = 9;
            case 9: return [4 /*yield*/, effects_1.put(commonActions.hideLoader())];
            case 10:
                _a.sent();
                return [3 /*break*/, 13];
            case 11:
                error_5 = _a.sent();
                console.log(error_5);
                return [4 /*yield*/, effects_1.put(commonActions.raiseError(error_5))];
            case 12:
                _a.sent();
                return [3 /*break*/, 13];
            case 13: return [2 /*return*/];
        }
    });
}
exports.saveBankSaga = saveBankSaga;
function deleteBankSaga(payload) {
    var response, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.put(commonActions.showLoader())];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 8, , 10]);
                return [4 /*yield*/, axios_instance_1.default.delete('/bank/' + payload.id, {
                        headers: utility_1.getTokenHeaders(payload.token)
                    })];
            case 3:
                response = _a.sent();
                if (!((response === null || response === void 0 ? void 0 : response.status) === 200)) return [3 /*break*/, 6];
                return [4 /*yield*/, effects_1.put(commonActions.operationSucceeded(enums_1.SuccessfulOperationEnum.Delete))];
            case 4:
                _a.sent();
                return [4 /*yield*/, effects_1.put(actions.clearSelectedBank())];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [4 /*yield*/, effects_1.put(commonActions.hideLoader())];
            case 7:
                _a.sent();
                return [3 /*break*/, 10];
            case 8:
                error_6 = _a.sent();
                return [4 /*yield*/, effects_1.put(commonActions.raiseError(error_6))];
            case 9:
                _a.sent();
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}
exports.deleteBankSaga = deleteBankSaga;
//# sourceMappingURL=bank.js.map