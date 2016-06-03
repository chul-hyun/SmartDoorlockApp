'use strict';

import { createReducer } from '../../util/extend-redux'
import Immutable from 'immutable';

import TYPES from '../../actions/doorlock/types';

const initialState = Immutable.Map()

let reducer = createReducer(initialState, {
    [TYPES.SHOW_MENU]:
        (_menu, action)=> {
            return _menu.mergeDeep({
                show: true
            });
        },

    [TYPES.HIDE_MENU]:
        (_menu, action)=> {
            return _menu.mergeDeep({
                show: false
            });
        },

    [TYPES.TOGGLE_MENU]:
        (_menu, action)=> {
            return _menu.mergeDeep({
                show: !_menu.get('show', false)
            });
        }
})

export default function(_menu, action){
    return autoCloseMenu(reducer(_menu, action), action);
}


function autoCloseMenu(_menu, action){
    if(!action){
        return _menu;
    }

    switch(action.type){
        case TYPES.SHOW_MENU :
        case TYPES.HIDE_MENU :
        case TYPES.TOGGLE_MENU :
            return _menu;
    }

    return _menu.mergeDeep({
        show: false
    })
}
