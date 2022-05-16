import React from 'react';
import { Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SurficialData from '../../components/lipata/SurficialMonitoring/SurficialData';
import SurficialMarker from '../../components/lipata/SurficialMonitoring/SurficialMarker';
import LandslideFeatures from '../../components/lipata/SurficialMonitoring/LandslideFeatures';

const Tab = createMaterialTopTabNavigator();
function SurficialMonitoringStack() {
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
                }
            }}>
            <Tab.Screen name="SurficialMarker"
                component={SurficialMarker} options={{
                    'tabBarLabel': 'Surficial Marker'
                }} />
            <Tab.Screen name="LandslideFeatures"
                component={LandslideFeatures} options={{
                    'tabBarLabel': 'Landslide Features'
                }} />
            <Tab.Screen name="SurficialData"
                component={SurficialData} options={{
                    'tabBarLabel': 'Surficial Data'
                }} />
        </Tab.Navigator>
    );
}

export default SurficialMonitoringStack;