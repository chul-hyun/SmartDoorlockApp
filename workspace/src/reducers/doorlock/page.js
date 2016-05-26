'use strict';

import { createReducer } from '../../util/extend-redux'
import Immutable from 'immutable';

import TYPES from '../../actions/doorlock/types';

import { pages } from '../../static/app';

const initialState = Immutable.Map()

export default createReducer(initialState, {
    [TYPES.LOGIN]:
        (page, {user, login})=> {
            let currentPageId = pages.initPage.id;
            if(login){
                currentPageId = pages.mainPage.id;
            }

            return page.mergeDeep({
                currentPageId
            });
        },

    [TYPES.SET_PAGE]:
        (page, {currentPageId})=> {
            return page.mergeDeep({
                currentPageId
            });
        },

    [TYPES.REGISTER]:
        (page, action)=> {
            return page.mergeDeep({
                currentPageId: pages.mainPage.id
            });
        },

    [TYPES.UNREGISTER]:
        (page, action)=> {
            return page.mergeDeep({
                currentPageId: pages.initPage.id
            });
        },
})
