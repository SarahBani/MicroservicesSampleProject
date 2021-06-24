import * as actionTypes from '../actions/authActionTypes';

const initialState = {
    loggedIn: false,
    token: null,
    authRedirectPath: '/',
    user: null
};

const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.SIGN_IN_SUCCEEDED:
            return {
                ...state,
                loggedIn: true,
                token: action.token,
                user: action.user
            };
        case actionTypes.SIGN_OUT:
            return {
                ...state,
                loggedIn: false,
                token: null,
                user: null,
                authRedirectPath: '/'
            };
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return {
                ...state,
                authRedirectPath: action.url
            }
        default:
            return state;
    }
};

export default authReducer;