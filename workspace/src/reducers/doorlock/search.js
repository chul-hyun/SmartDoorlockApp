'use strict';

import { createReducer } from '../../util/extend-redux'
import Immutable from 'immutable';
import TYPES from '../../actions/doorlock/types';

export default createReducer(Immutable.Map(), {
    [TYPES.SEARCH]:
        (_search, { history, filter }) => Immutable.fromJS({ history, filter })
});
