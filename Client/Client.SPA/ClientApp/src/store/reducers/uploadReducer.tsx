import * as actionTypes from '../actions/uploadActionTypes';

const initialState = {
    fileUploadPercentage: null
};

const uploadReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.RESET:
            return {
                ...state,
                fileUploadPercentage: null
            };
        case actionTypes.START_UPLOAD:
            return {
                ...state,
                fileUploadPercentage: 0
            };
        case actionTypes.SHOW_PROGRESS:
            return {
                ...state,
                fileUploadPercentage: action.progress
            };
        default:
            return state;
    }
};

export default uploadReducer;