import 'react-native-gesture-handler';

import React from 'react';
import AppNavigator from './src/navigation/PlaceNavigator';
import configureStore from './src/store/configureStore';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

const store = configureStore();
const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
