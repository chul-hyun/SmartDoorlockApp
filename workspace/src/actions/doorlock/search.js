'use strict';

import TYPES from './types';

import middleServerAPI from '../../util/middle-server-api';
import localStorage from '../../util/localStorage';

import { pages } from '../../static/app';

import store from '../../store';

export function search(filter){
    return async function(dispatch){
        let data = await _search(filter);
        if(data.result){
            dispatch({
                type   : TYPES.SEARCH,
                filter,
                history : data.history
            });
        }
    }
}

async function _search(filter){
    console.log('_search');
    let id        = store.getState().getIn(['doorlock', 'user', 'id'])
    let password  = store.getState().getIn(['doorlock', 'user', 'password'])
    let loginInfo = {id, password};

    let sendFilter = {};
    sendFilter.startDate = dateToStartInt(filter.startDate);
    sendFilter.endDate   = dateToEndInt(filter.endDate);

    let { result, history } = await middleServerAPI.userPost('search', loginInfo, Object.assign({}, filter, sendFilter));
    console.log('history', history);
    return { result, history };
}



function dateToStartInt(d){
    d.setHours(0, 0, 0)
    return parseInt(+d / 1000);
}

function dateToEndInt(d){
    d.setHours(23, 59, 59);
    return parseInt(+d / 1000);
}
