import { takeEvery, all, takeLatest, cancel, take, fork, call, TakeEffect, ForkEffect } from 'redux-saga/effects';

import { autoSignInSaga, checkAuthTimeoutSaga, signInSaga, signOutSaga } from './auth';
//import { fetchCountriesSaga, selectCountrySaga, selectCitySaga } from './location';
import {
    fetchBanksSaga, fetchBankSaga, fetchBanksCountSaga,
    deleteBankSaga, saveBankSaga
} from './bank';
import * as authActionTypes from '../actions/authActionTypes';
//import * as locationActionTypes from '../actions/locationActionTypes';
import * as bankActionTypes from '../actions/bankActionTypes';

export function* watchAuth() {
    yield all([
        takeLatest(authActionTypes.AUTO_SIGN_IN, autoSignInSaga),
        takeLatest(authActionTypes.SIGN_IN_START, signInSaga),
        takeLatest(authActionTypes.SIGN_OUT, signOutSaga),
        //takeLatest(authActionTypes.CHECK_AUTH_TIMEOUT, checkAuthTimeoutSaga);
    ]);

    //while (true) {
    //    const payload = yield take(authActionTypes.CHECK_AUTH_TIMEOUT);
    //    const bgSyncTask = yield fork(checkAuthTimeoutSaga, payload);
    //    yield takeLatest(authActionTypes.STOP_AUTH_TIMER, cancelWorkerSaga, bgSyncTask);
    //}
    // Or
    let payload: TakeEffect;
    while (payload = yield take(authActionTypes.CHECK_AUTH_TIMEOUT)) {
        // starts the task in the background
        const bgSyncTask: ForkEffect = yield fork(checkAuthTimeoutSaga, payload);

        //// wait for the user to sign out
        //yield take(authActionTypes.STOP_AUTH_TIMER);
        //// user signed out. cancel the background task
        //// this will cause the forked bgSync task to jump into its finally block
        //yield cancel(bgSyncTask);
        // Or
        yield takeLatest(authActionTypes.STOP_AUTH_TIMER, cancelWorkerSaga, bgSyncTask);
    }
}

//function* watchCheckAuthTimeout() {
//    yield takeLatest(authActionTypes.CHECK_AUTH_TIMEOUT, checkAuthTimeoutSaga);
//}

//export function* watchLocation() {
//    yield all([
//        takeLatest(locationActionTypes.FETCH_COUNTRIES, fetchCountriesSaga),
//        takeLatest(locationActionTypes.SELECT_COUNTRY, selectCountrySaga),
//        takeLatest(locationActionTypes.SELECT_CITY, selectCitySaga)
//    ]);
//}

export function* watchBank() {
    yield all([
        takeLatest(bankActionTypes.FETCH_BANKS, fetchBanksSaga),
        takeLatest(bankActionTypes.FETCH_BANKS_COUNT, fetchBanksCountSaga),
        takeLatest(bankActionTypes.FETCH_BANK, fetchBankSaga),
        takeLatest(bankActionTypes.SAVE_BANK, saveBankSaga),
        takeLatest(bankActionTypes.DELETE_BANK, deleteBankSaga),
        //takeLatest(bankActionTypes.UPLOAD_BANK_PHOTO, uploadBankPhotoSaga),
        //takeLatest(bankActionTypes.REMOVE_BANK_PHOTO, removeBankPhotoSaga),
        //takeLatest(bankActionTypes.SAVE_BANK_PHOTO, saveBankPhotoSaga),
        //takeLatest(bankActionTypes.DELETE_BANK_PHOTO, deleteBankPhotoSaga),

        //takeEvery(bankActionTypes.UPLOAD_BANK_PHOTO, function* (action) {
        //    const file = action.payload;
        //    yield call(uploadFileSaga, file);
        //})
    ]);
}

function* cancelWorkerSaga(task: any) {
    yield cancel(task);
}