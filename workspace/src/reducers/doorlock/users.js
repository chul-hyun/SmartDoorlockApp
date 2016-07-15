'use strict';

import { createReducer } from '../../util/extend-redux'
import Immutable from 'immutable';
import TYPES from '../../actions/doorlock/types';

import initialState from './initialState';

export default createReducer(Immutable.Map(), {
    [TYPES.USERS]:
        (_users, { users }) => Immutable.fromJS(users)
});
