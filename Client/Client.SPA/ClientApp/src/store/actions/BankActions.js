"use strict";
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
exports.deleteBank = exports.saveBank = exports.clearSelectedBank = exports.setBank = exports.fetchBank = exports.setBanksCount = exports.fetchBanksCount = exports.setBanks = exports.fetchBanks = void 0;
var actionTypes = __importStar(require("./bankActionTypes"));
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
//# sourceMappingURL=bankActions.js.map