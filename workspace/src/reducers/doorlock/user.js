'use strict';

import { createReducer } from '../../util/extend-redux'
import Immutable from 'immutable';
import TYPES from '../../actions/doorlock/types';

import initialState from './initialState';

export default createReducer(Immutable.Map(), {
    [TYPES.LOGIN]:
        (_user, { user }) => _user.mergeDeep(user),

    [TYPES.LOGOUT]:
        (_user) => initialState.get('user'),

    [TYPES.SET_GCM_REGISTRATION_ID]:
        (_user, {GCMRegistrationId}) => _user.mergeDeep({
            GCMRegistrationId
        })
});
