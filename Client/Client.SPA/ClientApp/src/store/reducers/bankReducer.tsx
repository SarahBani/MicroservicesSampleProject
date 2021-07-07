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

export const bankReducer = (state: State = initialState, action: any): any => {
    switch (action.type) {
        case actionTypes.SET_BANKS:
            return {
                ...state,
                banks: action.banks
            };
        case actionTypes.RESET_BANKS: 
            return {
                ...state,
                banks: null,
                count: 0
            };
        case actionTypes.SET_BANKS_COUNT:
            return {
                ...state,
                count: action.count
            };
        case actionTypes.SET_BANK:
            return {
                ...state,
                selectedBank: action.bank
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