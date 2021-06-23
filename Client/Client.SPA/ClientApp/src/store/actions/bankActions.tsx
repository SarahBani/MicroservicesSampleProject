import * as actionTypes from './bankActionTypes';

export const fetchBanks = (pageNo: number, pageCount: number) => {
    return {
        type: actionTypes.FETCH_BANKS,
        pageNo: pageNo,
        pageCount: pageCount
    };
};

export const setBanks = (banks) => {
    return {
        type: actionTypes.SET_BANKS,
        banks: banks
    };
};

export const fetchBanksCount = () => {
    return {
        type: actionTypes.FETCH_BANKS_COUNT
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

export const setBank = (bank) => {
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

export const saveBank = (bank, token: string) => {
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