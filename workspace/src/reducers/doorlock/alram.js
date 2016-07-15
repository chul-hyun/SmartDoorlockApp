'use strict';

import TYPES from '../../actions/doorlock/types';
import { ToastAndroid } from 'react-native';

export default function alram(state, action){
    if(!(action && action.type)){
        return;
    }

    switch(action.type){
        case TYPES.ALERT:
            ToastAndroid.show(action.message, ToastAndroid.SHORT)
            break;
        case TYPES.NON_LOGGED:
            ToastAndroid.show('자동 로그인 실패', ToastAndroid.SHORT)
            break;
        case TYPES.CHANGE_NAME:
            ToastAndroid.show('이름 변경 완료', ToastAndroid.SHORT)
            break;
        case TYPES.CHANGE_SETTING:
            ToastAndroid.show('설정 적용 완료', ToastAndroid.SHORT)
            break;
        case TYPES.SEARCH:
            ToastAndroid.show('검색 완료', ToastAndroid.SHORT)
            break;
    }
}
