'use strict';

import { createReducer } from '../../util/extend-redux'
import Immutable from 'immutable';

import TYPES from '../../actions/doorlock/types';

const initialState = Immutable.Map()

export default createReducer(initialState, {
    [TYPES.SHOW_MENU]: (menu, action)=> {
        return menu.mergeDeep({
            show: true
        });
    },

    [TYPES.HIDE_MENU]: (menu, action)=> {
        return menu.mergeDeep({
            show: false
        });
    },

    [TYPES.TOGGLE_MENU]: (menu, action)=> {
        return menu.mergeDeep({
            show: !menu.get('show', false)
        });
    }
})

function autoCloseMenu(menu, action){
    switch(action.type){
        case TYPES.SHOW_MENU :
        case TYPES.HIDE_MENU :
        case TYPES.TOGGLE_MENU :
            return menu;
    }

    return menu.mergeDeep({
        show: false
    })
}
