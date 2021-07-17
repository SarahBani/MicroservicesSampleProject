import * as actionTypes from './bankActionTypes';
import { Bank } from '../../models/Bank.model';

export const fetchBanks = (cityId: number | null = null, countryId: number | null = null,
    pageNo: number | null = null, pageCount: number | null = null) => {
    return {
        type: actionTypes.FETCH_BANKS,
        cityId: cityId,
        countryId: countryId,
        pageNo: pageNo,
        pageCount: pageCount,
    };
};

export const setBanks = (banks: Bank[]) => {
    return {
        type: actionTypes.SET_BANKS,
        banks: banks
    };
};

export const resetBanks = () => {
    return {
        type: actionTypes.RESET_BANKS
    };
};

export const fetchBanksCount = (cityId: number | null = null, countryId: number | null = null) => {
    return {
        type: actionTypes.FETCH_BANKS_COUNT,
        cityId: cityId,
        countryId: countryId
    };
};

export const setBanksCount = (count: number) => {
    return {
        type: actionTypes.SET_BANKS_COUNT,
        count: count
    };
};

export const fetchBank = (id: number) => {
    return {
        type: actionTypes.FETCH_BANK,
        id: id
    };
};

export const setBank = (bank: Bank) => {
    return {
        type: actionTypes.SET_BANK,
        bank: bank
    };
};

export const clearSelectedBank = () => {
    return {
        type: actionTypes.CLEAR_SELECTED_BANK
    };
};

export const uploadBankLogo = (file: any, token: string) => {
    console.log(232323);
    console.log(file);
    return {
        type: actionTypes.UPLOAD_BANK_LOGO,
        file: file,
        token: token
    };
};

export const removeBankLogo = (filePath: string, token: string) => {
    return {
        type: actionTypes.REMOVE_BANK_PHOTO,
        filePath: filePath,
        token: token
    };
};

export const saveBank = (bank: Bank, token: string) => {
    return {
        type: actionTypes.SAVE_BANK,
        bank: bank,
        token: token
    };
};

export const deleteBank = (id: number, token: string) => {
    return {
        type: actionTypes.DELETE_BANK,
        id: id,
        token: token
    };
};