'use strict';

import TYPES from './types';

export function setMenu(id){
    return {
        type : TYPES.SET_MENU,
        id
    }
}

export function open(){
    return {
        type : TYPES.OPEN_MENU
    }
}

export function close(){
    return {
        type : TYPES.CLOSE_MENU
    }
}

export function toggle(){
    return {
        type : TYPES.TOGGLE_MENU
    }
}
