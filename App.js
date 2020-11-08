import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import SplashScreen from './components/SplashScreen';


const Stack = createStackNavigator();

export default class App extends React.Component {
  render () {
    return(
        
        <NavigationContainer>
        <Stack.Navigator screenOptions={{
                headerShown: false
              }}>
              <Stack.Screen name="SplashScreen" component={SplashScreen} />
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
              <Stack.Screen name="HomeScreen" component={HomeScreen} 
            />
        </Stack.Navigator>
      </NavigationContainer>
      
    );
  }
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
  },
});