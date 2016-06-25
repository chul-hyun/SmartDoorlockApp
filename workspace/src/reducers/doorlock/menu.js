'use strict';

import { createMapReducer } from '../../util/extend-redux'

import TYPES from '../../actions/doorlock/types';

let reducer = createMapReducer({
    [TYPES.SHOW_MENU]:
        (_menu, action)=> _menu.mergeDeep({
            show: true
        }),

    [TYPES.HIDE_MENU]:
        (_menu, action)=> _menu.mergeDeep({
            show: false
        }),

    [TYPES.TOGGLE_MENU]:
        (_menu, action)=> _menu.mergeDeep({
            show: !_menu.get('show', false)
        })
})

// 메뉴 클릭 및 다른 행동시 메뉴가 hide되게 함.
function autoHideMenu(_menu, action){
    if(!action){
        return _menu;
    }

    switch(action.type){
        case TYPES.SHOW_MENU :
        case TYPES.HIDE_MENU :
        case TYPES.TOGGLE_MENU :
        case TYPES.LOGIN :
            return _menu;
    }

    return _menu.mergeDeep({
        show: false
    })
}

export default function(_menu, action){
    return autoHideMenu(reducer(_menu, action), action);
}
