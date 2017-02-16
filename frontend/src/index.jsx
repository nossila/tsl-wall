import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/wall.css";

import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Root from './Root/Root';
import configureStore from './store/configureStore';
import { authLoginUserSuccess } from './accounts/auth.actions';

const store = configureStore(window.INITIAL_STATE, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

const token = sessionStorage.getItem('token');
let user = {};
try {
    user = JSON.parse(sessionStorage.getItem('user'));
} catch (e) {
    // Failed to parse
}

if (token !== null) {
    store.dispatch(authLoginUserSuccess(token, user));
}

const node = (
    <Root store={store} history={history} />
);
const target = document.getElementById('root');

ReactDOM.render(node, target);
