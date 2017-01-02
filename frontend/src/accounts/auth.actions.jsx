import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import { SERVER_URL } from '../config';
import { checkHttpStatus, parseJSON } from '../utils';
import {
    AUTH_LOGIN_USER_REQUEST,
    AUTH_LOGIN_USER_FAILURE,
    AUTH_LOGIN_USER_SUCCESS,
    AUTH_LOGOUT_USER,
    AUTH_REGISTER_FORM_INVALID
} from './auth.constants';


export function authLoginUserSuccess(token, user) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    return {
        type: AUTH_LOGIN_USER_SUCCESS,
        payload: {
            token,
            user
        }
    };
}

export function authLoginUserFailure(error, message) {
    sessionStorage.removeItem('token');
    return {
        type: AUTH_LOGIN_USER_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function authLoginUserRequest() {
    return {
        type: AUTH_LOGIN_USER_REQUEST
    };
}

export function authLogout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    return {
        type: AUTH_LOGOUT_USER
    };
}

export function authRegisterUserFormInvalid(errors) {
    return {
        type: AUTH_REGISTER_FORM_INVALID,
        payload: {
            errors: errors
        }
    };
}

export function authLoginUser(email, password, redirect = '/') {
    return (dispatch) => {
        dispatch(authLoginUserRequest());
        const auth = btoa(`${email}:${password}`);
        return fetch(`${SERVER_URL}/api/accounts/login/`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            }
        })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then((response) => {
            dispatch(authLoginUserSuccess(response.token, response.user));
            dispatch(push(redirect));
        })
        .catch((error) => {
            if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                return error.response.json().then((data) => {
                    dispatch(authLoginUserFailure(401, data.detail));
                });
            } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                dispatch(authLoginUserFailure(500, 'A server error occurred while sending your data!'));
            } else {
                dispatch(authLoginUserFailure('Connection Error', 'An error occurred while sending your data!'));
            }
        });
    };
}

export function authRegisterUser(username, email, password, redirect = '/') {
    return (dispatch) => {
        return fetch(`${SERVER_URL}/api/accounts/register/`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then((response) => {
            dispatch(authLoginUser(username, password, redirect));
        })
        .catch((error) => {
            if (error && typeof error.response !== 'undefined' && error.response.status == 400) {
                return error.response.json().then((data) => {
                    dispatch(authRegisterUserFormInvalid(data));
                });
            } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                dispatch(authLoginUserFailure(500, 'A server error occurred while sending your data!'));
            } else {
                dispatch(authLoginUserFailure('Connection Error', 'An error occurred while sending your data!'));
            }

            console.log(error);
        });
    };
}
