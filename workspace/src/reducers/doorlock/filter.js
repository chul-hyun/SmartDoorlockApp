'use strict';

import { pages } from '../../static/app';

export default function(state, action){
    state = setPageFilter(state, action);

    return state;
}

function setPageFilter(state, action){
    let currentPageId     = state.getIn(['page', 'currentPageId']);
    let GCMRegistrationId = state.getIn(['user', 'GCMRegistrationId']);
    let userId            = state.getIn(['user', 'id']);

    let logged               = userId !== null;

    if(logged && onlyAccessOfNonUser(currentPageId)){
        state = state.setIn(['page', 'currentPageId'], pages.mainPage.id);
    }

    if(!logged && onlyAccessOfUser(currentPageId)){
        state = state.setIn(['page', 'currentPageId'], pages.initPage.id);
    }

    return state;
}

function onlyAccessOfNonUser(currentPageId){
    return (
        currentPageId == pages.registPage.id ||
        currentPageId == pages.initPage.id
    );
}

function onlyAccessOfUser(currentPageId){
    return (
        !onlyAccessOfNonUser(currentPageId) &&
        currentPageId != pages.loadingPage.id
    );
}
