import { put, take, call } from 'redux-saga/effects';

import axiosInstance from '../../axios-instance';
import { SuccessfulOperationsEnum, FailedOperationsEnum } from '../../shared/constant';
import * as actions from '../actions/BankActions';
import * as commonActions from '../actions/commonActions';
import * as uploadActions from '../actions/uploadActions';
import uploadFileChannel from './uploadFileChannel';

export function* fetchBanksSaga(action) {
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
        const queryString = yield (filters.length > 0 ? '?' + filters.join('&') : '');
        const response = yield axiosInstance.get('/Bank/GetList' + queryString, { headers: headers });
        if (response?.status === 200) {
            yield put(actions.setBanks(response.data));
        }
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}

export function* fetchBanksCountSaga(action) {
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
        const queryString = yield (filters.length > 0 ? '?' + filters.join('&') : '');
        const response = yield axiosInstance.get('/Bank/GetCount' + queryString, { headers: headers });
        if (response?.status === 200) {
            yield put(actions.setBanksCount(response.data));
        }
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}

export function* fetchBankSaga(action) {
    yield put(commonActions.showLoader());
    const headers = {
        'Content-Type': 'application/json; charset=utf-8'
    };
    try {
        const response = yield axiosInstance.get('/Bank/GetById/' + action.id, { headers: headers });
        if (response?.status === 200) {
            yield put(actions.setBank(response.data));
        }
        else {
            yield put(commonActions.operationFailed(FailedOperationsEnum.FetchBank));
        }
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}

export function* fetchBankPhotosSaga(action) {
    yield put(commonActions.showLoader());
    const headers = {
        'Content-Type': 'application/json; charset=utf-8'
    };
    try {
        const response = yield axiosInstance.get('/Bank/GetPhotos/' + action.BankId, { headers: headers });
        if (response?.status === 200) {
            yield put(actions.setBankPhotos(response.data));
        }
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}

export function* saveBankSaga(action) {
    yield put(commonActions.showLoader());
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${action.token}`
    };
    try {
        let response;
        let operation;
        if (!action.Bank.id) {
            response = yield axiosInstance.post('/Bank/Insert', action.Bank, { headers: headers });
            operation = SuccessfulOperationsEnum.Insert;
        }
        else {
            response = yield axiosInstance.put('/Bank/Update/' + action.Bank.id, action.Bank, { headers: headers });
            operation = SuccessfulOperationsEnum.Update;
        }
        if (response?.status === 200) {
            yield put(commonActions.operationSucceeded(operation));
        }
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}

export function* deleteBankSaga(action) {
    yield put(commonActions.showLoader());
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${action.token}`
    };
    try {
        const response = yield axiosInstance.delete('/Bank/Delete/' + action.id, { headers: headers });
        if (response?.status === 200) {
            yield put(commonActions.operationSucceeded(SuccessfulOperationsEnum.Delete));
        }
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}