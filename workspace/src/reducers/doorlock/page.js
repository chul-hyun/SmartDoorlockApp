'use strict';

import { createReducer } from '../../util/extend-redux'
import Immutable from 'immutable';

import TYPES from '../../actions/doorlock/types';

import { pages } from '../../static/app';

const initialState = Immutable.Map()

export default createReducer(initialState, {
    [TYPES.LOGGED]:
        (_page) => _page.mergeDeep({
            currentPageId : pages.mainPage.id
        }),

    [TYPES.NON_LOGGED]:
        (_page) => _page.mergeDeep({
            currentPageId: pages.initPage.id
        }),

    [TYPES.LOGOUT]:
        (_page) => _page.mergeDeep({
            currentPageId: pages.initPage.id
        }),

    [TYPES.SET_PAGE]:
        (_page, {currentPageId}) => _page.mergeDeep({
            currentPageId
        })
})
