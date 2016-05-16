'use strict';

import { combineReducers } from 'redux-immutablejs';

import page from './page';
import user from './user';

import doorlock from './doorlock';

import initialState from './initialState';

const childReducer = combineReducers({
    page,
    user
});

export default function(state = initialState, action){
    return Immutable.Map().mergeDeep(doorlock(childReducer(state, action), action));
}
