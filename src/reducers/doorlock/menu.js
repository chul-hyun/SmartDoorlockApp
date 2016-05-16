'use strict';

import { createReducer } from 'redux-immutablejs'
import Immutable from 'immutable';

import TYPES from '../../actions/types';

const initialState = Immutable.Map()

export default createReducer(initialState, {
    [TYPES.OPEN_MENU]: (menu, action)=> {
        return menu.mergeDeep({
            opened: true
        });
    },

    [TYPES.CLOSE_MENU]: (menu, action)=> {
        return menu.mergeDeep({
            opened: false
        });
    },

    [TYPES.TOGGLE_MENU]: (menu, action)=> {
        return menu.mergeDeep({
            opened: !menu.get('opened', false)
        });
    }
})
