import * as actionTypes from './commonActionTypes';
import * as Constants from '../../shared/constants';
import { FailedOperationEnum, SuccessfulOperationEnum } from '../../shared/enums';

const unknownError = {
    message: Constants.ERROR_UNKNOWN
};

export const showLoader = () => {
    return {
        type: actionTypes.SHOW_LOADER
    };
};

export const hideLoader = () => {
    return {
        type: actionTypes.HIDE_LOADER
    };
};

export const raiseError = (error = unknownError) => {
    return {
        type: actionTypes.RAISE_ERROR,
        error: error
    };
};

export const clearError = () => {
    return {
        type: actionTypes.CLEAR_ERROR
    };
};

export const operationSucceeded = (operation: SuccessfulOperationEnum) => {
    return {
        type: actionTypes.OPERATION_SUCCEEDED,
        successfulOperation: operation
    };
};

export const operationFailed = (operation: FailedOperationEnum) => {
    return {
        type: actionTypes.OPERATION_FAILED,
        failedOperation: operation
    };
};