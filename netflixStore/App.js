/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */

import { NavigationContainer } from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
} from 'react-native';

import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Add from './screens/Add';
import Edit from './screens/Edit';



const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home"
          component={Home}
          options={{
            headerStyle: {
              backgroundColor: "#0f4c75",
            },
            title:"LCO netflix App",
            headerTitleStyle: {
              textAlign: "center",
              color: "#00b7c2",
            },
          }}></Stack.Screen>
          <Stack.Screen 
          name="Add"
          component={Add}
          options={{
            headerStyle: {
              backgroundColor: "#0f4c75",
            },
            title:"LCO netflix App",
            headerTitleStyle: {
              textAlign: "center",
              color: "#00b7c2",
            },
          }}></Stack.Screen>
          <Stack.Screen 
          name="Edit"
          component={Edit}
          options={{
            headerStyle: {
              backgroundColor: "#0f4c75",
            },
            title:"LCO netflix App",
            headerTitleStyle: {
              textAlign: "center",
              color: "#00b7c2",
            },
          }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
