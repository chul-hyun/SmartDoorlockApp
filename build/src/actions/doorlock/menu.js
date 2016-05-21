'use strict';

import TYPES from './types';

export function show(){
    return {
        type : TYPES.SHOW_MENU
    }
}

export function hide(){
    return {
        type : TYPES.HIDE_MENU
    }
}

export function toggle(){
    return {
        type : TYPES.TOGGLE_MENU
    }
}
