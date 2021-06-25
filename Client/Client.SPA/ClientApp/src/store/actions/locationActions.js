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
exports.selectCity = exports.setCities = exports.selectCountry = exports.setCountries = exports.fetchCountries = void 0;
var actionTypes = __importStar(require("./locationActionTypes"));
var fetchCountries = function () {
    return {
        type: actionTypes.FETCH_COUNTRIES
    };
};
exports.fetchCountries = fetchCountries;
var setCountries = function (countries) {
    return {
        type: actionTypes.SET_COUNTRIES,
        countries: countries
    };
};
exports.setCountries = setCountries;
var selectCountry = function (countryId) {
    return {
        type: actionTypes.SELECT_COUNTRY,
        countryId: countryId
    };
};
exports.selectCountry = selectCountry;
var setCities = function (cities) {
    return {
        type: actionTypes.SET_CITIES,
        cities: cities
    };
};
exports.setCities = setCities;
var selectCity = function (cityId) {
    return {
        type: actionTypes.SELECT_CITY,
        cityId: cityId
    };
};
exports.selectCity = selectCity;
//# sourceMappingURL=locationActions.js.map