'use strict';

import TYPES from './types';

export function init(){
    return (dispatch, getState) =>{
        dispatch({
            type : TYPES.INIT
        })
    }
}
