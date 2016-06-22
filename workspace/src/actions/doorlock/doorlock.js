'use strict';

import TYPES from './types';
import store from '../../store';

import middleServerAPI from '../../util/middle-server-api';

export function unlock(){
    return async function(dispatch){
        let result = await _unlock()

        dispatch({
            type   : TYPES.UNLOCK,
            result
        });
    }
}

async function _unlock(){
    let id        = store.getState().getIn(['doorlock', 'user', 'id'])
    let password  = store.getState().getIn(['doorlock', 'user', 'password'])
    let loginInfo = {id, password};
    console.log(loginInfo);
    let { result } = await middleServerAPI.userPost('unlock', loginInfo);
    console.log(`unlock :${result}`);
    return result;
}
