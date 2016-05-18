'use strict';

import TYPES from './types';

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
