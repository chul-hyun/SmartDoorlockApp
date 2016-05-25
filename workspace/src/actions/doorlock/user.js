'use strict';

import TYPES from './types';

import Immutable from 'immutable';
import Q from 'q';

import middleServerAPI from '../../util/middle-server-api';
import localStorage from '../../util/localStorage';

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
        (async function(){
            try{
                let { userInfo, doorlockID } = await _init()
                console.log(TYPES.APP_INIT);
                dispatch({
                    type : TYPES.APP_INIT,
                    userInfo,
                    doorlockID
                });

            }catch({message}){
                dispatch({
                    type : TYPES.ALERT,
                    message
                });
            }
        })();
    }
}

export function regist(name, doorlockID, doorlockKey){
    return (dispatch)=>{
        (async function(){
            try{
                let { userInfo } = await _regist(name, doorlockID, doorlockKey)
                console.log(data);
                dispatch({
                    type : TYPES.REGISTER,
                    userInfo,
                    doorlockID
                })
            }catch({message}){
                dispatch({
                    type : TYPES.ALERT,
                    message
                })
            }
        })();
    }
}

export function unregist(){
    return (dispatch) =>{
        (async function(){
            try{
                await _unregist()
                dispatch({
                    type : TYPES.UNREGISTER
                })
            }catch({message}){
                dispatch({
                    type : TYPES.ALERT,
                    message
                })
            }
        })();
    }
}

function _init(){
    let def = Q.defer();

    (async function(){
        let userInfo = await localStorage.getItem('userInfo');
        let doorlockID = await localStorage.getItem('doorlockID');
        def.resolve({ userInfo, doorlockID });
    })();

    return def.promise;
}

function _regist(name, doorlockID, doorlockKey){
    console.log('_regist');
    let def = Q.defer();

    (async function(){
        console.log('middleServerAPI.rsaPost');
        let data = await middleServerAPI.rsaPost('regist', {name, doorlockID, doorlockKey});
        if(data.result == 'success'){
            await localStorage.setItem('userInfo', data.userInfo);
            await localStorage.setItem('doorlockID', doorlockID);
            def.resolve(data);
        }else{
            def.reject({nessage:'message'});
        }
    })();

    return def.promise;
}

function _unregist(){
    let def = Q.defer();
    setTimeout(()=>{
        def.resolve();
    }, 1000);

    return def.promise;
}
