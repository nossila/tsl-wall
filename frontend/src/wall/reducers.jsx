import { createReducer } from '../utils';
import {
    GET_WALL_POSTS,
    CREATED_WALL_POST
} from './constants';


const initialState = {
    posts: []
};

export default createReducer(initialState, {
    [GET_WALL_POSTS]: (state, payload) => {
        return Object.assign({}, state, {
            posts: payload.results
        });
    },
    [CREATED_WALL_POST]: (state, payload) => {
    	var posts = state.posts;
    	posts.unshift(payload);
        return Object.assign({}, state, {
            posts: posts
        });
    }
});
