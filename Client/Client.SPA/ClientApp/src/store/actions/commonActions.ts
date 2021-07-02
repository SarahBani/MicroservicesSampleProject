import * as actionTypes from './commonActionTypes';
import { UNKNOWN_ERROR_MESSAGE } from '../../shared/constant';
import { FailedOperation, SuccessfulOperation } from '../../shared/enums';

const unknownError = {
    message: UNKNOWN_ERROR_MESSAGE
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

export const operationSucceeded = (operation: SuccessfulOperation) => {
    return {
        type: actionTypes.OPERATION_SUCCEEDED,
        successfulOperation: operation
    };
};

export const operationFailed = (operation: FailedOperation) => {
    return {
        type: actionTypes.OPERATION_FAILED,
        failedOperation: operation
    };
};