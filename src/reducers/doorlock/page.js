'use strict';

import { createReducer } from 'redux-immutablejs'
import Immutable from 'immutable';

import TYPES from '../../actions/types';

import { pages } from '../../static/app';

const initialState = Immutable.Map()

export default createReducer(initialState, {
    [TYPES.INIT]: (page, action)=> {
        let currentPageID = pages.initPage.id;
        if(user.registered){
            currentPageID = pages.mainPage.id;
        }

        return page.mergeDeep({
            currentPageID
        });
    },

    [TYPES.SET_PAGE]: (page, {currentPageID})=> {
        return page.mergeDeep({
            currentPageID
        });
    },

    [TYPES.REGISTER]: (page, action)=> {
        return page.mergeDeep({
            currentPageID: pages.mainPage.id
        });
    },

    [TYPES.UNREGISTER]: (page, action)=> {
        return page.mergeDeep({
            currentPageID: pages.initPage.id
        });
    },
})
