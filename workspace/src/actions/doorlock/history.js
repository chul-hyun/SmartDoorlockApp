'use strict';

import TYPES from './types';
import store from '../../store';

import middleServerAPI from '../../util/middle-server-api';

export function getHistory(){
    return async function(dispatch){
        let { result, history } = await _getHistory()

        if(result){
            dispatch({
                type   : TYPES.HISTORY,
                history
            });
        }
    }
}

async function _getHistory(){
    console.log('_getHistory');
    let id        = store.getState().getIn(['doorlock', 'user', 'id'])
    let password  = store.getState().getIn(['doorlock', 'user', 'password'])
    let loginInfo = {id, password};
    console.log(loginInfo);
    let { result, history } = await middleServerAPI.userPost('getHistory', loginInfo);
    console.log('history', history);
    return { result, history };
}
