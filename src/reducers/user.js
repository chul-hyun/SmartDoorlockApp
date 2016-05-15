'use strict';

import { createReducer } from 'redux-immutablejs'
import Immutable from 'immutable';
import TYPES from '../actions/types';

const initialState = Immutable.Map({
    registered: false
});

export default createReducer(initialState, {
    [TYPES.REGISTER]: (user) => user.merge({
        registered: true
    }),

    [TYPES.UNREGISTER]: (user) => user.merge({
        registered: false
    })
});
