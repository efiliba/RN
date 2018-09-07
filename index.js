import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './store';
import App from './App';
import {name as appName} from './app.json';
import AppData from "./src/Services/Utility/AppData";

import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

AppData.ReduxDispatch = store.dispatch;
const ReduxApp = props =>
  <Provider store={store}>
    <App />
  </Provider>

AppRegistry.registerComponent(appName, () => ReduxApp);

const bgMessaging = async message => {
  // handle your message
  debugger;

  return Promise.resolve();                                         // Must resolve within 60 seconds.
};

// New task registration
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);