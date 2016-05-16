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

const doorlockKeySample = '4290v34x2';

export function register(doorlockKey){
    return (dispatch, getState)=>{
        _register().
            then((userInfo)=>{
                dispatch({
                    type : TYPES.REGISTER,
                    userInfo
                })
            }, (message)=>{
                dispatch({
                    type : TYPES.ALERT,
                    message
                })
            });
    }
}

export function unregister(){
    return (dispatch, getState) =>{
        _unregister().
            then(()=>{
                dispatch({
                    type : TYPES.UNREGISTER
                })
            }, (message)=>{
                dispatch({
                    type : TYPES.ALERT,
                    message
                })
            });
    }
}
