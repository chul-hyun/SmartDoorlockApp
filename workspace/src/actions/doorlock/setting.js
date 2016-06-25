'use strict';

import TYPES from './types';
import store from '../../store';

import middleServerAPI from '../../util/middle-server-api';

export function setAlramSetting(alram){
    return async function(dispatch){
        dispatch({
            type   : TYPES.CHANGE_SETTING,
            setting : { alram }
        });
    }
}
