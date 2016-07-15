'use strict';

import { createReducer } from '../../util/extend-redux'
import Immutable from 'immutable';
import TYPES from '../../actions/doorlock/types';

import initialState from './initialState';

export default createReducer(Immutable.Map(), {
    [TYPES.LOGIN]:
        (_user, { user }) => _user.mergeDeep(user),

    [TYPES.LOGGED]:
        (_user, { user }) => _user.mergeDeep(user),

    [TYPES.LOGOUT]:
        (_user) => _user.mergeDeep({
            name              : null,
            id                : null,
            password          : null,
            registDate        : 0,
            latestAuthDate    : 0,
            doorlockId        : null
        }),

    [TYPES.UNLOCK]:
        (_user, { authtime }) => _user.mergeDeep({latestAuthDate : authtime}),

    [TYPES.SET_GCM_REGISTRATION_ID]:
        (_user, {GCMRegistrationId}) => _user.mergeDeep({
            GCMRegistrationId
        }),

    [TYPES.CHANGE_NAME]:
        (_user, {name}) => _user.mergeDeep({
            name
        })
});
