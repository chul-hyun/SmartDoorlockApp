'use strict';

import reactNotification from 'react-native-system-notification';
import localStorage from './localStorage';

export default async function pushNotification(notificationData){
    let { message, type } = notificationData;
    let setting           = await localStorage.getItem('setting');

    let alram             = {
        onAuthSuccess : true,
        onAuthFail    : true,
        onTempWarning : true
    }

    if( setting !== null ){
        alram = setting.alram;
    }

    if(type == 'auth success' && alram.onAuthSuccess){
        reactNotification.create({
            message
        });
    }

    if(type == 'auth fail' && alram.onAuthFail){
        reactNotification.create({
            message
        });
    }

    if(type == 'temp warning' && alram.onTempWarning){
        reactNotification.create({
            message
        });
    }
}
