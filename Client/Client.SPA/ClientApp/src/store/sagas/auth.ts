import { AxiosResponse } from 'axios';
import { put } from 'redux-saga/effects';

import axiosInstance from '../../shared/axios-instance';
import * as commonActions from '../actions/commonActions';

export function* fetchBanksSaga(action: any) {
    yield put(commonActions.showLoader());
    const headers = {
        'Content-Type': 'application/json; charset=utf-8'
    };
    try {
       
    } catch (error) {
    }
}