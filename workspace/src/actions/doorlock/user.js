'use strict';

import TYPES from './types';

import Immutable from 'immutable';

const userSample = Immutable.Map({
    info: {
        registDate     : new Date(1463310111059),
        latestAuthDate : new Date(1463407268450),
        name           : "undefined",
        key            : 1
    },
    registered: false
});

const doorlockKeySample = '123abc';

export function init(){
    return (dispatch) =>{
        _init().
            then((user)=>{
                console.log(TYPES.APP_INIT);
                dispatch({
                    type : TYPES.APP_INIT,
                    user : user
                })
            }, (message)=>{
                dispatch({
                    type : TYPES.ALERT,
                    message
                })
            });
    }
}

export function regist(name, doorlockKey){
    return (dispatch)=>{
        _regist(name, doorlockKey).
            then((info)=>{
                dispatch({
                    type : TYPES.REGISTER,
                    info
                })
            }, (message)=>{
                dispatch({
                    type : TYPES.ALERT,
                    message
                })
            });
    }
}

export function unregist(){
    return (dispatch) =>{
        _unregist().
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
            resolve(userSample.toJS());
        }, 1000);
    });
}

function _regist(name, doorlockKey){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            if(doorlockKey == doorlockKeySample){
                console.log(name);
                resolve(userSample.mergeDeep({info:{ name }}).toJS().info);
            }else{
                reject('error message');
            }
        }, 1000);
    });
}

function _unregist(){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve();
        }, 1000);
    });
}
