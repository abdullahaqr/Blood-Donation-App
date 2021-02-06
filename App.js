
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/config/Navigation'
import { Provider } from 'react-redux'
import { store, persistor } from './store/index'
import {DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Profile from './src/components/Profile'
import Home from './src/components/Home'


import RegistrationForm from './src/components/registrationForm'


import { PersistGate } from 'redux-persist/integration/react'
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(true)
  return (

    <Provider store={store}>


        <PersistGate persistor={persistor}>
          <NavigationContainer >

            <StackNavigator />
            <StatusBar />
          </NavigationContainer>
        </PersistGate>





    </Provider>

  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
