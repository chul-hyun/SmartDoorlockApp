'use strict';

import TYPES from './types';

const userSample = {
    info: {
        registDate     : new Date(1463310111059),
        latestAuthDate : new Date(1463407268450),
        name           : "vomvoru",
        key            : 1
    },
    registered: true
}

const doorlockKeySample = '123abc';

export function init(){
    return (dispatch) =>{
        _init().
            then((user)=>{
                dispatch({
                    type : TYPES.INIT,
                    user
                })
            }, (message)=>{
                dispatch({
                    type : TYPES.ALERT,
                    message
                })
            });
    }
}

export function register(doorlockKey){
    return (dispatch)=>{
        _register(doorlockKey).
            then((user)=>{
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
    return (dispatch) =>{
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

function _init(){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(userSample);
        }, 1000);
    });
}

function _register(doorlockKey){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            if(doorlockKey == doorlockKeySample){
                resolve(userSample);
            }else{
                reject();
            }
        }, 1000);
    });
}

function _unregister(){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve();
        }, 1000);
    });
}
