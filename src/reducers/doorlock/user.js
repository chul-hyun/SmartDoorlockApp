'use strict';

import { createReducer } from 'redux-immutablejs'
import Immutable from 'immutable';
import TYPES from '../../actions/types';

const initialState = Immutable.Map({
    registered: false
});

export default createReducer(initialState, {
    [TYPES.REGISTER]: (user, {userInfo}) => user.mergeDeep({
        registered: true,
        user:{
            info: userInfo
        }
    }),

    [TYPES.UNREGISTER]: (user) => user.mergeDeep({
        registered: false
    }),

    [TYPES.INIT]: (user, action) => user.mergeDeep(action.user)
});
