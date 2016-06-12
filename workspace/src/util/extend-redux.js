/*
redux 대체모듈
redux + react + immutablejs
*/

'use strict';

export {
    createStore,
    bindActionCreators,
    applyMiddleware,
    compose
} from 'redux';

export {
    createReducer,
    combineReducers
} from 'redux-immutablejs';

export {
    Provider,
    connect
} from 'react-redux';


import Immutable from 'immutable';
import { createReducer } from 'redux-immutablejs';

export function createMapReducer(handlers){
    return createReducer(Immutable.Map(), handlers);
}
