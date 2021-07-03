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
var actionTypes = require("../actions/locationActionTypes");
var initialState = {
    countries: [],
    cities: [],
};
var locationReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case actionTypes.SET_COUNTRIES:
            return __assign(__assign({}, state), { countries: action.countries, cities: [] });
        case actionTypes.SET_CITIES:
            return __assign(__assign({}, state), { cities: action.cities });
        case actionTypes.SELECT_CITY:
            return __assign(__assign({}, state), { selectedCity: action.city });
        default:
            return state;
    }
};
exports.default = locationReducer;
//# sourceMappingURL=locationReducer.js.map