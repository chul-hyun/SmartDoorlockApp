'use strict';

import TYPES from './types';
import store from '../../store';

import middleServerAPI from '../../util/middle-server-api';

export function unlock(){
    return async function(dispatch){
        let { result, unlock, authtime } = await _unlock()

        if(result){
            if(unlock){
                dispatch({
                    type   : TYPES.UNLOCK,
                    authtime
                });
            }else{
                dispatch({
                    type    : TYPES.ALERT,
                    message : '문열기는 5초에 한번만 가능'
                });
            }
        }
    }
}

async function _unlock(){
    let id        = store.getState().getIn(['doorlock', 'user', 'id'])
    let password  = store.getState().getIn(['doorlock', 'user', 'password'])
    let loginInfo = {id, password};
    console.log(loginInfo);
    return await middleServerAPI.userPost('unlock', loginInfo);
}
