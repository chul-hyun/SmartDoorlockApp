'use strict';

import TYPES from './types';

import middleServerAPI from '../../util/middle-server-api';
import localStorage from '../../util/localStorage';

import { pages } from '../../static/app';

import store from '../../store';

export function login(){
    return async function(dispatch){

        let data = await _login();
        console.log('data', data);
        if(data.result){
            dispatch({
                type   : TYPES.LOGIN,
                user   : data.user
            });
        }else{
            dispatch({
                type : TYPES.LOGOUT
            })
        }
    }
}

export function checkUserInfo(){
    return async function(dispatch){
        let check = await existLoginInfo();
        if(check.result){
            dispatch({
                type : TYPES.LOGGED,
                user : check.loginInfo
            });
        }else{
            dispatch({
                type : TYPES.NON_LOGGED
            });
        }
    }
}

export function setGCMID(GCMRegistrationId){
    return async function(dispatch){
        //let _GCMRegistrationId = await localStorage.getItem('GCMRegistrationId');

        //if(_GCMRegistrationId === null || GCMRegistrationId != _GCMRegistrationId){
            await localStorage.setItem('GCMRegistrationId', GCMRegistrationId);
            await setGCMRegistrationId(GCMRegistrationId);
        //}

        dispatch({
            type : TYPES.SET_GCM_REGISTRATION_ID,
            GCMRegistrationId
        });
    }
}

export function regist(registInfo){
    return async function(dispatch){
        let { result, user } = await _regist(registInfo)

        if(result){
            dispatch({
                type : TYPES.LOGIN,
                user
            });

            let GCMRegistrationId = await localStorage.getItem('GCMRegistrationId');
            if(GCMRegistrationId !== null){
                await setGCMRegistrationId(GCMRegistrationId);
            }
        }else{
            dispatch({
                type : TYPES.ALERT,
                message : '등록 실패'
            })
        }
    }
}

export function unregist(){
    return async function(dispatch){
        await _unregist()
        dispatch({
            type : TYPES.LOGOUT
        })
    }
}

export function changeName(name){
    return async function(dispatch){
        if(await _changeName(name)){
            dispatch({
                type : TYPES.CHANGE_NAME,
                name
            })
        }
    }
}

async function setGCMRegistrationId(GCMRegistrationId){
    let loginInfo = await localStorage.getItem('loginInfo');
    if( loginInfo === null ){
        return false;
    }

    await middleServerAPI.userPost('setGCMRegistrationId', loginInfo, GCMRegistrationId);
    return true;
}

async function existLoginInfo(){
    let loginInfo = await localStorage.getItem('loginInfo');

    if( loginInfo === null ){
        return {result: false};
    }
    return {result: true, loginInfo};
}

async function _login(){
    console.log('get loginInfo')
    let loginInfo = await localStorage.getItem('loginInfo');
    console.log(loginInfo)

    if( loginInfo === null ){
        return {result: false};
    }

    let data = await middleServerAPI.rsaPost('login', loginInfo);

    return data;
}

async function _regist(registInfo){
    let { result, user } = await middleServerAPI.rsaPost('regist', registInfo);

    if(!result){
        return {result};
    }

    await localStorage.setItem('loginInfo', {
        id: user.id,
        password: user.password
    });

    return { result, user };
}

async function _unregist(){
    console.log('removeItem');
    let id        = store.getState().getIn(['doorlock', 'user', 'id'])
    let password  = store.getState().getIn(['doorlock', 'user', 'password'])
    let loginInfo = {id, password};
    await middleServerAPI.userPost('unregist', loginInfo);
    await localStorage.removeItem('loginInfo');
}

async function _changeName(name){
    let id        = store.getState().getIn(['doorlock', 'user', 'id'])
    let password  = store.getState().getIn(['doorlock', 'user', 'password'])
    let loginInfo = {id, password};
    console.log(loginInfo);
    let { result } = await middleServerAPI.userPost('changeName', loginInfo, name);

    return result;
}
