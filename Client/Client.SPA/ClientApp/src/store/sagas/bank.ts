import { put } from 'redux-saga/effects';

import axiosInstance from '../../shared/crud-axios-instance';
import { SuccessfulOperationEnum, FailedOperationEnum } from '../../shared/enums';
import * as actions from '../actions/bankActions';
import * as commonActions from '../actions/commonActions';
import * as uploadActions from '../actions/uploadActions';
//import uploadFileChannel from './uploadFileChannel';
import { ResponseGenerator } from '../../models/ResponseGenerator.model';

export function* fetchBanksSaga(action: any) {
    yield put(commonActions.showLoader());
    const headers = {
        'Content-Type': 'application/json; charset=utf-8'
    };
    try {
        const filters = [];
        if (action.cityId) {
            yield filters.push(`cityId=${action.cityId}`);
        }
        if (action.countryId) {
            yield filters.push(`countryId=${action.countryId}`);
        }
        if (action.pageNo) {
            yield filters.push(`pageNo=${action.pageNo}`);
        }
        if (action.pageCount) {
            yield filters.push(`pageCount=${action.pageCount}`);
        }
        const queryString: string = yield (filters.length > 0 ? '?' + filters.join('&') : '');
        const response: ResponseGenerator = yield axiosInstance.get('/banks' + queryString, { headers: headers });
        if (response?.status === 200) {
            yield put(actions.setBanks(response.data));
        }
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}

export function* fetchBanksCountSaga(action: any) {
    yield put(commonActions.showLoader());
    const headers = {
        'Content-Type': 'application/json; charset=utf-8'
    };
    try {
        const filters = [];
        if (action.cityId) {
            yield filters.push(`cityId=${action.cityId}`);
        }
        if (action.countryId) {
            yield filters.push(`countryId=${action.countryId}`);
        }
        const queryString: string = yield (filters.length > 0 ? '?' + filters.join('&') : '');
        const response: ResponseGenerator = yield axiosInstance.get('/bank/count' + queryString, { headers: headers });
        if (response?.status === 200) {
            yield put(actions.setBanksCount(response.data));
        }
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}

export function* fetchBankSaga(action: any) {
    yield put(commonActions.showLoader());
    const headers = {
        'Content-Type': 'application/json; charset=utf-8'
    };
    try {
        const response: ResponseGenerator = yield axiosInstance.get('/bank/' + action.id, { headers: headers });
        if (response?.status === 200) {
            yield put(actions.setBank(response.data));
        }
        else {
            yield put(commonActions.operationFailed(FailedOperationEnum.FetchBank));
        }
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}

//export function* fetchBankPhotosSaga(action: any) {
//    yield put(commonActions.showLoader());
//    const headers = {
//        'Content-Type': 'application/json; charset=utf-8'
//    };
//    try {
//        const response: ResponseGenerator  = yield axiosInstance.get('/Bank/GetPhotos/' + action.BankId, { headers: headers });
//        if (response?.status === 200) {
//            yield put(actions.setBankPhotos(response.data));
//        }
//        yield put(commonActions.hideLoader());
//    } catch (error) {
//        yield put(commonActions.raiseError(error));
//    }
//}

export function* saveBankSaga(action: any) {
    yield put(commonActions.showLoader());
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${action.token}`
    };
    try {
        let response: ResponseGenerator;
        let operation;
        if (!action.Bank.id) {
            response = yield axiosInstance.post('/bank', action.Bank, { headers: headers });
            operation = SuccessfulOperationEnum.Insert;
        }
        else {
            response = yield axiosInstance.put('/bank' + action.Bank.id, action.Bank, { headers: headers });
            operation = SuccessfulOperationEnum.Update;
        }
        if (response?.status === 200) {
            yield put(commonActions.operationSucceeded(operation));
        }
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}

export function* deleteBankSaga(action: any) {
    yield put(commonActions.showLoader());
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${action.token}`
    };
    try {
        const response: ResponseGenerator = yield axiosInstance.delete('/bank' + action.id, { headers: headers });
        if (response?.status === 200) {
            yield put(commonActions.operationSucceeded(SuccessfulOperationEnum.Delete));
        }
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}