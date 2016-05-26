'use strict';

import { createReducer } from '../../util/extend-redux'
import Immutable from 'immutable';
import TYPES from '../../actions/doorlock/types';

import initialState from './initialState';

export default createReducer(Immutable.Map(), {
    [TYPES.REGISTER]:
        (user, {user}) => user.mergeDeep(user),

    [TYPES.UNREGISTER]:
        (user) => initialState.get('user'),

    [TYPES.LOGIN]:
        (user, {user, login}) => (login) ? user.mergeDeep(user) : user
});
