import { createReducer } from 'redux-immutablejs'
import Immutable from 'immutable';

import { TYPES } from '../actions/page';

const initialState = Immutable.Map()

export default createReducer(initialState, {
    [TYPES.SET_PAGE](page, id){
        return page.merge({
            currentPageID: id
        })
    }
})
