'use strict';

import TYPES from './types';

const userSample = {
    info: {
        registDate : new Date(1463310111059),
        latestAuthDate : new Date(1463407268450),
        name : "vomvoru",
        key : 1
    },
    registered: true
}

export function init(){
    return (dispatch, getState) =>{
        setTimeout(()=>{
            dispatch({
                type : TYPES.INIT,
                user : userSample
            })
        }, 2000);
    }
}
