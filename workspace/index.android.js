'use strict';

import React, { Component, AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './src/containers/App';
import store from './src/store';
import pushNotification from './src/util/pushNotification';
import reactGcmAndroid from 'react-native-gcm-android';

if (reactGcmAndroid.launchNotification) { //어플리케이션이 종료되어 있을 시
    let notificationData = reactGcmAndroid.launchNotification;
    notificationData = JSON.parse(notificationData.info);
    pushNotification(notificationData);

    reactGcmAndroid.stopService(); //@TODO 이게 있어도 종료되어있을때 복수의 GCM을 받을수 있는지 체크.
}else{
    class ReduxCounterUniversal extends Component {
        render() {
            return (
                <Provider store={store}>
                    <App />
                </Provider>
            );
        }
    }

    AppRegistry.registerComponent('DoorlockApp', ()=> ReduxCounterUniversal);
}
