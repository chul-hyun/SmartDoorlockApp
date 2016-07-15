'use strict';

import { createReducer } from '../../util/extend-redux'
import Immutable from 'immutable';
import TYPES from '../../actions/doorlock/types';

import initialState from './initialState';

import localStorage from '../../util/localStorage';

export default createReducer(Immutable.Map(), {
    [TYPES.CHANGE_SETTING]:
        (_setting, { setting })=>{
            let changedSetting = _setting.mergeDeep(setting);
            (async function(){
                console.log('setting save', changedSetting.toJS());
                await localStorage.setItem('setting', changedSetting.toJS());
                console.log('setting saved');
            })();
            return changedSetting;
        }
});
