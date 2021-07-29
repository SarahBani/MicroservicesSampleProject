import * as actionTypes from '../actions/uploadActionTypes';

const initialState = {
    fileUploadPercentage: null,
    filePath: null
};

const uploadReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.RESET:
            return {
                ...state,
                fileUploadPercentage: null,
                filePath: null
            };
        case actionTypes.START_UPLOAD:
            return {
                ...state,
                fileUploadPercentage: 0,
                filePath: null
            };
        case actionTypes.SHOW_PROGRESS:
            return {
                ...state,
                fileUploadPercentage: action.progress
            };
        case actionTypes.UPLOAD_SUCCEEDED:
            return {
                ...state,
                filePath: action.filePath
            };
        default:
            return state;
    }
};

export default uploadReducer;