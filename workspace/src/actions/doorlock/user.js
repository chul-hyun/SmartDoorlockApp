'use strict';

import TYPES from './types';

import Immutable from 'immutable';
import Q from 'q';

import middleServerAPI from '../../util/middle-server-api';
import localStorage from '../../util/localStorage';

export function login(){
    return (dispatch) =>{
        (async function(){
            try{
                let user = await _login()
                dispatch({
                    type  : TYPES.LOGIN,
                    login : true,
                    user
                });
            }catch(error){
                dispatch({
                    type : TYPES.LOGIN,
                    login : false,
                    user
                });
            }
        })();
    }
}

export function regist({ name, doorlockId, doorlockKey }){
    return (dispatch)=>{
        (async function(){
            try{
                let user = await _regist({ name, doorlockId, doorlockKey })
                console.log('regist dispatch');
                console.log(user);
                dispatch({
                    type : TYPES.REGISTER,
                    user
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

function _login(){
    let def = Q.defer();

    (async function(){
        let loginInfo = await localStorage.getItem('loginInfo');
        //@TODO 에러가 어디로 방출될려나..?
        let user = await middleServerAPI.rsaPost('login', loginInfo);
        console.log(user)
        def.resolve(user);
    })();

    return def.promise;
}

function _regist({ name, doorlockId, doorlockKey }){
    console.log('_regist');
    let def = Q.defer();

    (async function(){
        let data = await middleServerAPI.rsaPost('regist', { name, doorlockId, doorlockKey });
        console.log(data);
        if(data.result == 'success'){
            await localStorage.setItem('loginInfo', {
                id: data.user.id,
                password: data.user.password
            });
            def.resolve(data.user);
        }else{
            def.reject({nessage:'message'});
        }
    })();

    return def.promise;
}

function _unregist(){
    let def = Q.defer();

    (async function(){
        console.log('removeItem');
        await localStorage.removeItem('loginInfo');
        def.resolve();
    })();

    return def.promise;
}
