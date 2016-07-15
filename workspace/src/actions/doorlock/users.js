'use strict';

import TYPES from './types';
import store from '../../store';

import middleServerAPI from '../../util/middle-server-api';

export function getUsers(){
    return async function(dispatch){
        let { result, users } = await _getUsers()

        if(result){
            dispatch({
                type   : TYPES.USERS,
                users
            });
        }
    }
}

async function _getUsers(){
    console.log('_getUsers');
    let id        = store.getState().getIn(['doorlock', 'user', 'id'])
    let password  = store.getState().getIn(['doorlock', 'user', 'password'])
    let loginInfo = {id, password};
    console.log(loginInfo);
    let { result, users } = await middleServerAPI.userPost('getUsers', loginInfo);
    console.log('users', users);
    return { result, users };
}
