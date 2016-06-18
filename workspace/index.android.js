'use strict';

console.log('start app');

import React, { Component } from 'react';

import {
    AppRegistry
} from 'react-native';

import {
    Provider
} from './src/util/extend-redux';

import reactGcmAndroid from 'react-native-gcm-android';

import pushNotification from './src/util/pushNotification';

import store from './src/store';
import App from './src/containers/App';

if (reactGcmAndroid.launchNotification) { //어플리케이션이 종료되어 있을 시
    (async function(){
        let notificationData = reactGcmAndroid.launchNotification;
        notificationData = JSON.parse(notificationData.info);
        await pushNotification(notificationData);

        //프로세스 종료
        reactGcmAndroid.stopService(); //@TODO 이게 있어도 종료되어있을때 복수의 GCM을 받을수 있는지 체크.
    })();
}else{
    class DoorlockApp extends Component {
        render() {
            return (
                <Provider store={store}>
                    <App />
                </Provider>
            );
        }
    }

    AppRegistry.registerComponent('DoorlockApp', ()=> DoorlockApp);
}
