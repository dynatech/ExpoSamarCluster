import React, { useEffect, Fragment } from 'react';
import { View, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Signout from '../../components/lipata/Drawer/Signout';
import Feedback from '../../components/lipata/Drawer/Feedback';
import Preference from '../../components/lipata/Drawer/Preference';
import ProfileSettings from '../../components/lipata/Drawer/ProfileSettings';
import LipataDashboardStack from './LipataDashboardStack';
import { Avatar, Title, Caption, Paragraph, DrawerContentScrollView } from 'react-native-paper';
import { Divider, Text } from '@ui-kitten/components';
import DrawerContent from './DrawerContent';

const Draws = createDrawerNavigator();

const Drawer = () => {
  return (
    <Draws.Navigator initialRouteName='LipataDashboardStack' 
    drawerContent={(props)=> <DrawerContent {...props}/>} 
    screenOptions={{
      drawerStyle: {
        backgroundColor: '#16526D',
        width: 240,
      },
      drawerLabelStyle: {
        color: 'white'
      },
      drawerActiveBackgroundColor: '#0B304E',
      drawerPosition: 'right'
    }}>
      <Draws.Screen name="Dashboard" options={{
              header: () => null
        }} component={LipataDashboardStack} />
      <Draws.Screen name="Profile Details" options={{
              header: () => null
          }}  component={ProfileSettings} />
      <Draws.Screen name="Feedback" options={{
              header: () => null
          }} component={Feedback} />
      <Draws.Screen name="Preference" options={{
              header: () => null
          }} component={Preference} />
      <Draws.Screen name="Sign out" options={{
          header: () => null
      }} component={Signout} />
  </Draws.Navigator>
  )
}
export default Drawer;