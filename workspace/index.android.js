'use strict';

import React, { Component, AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './src/containers/App';
import store from './src/store';
//import Notification from 'react-native-system-notification';
//import GcmAndroid from 'react-native-gcm-android';
/*
if (GcmAndroid.launchNotification) {
    let notification = GcmAndroid.launchNotification;
    let info = JSON.parse(notification.info);
    Notification.create({
        message: info.message
    });
    GcmAndroid.stopService();
}else{*/
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
//}
