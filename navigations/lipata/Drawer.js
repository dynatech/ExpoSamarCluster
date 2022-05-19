import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Signout from '../../components/lipata/Drawer/Signout';
import Feedback from '../../components/lipata/Drawer/Feedback';
import Preference from '../../components/lipata/Drawer/Preference';
import ProfileSettings from '../../components/lipata/Drawer/ProfileSettings';
import LipataDashboardStack from './LipataDashboardStack';

const Draws = createDrawerNavigator();

const Drawer = (props) => {
  return (
      <Draws.Navigator initialRouteName='LipataDashboardStack' 
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
        <Draws.Screen name="ProfileSettings" options={{
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
  );
}

export default Drawer;