import * as actionTypes from '../actions/commonActionTypes';

export interface State {
    isLoading: boolean,
    error: string | null,
    successfulOperation: string | null,
    failedOperation: string | null,
}

const initialState: State = {
    isLoading: false,
    error: null,
    successfulOperation: null,
    failedOperation: null
};

const commonReducer = (state: State = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.SHOW_LOADER:
            return {
                ...state,
                isLoading: true,
                error: null,
                successfulOperation: null,
                failedOperation: null
            };
        case actionTypes.HIDE_LOADER:
            return {
                ...state,
                isLoading: false
            };
        case actionTypes.RAISE_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        case actionTypes.CLEAR_ERROR:
            return {
                ...state,
                isLoading: false,
                error: null,
                successfulOperation: null,
                failedOperation: null
            };
        case actionTypes.OPERATION_SUCCEEDED:
            return {
                ...state,
                successfulOperation: action.successfulOperation,
                failedOperation: null
            };
        case actionTypes.OPERATION_FAILED:
            return {
                ...state,
                successfulOperation: null,
                failedOperation: action.failedOperation
            };
        default:
            return state;
    }
};

 export default commonReducer;