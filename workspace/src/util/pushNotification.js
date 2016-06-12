'use strict';

import reactNotification from 'react-native-system-notification';
import localStorage from './localStorage';

export default async function pushNotification(notificationData){
    let { message, type } = notificationData;
    let { alram }         = await localStorage.getItem('setting');

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
