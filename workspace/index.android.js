'use strict';

import React, { Component, AppRegistry } from 'react-native';
import { Provider } from './src/util/extend-redux';
import App from './src/containers/App';
import store from './src/store';

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
