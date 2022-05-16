import React from 'react';
import { Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Call from '../../components/lipata/CallAndText/Call';
import Messenger from '../../components/lipata/CallAndText/Text';

const Tab = createMaterialTopTabNavigator();
function CallNTextStack() {
    const screenWidth = Math.round(Dimensions.get('window').width);
    return (
        <Tab.Navigator
            lazyLoad={true}
            tabBarPosition='bottom'
            screenOptions={{
                tabBarInactiveTintColor: 'white',
                tabBarActiveTintColor: '#f5981c',
                scrollEnabled: true,
                tabBarStyle: { backgroundColor: '#083451' },
                tabStyle: {
                    justifyContent: 'center',
                    width: screenWidth/2
                }
            }}>
            <Tab.Screen name="Call"
                component={Call} options={{
                    'tabBarLabel': 'Call'
                }} />
            <Tab.Screen name="Text"
                component={Messenger} options={{
                    'tabBarLabel': 'Text'
                }} />
        </Tab.Navigator>
    );
}

export default CallNTextStack;