import { User } from '../../models/User.model';
import * as actionTypes from './authActionTypes';

export const signIn = (email: string, password: string) => {
    return {
        type: actionTypes.SIGN_IN_START,
        email: email,
        password: password
    };
};

export const signInSucceeded = (token: string, user: User) => {
    return {
        type: actionTypes.SIGN_IN_SUCCEEDED,
        token: token,
        user: user
    };
};

export const signOut = () => {
    return {
        type: actionTypes.SIGN_OUT
    };
};

export const checkAuthTimeout = (tokenExpiration: any) => {
    return {
        type: actionTypes.CHECK_AUTH_TIMEOUT,
        tokenExpiration: tokenExpiration
    };
};

export const stopAuthTimer = () => {
    return {
        type: actionTypes.STOP_AUTH_TIMER
    };
};

export const autoSignIn = () => {
    return {
        type: actionTypes.AUTO_SIGN_IN
    };
};

export const setAuthRedirectPath = (url: string) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        url: url
    };
};