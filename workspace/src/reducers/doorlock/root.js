'use strict';

import { createMapReducer } from '../../util/extend-redux';

import TYPES from '../../actions/doorlock/types';

import { pages } from '../../static/app';

export default createMapReducer({
    [TYPES.SET_GCM_REGISTRATION_ID]:
        (state, action) => setGcm(state, action)
});

function setGcm(state, action){
    let currentPageId     = state.getIn(['page', 'currentPageId']);
    let userId            = state.getIn(['user', 'id']);

    let logged               = userId !== null;

    if(currentPageId === pages.loadingPage.id){
        if(logged){
            state = state.setIn(['page', 'currentPageId'], pages.mainPage.id);
        }else{
            state = state.setIn(['page', 'currentPageId'], pages.initPage.id);
        }
    }

    return state;
}
