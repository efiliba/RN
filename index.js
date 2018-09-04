import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './store';
import App from './App';
import {name as appName} from './app.json';

import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const ReduxApp = props =>
  <Provider store={store}>
    <App />
  </Provider>

AppRegistry.registerComponent(appName, () => ReduxApp);
