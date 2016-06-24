'use strict';

import reactNotification from 'react-native-system-notification';
import localStorage from './localStorage';

export default async function pushNotification(notificationData){
    let { message, type } = notificationData;
    let setting     = await localStorage.getItem('setting');

    let alramSetting = {
        onAuthSuccess : true,
        onAuthFail    : true,
        onTempWarning : true
    }

    if( setting.alram !== null ){
        alramSetting = setting.alram;
    }

    if(type == 'auth success' && alramSetting.onAuthSuccess){
        reactNotification.create({
            message
        });
    }

    if(type == 'auth fail' && alramSetting.onAuthFail){
        reactNotification.create({
            message
        });
    }

    if(type == 'temp warning' && alramSetting.onTempWarning){
        reactNotification.create({
            message
        });
    }
}
