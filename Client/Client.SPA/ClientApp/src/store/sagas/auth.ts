import { put, call, all } from 'redux-saga/effects';

import axiosInstance from '../../shared/axios-instance';
import * as actions from '../actions/authActions';
import * as commonActions from '../actions/commonActions';
import { ResponseGenerator } from '../../models/ResponseGenerator.model';
import { User } from '../../models/User.model';
import { AuthResponse } from '../../models/AuthResponse';
import * as Constants from "../../shared/constants";

const authStorageKeyName: string = 'auth_token';

export const delay = (ms: number): Promise<NodeJS.Timeout> =>
    new Promise(res => setTimeout(res, ms));

export function* signInSaga(action: any) {
    yield put(commonActions.showLoader());
    const data = {
        email: action.email,
        password: action.password
    };
    try {
        const response: ResponseGenerator = yield axiosInstance.post('/login', data);
        if (response?.status === 200) {
            yield localStorage.setItem(authStorageKeyName, JSON.stringify(response.data));
            const authResponse: AuthResponse = response.data;
            const user: User = {
                email: authResponse.email
            };
            yield call([localStorage, 'setItem'], authStorageKeyName, JSON.stringify(authResponse));
            yield put(actions.signInSucceeded(authResponse.token, user));
            yield put(actions.checkAuthTimeout(authResponse.tokenExpiration));
        }
        else {
            yield put(commonActions.raiseError({
                message: response?.data ?? Constants.ERROR_UNKNOWN
            }));
        }
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}

export function* signOutSaga() {
    yield all([
        //localStorage.removeItem(authStorageKeyName),
        call([localStorage, 'removeItem'], authStorageKeyName),
        put(actions.stopAuthTimer()),
    ]);
}

export function* checkAuthTimeoutSaga(action: any) {
    const duration: number = yield (new Date(action.tokenExpiration).getTime() - new Date().getTime());
    //delay(duration);
    yield call(delay, duration);
    yield put(actions.signOut());
}

export function* autoSignInSaga() {
    //const authResponse = yield JSON.parse(localStorage.getItem(authStorageKeyName));
    const authResponse: AuthResponse = JSON.parse(yield call([localStorage, 'getItem'], authStorageKeyName));
    if (authResponse) {
        const expirationDateTime = new Date(authResponse.tokenExpiration);
        if (expirationDateTime > new Date()) {
            const user: User = {
                email: authResponse.email
            };
            yield put(actions.signInSucceeded(authResponse.token, user));
            yield put(actions.checkAuthTimeout(authResponse.tokenExpiration));
        }
        else {
            yield put(actions.signOut());
        }
    }
}