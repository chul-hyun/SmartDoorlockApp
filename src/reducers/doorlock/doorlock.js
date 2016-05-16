'use strict';

import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

import TYPES from '../../actions/types';

import { pages } from '../../static';

const initialState = Immutable.Map()

export default createReducer(initialState, {
    [TYPES.SET_PAGE]: (state, action)=> {
        return state.mergeDeep(checkRegistedAndCurrentPageID(state, action));
    },

    [TYPES.REGISTER]: (state, action)=> {
        return state.mergeDeep(checkRegistedAndCurrentPageID(state, action));
    },

    [TYPES.UNREGISTER]: (state, action)=> {
        return state.mergeDeep(checkRegistedAndCurrentPageID(state, action));
    },
});

function checkRegistedAndCurrentPageID(state, action){
    let nextState     = Immutable.Map();
    let registered    = state.getIn(['user', 'registered']);
    let currentPageID = state.getIn(['page', 'currentPageID']);

    if(registered && currentPageID == pages.initPage.id){
        nextState = nextState.setIn(['page', 'currentPageID'], pages.mainPage.id);
    }

    if(!registered && currentPageID == pages.mainPage.id){
        nextState = nextState.setIn(['page', 'currentPageID'], pages.initPage.id);
    }

    return state.mergeDeep(nextState);
}
