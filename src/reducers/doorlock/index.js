
'use strict';

import { combineReducers } from 'redux-immutablejs';

import doorlock from './doorlock';

import initialState from './initialState';

import menu from './menu'
import page from './page'
import user from './user'


const childReducer = combineReducers({
    menu,page,user
});

export default function(state = initialState, action){
    return Immutable.Map().mergeDeep(doorlock(childReducer(state, action), action));
}