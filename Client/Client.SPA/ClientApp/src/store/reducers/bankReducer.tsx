import * as actionTypes from '../actions/bankActionTypes';

const initialState = {
    banks: [],
    count: 0,
    selectedBank: null,
    photos: [],
};

const bankReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.SET_BANKS:
            return {
                ...state,
                hotels: action.hotels
            };
        case actionTypes.SET_BANKS_COUNT:
            return {
                ...state,
                count: action.count
            };
        case actionTypes.SET_BANK:
            return {
                ...state,
                selectedHotel: action.hotel
            };
        case actionTypes.CLEAR_SELECTED_BANK:
            return {
                ...state,
                selectedHotel: null
            };
        default:
            return state;
    }
};

export default bankReducer;