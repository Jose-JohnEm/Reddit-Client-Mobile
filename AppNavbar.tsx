import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import SubReddit from './Subreddit';
import Profile from './Profile';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
const Tab = createMaterialBottomTabNavigator();


const AppNavbar : React.FC = () => {

  return (
    <Tab.Navigator>
      <Tab.Screen name="Acceuil" component={SubReddit} />
      <Tab.Screen name="Profil" component={Profile} />
    </Tab.Navigator>
  )
}

export default AppNavbar;