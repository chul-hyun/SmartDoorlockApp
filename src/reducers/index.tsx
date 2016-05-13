/// <reference path="../../main.d.ts"/>

import { combineReducers } from 'redux';

import currentPageID from './currentPageID';

const rootReducer = combineReducers({
    currentPageID
});

export default rootReducer;
