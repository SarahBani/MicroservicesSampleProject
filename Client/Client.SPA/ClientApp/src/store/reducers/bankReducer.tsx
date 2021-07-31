import { Bank } from '../../models/Bank.model';
import * as actionTypes from '../actions/bankActionTypes';

export interface State {
    banks: Bank[],
    count: number,
    selectedBank: Bank | null
}

const initialState: State = {
    banks: [],
    count: 0,
    selectedBank: null
};

export const bankReducer = (state: State = initialState, payload: any): any => {
    switch (payload.type) {
        case actionTypes.RESET_BANKS:
            return {
                ...state,
                banks: null,
                count: 0
            };
        case actionTypes.SET_BANKS:
            return {
                ...state,
                banks: payload.banks
            };
        case actionTypes.SET_BANKS_COUNT:
            return {
                ...state,
                count: payload.count
            };
        case actionTypes.SET_BANK:
            return {
                ...state,
                selectedBank: payload.bank
            };
        case actionTypes.CLEAR_SELECTED_BANK:
            return {
                ...state,
                selectedBank: null
            };
        default:
            return state;
    }
};

export default bankReducer;