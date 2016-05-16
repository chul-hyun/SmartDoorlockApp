'use strict';

import { createReducer } from 'redux-immutablejs'
import Immutable from 'immutable';

import TYPES from '../../actions/types';

const initialState = Immutable.Map()

export default createReducer(initialState, {
    [TYPES.INIT]: (page, action)=> {
        return page.mergeDeep({
            currentPageID: action.
        });
    }

    [TYPES.SET_PAGE]: (page, action)=> {
        return page.mergeDeep({
            currentPageID: action.id
        });
    }
})
