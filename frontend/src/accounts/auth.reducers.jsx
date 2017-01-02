import { createReducer } from '../utils';
import {
    AUTH_LOGIN_USER_REQUEST,
    AUTH_LOGIN_USER_SUCCESS,
    AUTH_LOGIN_USER_FAILURE,
    AUTH_LOGOUT_USER,
    AUTH_REGISTER_FORM_INVALID
} from './auth.constants';


const initialState = {
    token: null,
    userName: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null,
    registerFormErrors: null
};

export default createReducer(initialState, {
    [AUTH_LOGIN_USER_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isAuthenticating: true,
            statusText: null
        });
    },
    [AUTH_LOGIN_USER_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            isAuthenticating: false,
            isAuthenticated: true,
            token: payload.token,
            userName: payload.user.username,
            statusText: 'You have been successfully logged in.'
        });
    },
    [AUTH_LOGIN_USER_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            isAuthenticating: false,
            isAuthenticated: false,
            token: null,
            userName: null,
            statusText: `Authentication Error: ${payload.status} - ${payload.statusText}`
        });
    },
    [AUTH_LOGOUT_USER]: (state, payload) => {
        return Object.assign({}, state, {
            isAuthenticated: false,
            token: null,
            userName: null,
            statusText: 'You have been successfully logged out.'
        });
    },
    [AUTH_REGISTER_FORM_INVALID]: (state, payload) => {
        return Object.assign({}, state, {
            registerFormErrors: payload.errors
        });
    }
});
