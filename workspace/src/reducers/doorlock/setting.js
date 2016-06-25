'use strict';

import { createReducer } from '../../util/extend-redux'
import Immutable from 'immutable';
import TYPES from '../../actions/doorlock/types';

import initialState from './initialState';

import localStorage from '../../util/localStorage';

export default createReducer(Immutable.Map(), {
    //[TYPES.LOGIN]:
    //    (_setting)=>{
    //        let setting = await localStorage.getItem('setting');
    //        return _setting.mergeDeep(setting)
    //    },

    //[TYPES.CHANGE_SETTING]:
    //    (_setting, { setting })=>{
    //        let changedSetting = _setting.mergeDeep(setting);
    //        await localStorage.setItem('setting', changedSetting.toJS());
    //        return changedSetting;
    //    }
});
