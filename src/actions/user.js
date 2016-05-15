'use strict';

import TYPES from './types';

export function register(){
    return {
        type : TYPES.REGISTER
    };
}

export function unregister(){
    return {
        type : TYPES.UNREGISTER
    };
}
