'use strict';

import TYPES from './types';

import Immutable from 'immutable';
import Q from 'q';

import middleServerAPI from '../../util/middle-server-api';
import localStorage from '../../util/localStorage';

import Notification from 'react-native-system-notification';
import GcmAndroid from 'react-native-gcm-android';

export function login(){
    return (dispatch) =>{
        (async function(){
            try{
                let data = await _login();
                console.log('data:', data);
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
            }catch(error){
                console.log('error catch');
                dispatch({
                    type : TYPES.ALERT
                })
            }
        })();
    }
}

export function setGCMID(GCMRegistrationId){
    return (dispatch)=>{
        (async function(){
            try{
                let _GCMRegistrationId = await localStorage.getItem('GCMRegistrationId');

                if(_GCMRegistrationId === null || GCMRegistrationId != _GCMRegistrationId){
                    await localStorage.setItem('GCMRegistrationId', GCMRegistrationId);
                    await setGCMRegistrationId(GCMRegistrationId);
                }
                
                dispatch({
                    type : TYPES.SET_GCM_REGISTRATION_ID,
                    GCMRegistrationId
                });
            }catch(error){
                console.log('error catch');
            }
        })();
    }
}

export function regist(registInfo){
    return (dispatch)=>{
        (async function(){
            try{
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
                        message
                    })
                }
            }catch(error){
                console.log('error catch');
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
                    type : TYPES.LOGOUT
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

async function setGCMRegistrationId(GCMRegistrationId){
    let loginInfo = await localStorage.getItem('loginInfo');
    if( loginInfo === null ){
        return false;
    }

    await middleServerAPI.rsaPost('setGCMRegistrationId', {loginInfo, GCMRegistrationId});
    return true;
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
    await localStorage.removeItem('loginInfo');
}
