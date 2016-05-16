'use strict';

import TYPES from './types';

export function register(){
    return (dispatch, getState) =>{
        dispatch({
            type : TYPES.REGISTER
        })
    }
}

export function unregister(){
    return (dispatch, getState) =>{
        dispatch({
            type : TYPES.UNREGISTER
        })
    }
}
