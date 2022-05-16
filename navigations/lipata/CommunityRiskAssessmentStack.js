import React from 'react';
import { Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FamilyRiskProfile from '../../components/lipata/CommunityRiskAssessment/FamilyRiskProfile';
import HazardMap from '../../components/lipata/CommunityRiskAssessment/HazardMap';

const Tab = createMaterialTopTabNavigator();
function CommunityRiskAssessmentStack() {
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
            <Tab.Screen name="FamilyRiskProfile"
                component={FamilyRiskProfile} options={{
                    'tabBarLabel': 'Family Risk Profile'
                }} />
            <Tab.Screen name="HazardMap"
                component={HazardMap} options={{
                    'tabBarLabel': 'Hazard Maps'
                }} />
        </Tab.Navigator>
    );
}

export default CommunityRiskAssessmentStack;