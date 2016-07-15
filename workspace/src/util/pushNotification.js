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

    if( setting !== null && setting.alarm !== null ){
        alarmSetting = setting.alarm;
    }

    if(type == 'auth success' && alarmSetting.onAuthSuccess){
        alram(message)
    }

    if(type == 'auth fail' && alarmSetting.onAuthFail){
        alram(message)
    }

    if(type == 'temper warning' && alarmSetting.onTempWarning){
        alram(message)
    }
}

const debounceAlram = (function(){
    let latestId      = -1
    const trem        = 3000
    let deferList     = []
    let latestMessage = ''
    return function(message){
        latestMessage = message
        console.log('latestMessage', latestMessage)
        if(latestId > 0){
            clearTimeout(latestId)
        }
        latestId = -1


        return new Promise((resolve, reject)=>{
            deferList.push({resolve, reject})

            latestId = setTimeout(()=>{
                alram(latestMessage)
                console.log(deferList);
                deferList.forEach(({resolve})=> resolve(latestMessage) )
                deferList = []
                latestId  = -1
            }, trem)
        })
    }
})();

function alram(message){
    console.log('alram message', message)
    reactNotification.create({
        subject: 'Smart Doorlock',
        message
    });
    console.log('end')
}
