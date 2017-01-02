import fetch from 'isomorphic-fetch';
import { checkHttpStatus, parseJSON } from '../utils';
import { SERVER_URL } from '../config';
import {
    GET_WALL_POSTS,
    CREATED_WALL_POST
} from './constants';

export function getPosts() {
    return (dispatch) => {
        return fetch(`${SERVER_URL}/api/posts/`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then(json => {
            dispatch({
                type: GET_WALL_POSTS,
                payload: json
            });
        });
    }
}

export function createdPost(post) {
    return {
        type: CREATED_WALL_POST,
        payload: post
    }
}

export function createPost(body) {
    return (dispatch) => {
        var token = sessionStorage.getItem('token');
        return fetch(`${SERVER_URL}/api/posts/`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify({
                body: body
            })
        })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then((response) => {
            dispatch(createdPost(response));
        })
        .catch((error) => {
            console.log(error);
        });
    };
}
