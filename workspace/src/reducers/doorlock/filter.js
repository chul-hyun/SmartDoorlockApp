'use strict';

import { createReducer } from '../../util/extend-redux';
import Immutable from 'immutable';

import TYPES from '../../actions/doorlock/types';

import { pages } from '../../static/app';

const initialState = Immutable.Map()

export default createReducer(initialState, {
    [TYPES.APP_INIT]: (state, {doorlockID}) => {
        console.log(`doorlockID: ${doorlockID}`);
        return state.set('id', doorlockID);
    },

    [TYPES.REGISTER]: (state, {doorlockID}) => {
        console.log(`doorlockID: ${doorlockID}`);
        return state.set('id', doorlockID);
    },

    [TYPES.SET_PAGE]: (state, action)=> {
        return checkRegisted(state, action);
    }
});

function checkRegisted(state, action){
    let registered    = state.getIn(['user', 'registered']);
    let currentPageID = state.getIn(['page', 'currentPageID']);

    if(registered && currentPageID == pages.initPage.id){
        state = state.setIn(['page', 'currentPageID'], pages.mainPage.id);
    }

    console.log(registered);
    console.log(currentPageID);
    console.log(pages);
    if(!registered && (currentPageID != pages.initPage.id && currentPageID != pages.registPage.id)){
        state = state.setIn(['page', 'currentPageID'], pages.initPage.id);
    }

    console.log(state.toJS())

    return state;
}
