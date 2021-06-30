import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';
import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import Thunk from 'redux-thunk';
import { AppearanceProvider } from 'react-native-appearance';
import { Appearance } from 'react-native-appearance';

import authReducer from './src/Auth/store/reducers/authReducer';
import userReducer from './src/User/store/reducers/userReducer';
import feedReducer from './src/Feed/store/reducers/feedReducer';
import friendReducer from './src/Friend/store/reducers/friendReducer';
import followReducer from './src/Follow/store/reducers/followReducer';
import requestReducer from './src/Request/store/reducers/requestReducer';
import chatReducer from './src/Chat/store/reducers/chatReducer';
import storyReducer from './src/Story/store/reducers/storyReducer';

import Navigator from './navigator/Navigator';

const rootReducer = combineReducers({
  ath: authReducer,
  usr: userReducer,
  feed: feedReducer,
  frd: friendReducer,
  flw: followReducer,
  rqst: requestReducer,
  cht: chatReducer,
  sty: storyReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(Thunk)));

let colorScheme = Appearance.getColorScheme();

console.log('colorScheme : ', colorScheme);

let subscription = Appearance.addChangeListener(({ colorScheme }) => {
    console.log(colorScheme);
    colorScheme = colorScheme;
});

let darkMode = true;

const fetchFonts = () => {
  return Font.loadAsync({
    'handlee' : require('./assets/fonts/Handlee/Handlee-Regular.ttf'),
  });
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if(!fontLoaded){
    return (
      <AppLoading 
        startAsync={fetchFonts}
        onError={() => {}}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return (
    <AppearanceProvider>
      <Provider store={store}>
        <View style={styles.container}>
          <Navigator />
          <StatusBar style={darkMode ? "light" : "dark"} backgroundColor={darkMode ? "#000" : "#fff"} />
        </View>
      </Provider>
    </AppearanceProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
