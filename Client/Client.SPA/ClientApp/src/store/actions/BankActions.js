"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBank = exports.saveBank = exports.clearSelectedBank = exports.setBank = exports.fetchBank = exports.setBanksCount = exports.fetchBanksCount = exports.setBanks = exports.fetchBanks = void 0;
var actionTypes = require("./bankActionTypes");
var fetchBanks = function (pageNo, pageCount) {
    return {
        type: actionTypes.FETCH_BANKS,
        pageNo: pageNo,
        pageCount: pageCount
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
var fetchBanksCount = function () {
    return {
        type: actionTypes.FETCH_BANKS_COUNT
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
//# sourceMappingURL=BankActions.js.map