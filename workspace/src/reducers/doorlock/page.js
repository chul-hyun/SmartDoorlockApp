'use strict';

import { createReducer } from '../../util/extend-redux'
import Immutable from 'immutable';

import TYPES from '../../actions/doorlock/types';

import { pages } from '../../static/app';

const initialState = Immutable.Map()

export default createReducer(initialState, {
    [TYPES.APP_INIT]: (page, {user})=> {
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
