import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './accounts/auth.reducers';
import dataReducer from './accounts/data.reducers';
import wallReducer from './wall/reducers';

export default combineReducers({
    auth: authReducer,
    data: dataReducer,
    wall: wallReducer,
    routing: routerReducer
});
