'use strict';

import TYPES from './types';
import store from '../../store';

import middleServerAPI from '../../util/middle-server-api';

import localStorage from '../../util/localStorage';

export function setAlarmSetting(alarm){
    return async function(dispatch){
        dispatch({
            type   : TYPES.CHANGE_SETTING,
            setting : { alarm }
        });
    }
}

export function init(alarm){
    return async function(dispatch){
        let setting = await localStorage.getItem('setting');
        console.log('setting init', setting);
        if(setting != null){
            dispatch({
                type   : TYPES.CHANGE_SETTING,
                setting
            });
        }
    }
}
