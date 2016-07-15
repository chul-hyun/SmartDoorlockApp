'use strict';

import React, { Component } from 'react';

import {
    AppRegistry
} from 'react-native';

import {
    Provider
} from './src/util/extend-redux';

import { commonStyles } from './src/static/styles';

import reactGcmAndroid from 'react-native-gcm-android';

import pushNotification from './src/util/pushNotification';

import store from './src/store';
import App from './src/containers/App';

console.log('reactGcmAndroid.launchNotification');
console.log(reactGcmAndroid.launchNotification);
if (reactGcmAndroid.launchNotification) { //어플리케이션이 종료되어 있을 시
    (async function(){

        let notificationData = reactGcmAndroid.launchNotification;
        console.log('notificationData', notificationData);
        notificationData = JSON.parse(notificationData.info);
        console.log('parse notificationData', notificationData);
        await pushNotification(notificationData);
        console.log('pushNotification end');

        //프로세스 종료
        reactGcmAndroid.stopService(); //@TODO 이게 있어도 종료되어있을때 복수의 GCM을 받을수 있는지 체크.
    })();
}else{
    console.log('doorlock');

    class doorlock extends Component {
        render() {
            return (
                <Provider store={store}>
                    <App />
                </Provider>
            );
        }
    }

    AppRegistry.registerComponent('doorlock', ()=> doorlock);
}
