'use strict';

import { createReducer } from '../../util/extend-redux';
import Immutable from 'immutable';

import TYPES from '../../actions/doorlock/types';

import { pages } from '../../static/app';

const initialState = Immutable.Map()

export default createReducer(initialState, {
    [TYPES.SET_PAGE]:
        (state, action)=> {
            return checkRegisted(state, action);
        }
});

function checkRegisted(state, action){
    let registered        = state.getIn(['user', 'id']) !== null;
    let GCMRegistrationId = state.getIn(['user', 'GCMRegistrationId']);
    let currentPageId     = state.getIn(['page', 'currentPageId']);

    if(registered && currentPageId == pages.initPage.id){
        state = state.setIn(['page', 'currentPageId'], pages.mainPage.id);
    }

    if(!registered && (currentPageId != pages.initPage.id && currentPageId != pages.registPage.id)){
        state = state.setIn(['page', 'currentPageId'], pages.initPage.id);
    }

    if(GCMRegistrationId == null){
        state = state.setIn(['page', 'currentPageId'], pages.loadingPage.id);
    }

    return state;
}
