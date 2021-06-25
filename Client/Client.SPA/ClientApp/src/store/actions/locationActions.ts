import { City } from '../../models/City.model';
import { Country } from '../../models/Country.model';
import * as actionTypes from './locationActionTypes';

export const fetchCountries = () => {
    return {
        type: actionTypes.FETCH_COUNTRIES
    };
};

export const setCountries = (countries: Country[]) => {
    return {
        type: actionTypes.SET_COUNTRIES,
        countries: countries
    };
};

export const selectCountry = (countryId: number) => {
    return {
        type: actionTypes.SELECT_COUNTRY,
        countryId: countryId
    };
};

export const setCities = (cities: City[]) => {
    return {
        type: actionTypes.SET_CITIES,
        cities: cities
    };
};

export const selectCity = (cityId: number) => {
    return {
        type: actionTypes.SELECT_CITY,
        cityId: cityId
    };
};