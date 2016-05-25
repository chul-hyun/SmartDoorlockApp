'use strict';

import { createReducer } from '../../util/extend-redux'
import Immutable from 'immutable';
import TYPES from '../../actions/doorlock/types';

const initialState = Immutable.Map({
    registered: false
});

export default createReducer(initialState, {
    [TYPES.REGISTER]: (user, {userInfo}) => {
        console.log(userInfo);
        return user.mergeDeep({
            registered: true,
            info: userInfo
        }).mergeDeep({
            info: {
                latestAuthDate: userInfo.registDate
            }
        });
    },

    [TYPES.UNREGISTER]: (user) => user.mergeDeep({
        registered: false
    }),

    [TYPES.APP_INIT]: (user, {userInfo}) => {
        if(userInfo == null){
            return user
        }
        return user.mergeDeep({
            info: userInfo,
            registered: true
        })
    }
});
