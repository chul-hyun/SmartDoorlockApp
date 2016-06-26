'use strict';

import reactNotification from 'react-native-system-notification';
import localStorage from './localStorage';
import _ from 'lodash';

export default async function pushNotification(notificationData){
    let { message, type } = notificationData;
    let setting     = await localStorage.getItem('setting');

    let alarmSetting = {
        onAuthSuccess : true,
        onAuthFail    : true,
        onTempWarning : true
    }

    if( setting.alarm !== null ){
        alarmSetting = setting.alarm;
    }

    console.log('setting', setting);

    if(type == 'auth success' && alarmSetting.onAuthSuccess){
        alram(message)
    }

    if(type == 'auth fail' && alarmSetting.onAuthFail){
        alram(message)
    }

    if(type == 'temp warning' && alarmSetting.onTempWarning){
        alram(message)
    }
}

const alram = _.debounce(function(message){
    reactNotification.create({
        message
    });
}, 1000);
