"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectCity = exports.setCities = exports.selectCountry = exports.setCountries = exports.fetchCountries = void 0;
var actionTypes = require("./locationActionTypes");
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