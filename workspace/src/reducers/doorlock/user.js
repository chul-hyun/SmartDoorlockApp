'use strict';

import { createReducer } from '../../util/extend-redux'
import Immutable from 'immutable';
import TYPES from '../../actions/doorlock/types';

const initialState = Immutable.Map({
    registered: false
});

export default createReducer(initialState, {
    [TYPES.REGISTER]: (user, {info}) => {
        console.log(info);
        return user.mergeDeep({
            registered: true,
            info
        })
    },

    [TYPES.UNREGISTER]: (user) => user.mergeDeep({
        registered: false
    }),

    [TYPES.APP_INIT]: (user, action) => user.mergeDeep(action.user)
});
