"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBank = exports.saveBank = exports.removeBankLogo = exports.uploadBankLogo = exports.clearSelectedBank = exports.setBank = exports.fetchBank = exports.setBanksCount = exports.fetchBanksCount = exports.resetBanks = exports.setBanks = exports.fetchBanks = void 0;
var actionTypes = require("./bankActionTypes");
var fetchBanks = function (cityId, countryId, pageNo, pageCount) {
    if (cityId === void 0) { cityId = null; }
    if (countryId === void 0) { countryId = null; }
    if (pageNo === void 0) { pageNo = null; }
    if (pageCount === void 0) { pageCount = null; }
    return {
        type: actionTypes.FETCH_BANKS,
        cityId: cityId,
        countryId: countryId,
        pageNo: pageNo,
        pageCount: pageCount,
    };
};
exports.fetchBanks = fetchBanks;
var setBanks = function (banks) {
    return {
        type: actionTypes.SET_BANKS,
        banks: banks
    };
};
exports.setBanks = setBanks;
var resetBanks = function () {
    return {
        type: actionTypes.RESET_BANKS
    };
};
exports.resetBanks = resetBanks;
var fetchBanksCount = function (cityId, countryId) {
    if (cityId === void 0) { cityId = null; }
    if (countryId === void 0) { countryId = null; }
    return {
        type: actionTypes.FETCH_BANKS_COUNT,
        cityId: cityId,
        countryId: countryId
    };
};
exports.fetchBanksCount = fetchBanksCount;
var setBanksCount = function (count) {
    return {
        type: actionTypes.SET_BANKS_COUNT,
        count: count
    };
};
exports.setBanksCount = setBanksCount;
var fetchBank = function (id) {
    return {
        type: actionTypes.FETCH_BANK,
        id: id
    };
};
exports.fetchBank = fetchBank;
var setBank = function (bank) {
    return {
        type: actionTypes.SET_BANK,
        bank: bank
    };
};
exports.setBank = setBank;
var clearSelectedBank = function () {
    return {
        type: actionTypes.CLEAR_SELECTED_BANK
    };
};
exports.clearSelectedBank = clearSelectedBank;
var uploadBankLogo = function (file, token) {
    console.log(232323);
    console.log(file);
    return {
        type: actionTypes.UPLOAD_BANK_LOGO,
        file: file,
        token: token
    };
};
exports.uploadBankLogo = uploadBankLogo;
var removeBankLogo = function (filePath, token) {
    return {
        type: actionTypes.REMOVE_BANK_PHOTO,
        filePath: filePath,
        token: token
    };
};
exports.removeBankLogo = removeBankLogo;
var saveBank = function (bank, token) {
    return {
        type: actionTypes.SAVE_BANK,
        bank: bank,
        token: token
    };
};
exports.saveBank = saveBank;
var deleteBank = function (id, token) {
    return {
        type: actionTypes.DELETE_BANK,
        id: id,
        token: token
    };
};
exports.deleteBank = deleteBank;
//# sourceMappingURL=bankActions.js.map