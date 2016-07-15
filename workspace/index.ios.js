'use strict';

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './built/containers/App';
import configureStore from './built/store/configureStore';

const store = configureStore();

class ReduxCounterUniversal extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('DoorlockApp', () => ReduxCounterUniversal);
