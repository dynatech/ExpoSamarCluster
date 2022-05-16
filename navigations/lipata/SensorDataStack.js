import React from 'react';
import { Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SubsurfaceData from '../../components/lipata/SensorData/SubsurfaceData';
import RainfallData from '../../components/lipata/SensorData/RainfallData';

const Tab = createMaterialTopTabNavigator();
function SensorDataStack() {
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
            <Tab.Screen name="SubsurfaceData"
                component={SubsurfaceData} options={{
                    'tabBarLabel': 'Subsurface Data'
                }} />
            <Tab.Screen name="RainfallData"
                component={RainfallData} options={{
                    'tabBarLabel': 'Rainfall Data'
                }} />
        </Tab.Navigator>
    );
}

export default SensorDataStack;