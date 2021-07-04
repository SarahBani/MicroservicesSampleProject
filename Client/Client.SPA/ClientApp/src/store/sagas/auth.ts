import { put, call, all } from 'redux-saga/effects';

import axiosInstance from '../../shared/identity-axios-instance';
import * as actions from '../actions/authActions';
import * as commonActions from '../actions/commonActions';
import { AuthToken } from '../../models/AuthToken';
import { ResponseGenerator } from '../../models/ResponseGenerator.model';
import { User } from '../../models/User.model';

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
            if (response.data.isSuccessful) {
                //yield localStorage.setItem(authStorageKeyName, JSON.stringify(response.data));
                const authResponse = response.data.content;
                const user: User = {
                    email: authResponse.email
                };
                yield call([localStorage, 'setItem'], authStorageKeyName, JSON.stringify(authResponse));
                yield put(actions.signInSucceeded(authResponse.token, user));
                yield put(actions.checkAuthTimeout(authResponse.tokenExpiration));
            }
            else {
                yield put(commonActions.raiseError({
                    message: response.data.customExceptionMessage
                }));
                return;
            }
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
    //const authToken = yield JSON.parse(localStorage.getItem(authStorageKeyName));
    const authToken: AuthToken = JSON.parse(yield call([localStorage, 'getItem'], authStorageKeyName));
    if (authToken) {
        const expirationDateTime = new Date(authToken.tokenExpiration);
        if (expirationDateTime > new Date()) {
            const user: User = {
                email: authToken.email
            };
            yield put(actions.signInSucceeded(authToken.token, user));
            yield put(actions.checkAuthTimeout(authToken.tokenExpiration));
        }
        else {
            yield put(actions.signOut());
        }
    }
}