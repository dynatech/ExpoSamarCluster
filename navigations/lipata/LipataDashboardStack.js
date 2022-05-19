
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import NavHeader from '../../components/utils/NavHeader';
import LipataDashboard from '../../components/lipata/LipataDashboard';
import CommunityRiskAssessmentStack from '../lipata/CommunityRiskAssessmentStack';
import SurficialMonitoringStack from './SurficialMonitoringStack';
import SensorDataStack from './SensorDataStack';
import EarlyWarningInformation from '../../components/lipata/EarlyWarningInformation/EarlyWarningInformation';
import ActivitySchedule from '../../components/lipata/ActivitySchedule/ActivitySchedule';
import CallNTextStack from './CallNTextStack';
const Stack = createStackNavigator();

function LipataDashboardStack(props) {
    
    return(
        <Stack.Navigator>
            <Stack.Screen name="LipataDashboard" options={{
                header: () => null
            }} component={LipataDashboard} />
            <Stack.Screen name="NavHeader" options={{
                header: () => null
            }} component={NavHeader} />
            <Stack.Screen name="CRATabStack" options={{
                header: () => null
            }} component={CommunityRiskAssessmentStack} />
            <Stack.Screen name="SurficialMonitoringStack" options={{
                header: () => null
            }} component={SurficialMonitoringStack} />
            <Stack.Screen name="SensorDataStack" options={{
                header: () => null
            }} component={SensorDataStack} />
            <Stack.Screen name="CallNTextStack" options={{
                header: () => null
            }} component={CallNTextStack} />
            <Stack.Screen name="EarlyWarningInformation" options={{
                title: 'Early Warning Information',
                header: () => null
            }} component={EarlyWarningInformation} />
            <Stack.Screen name="ActivitySchedule" options={{
                header: () => null
            }} component={ActivitySchedule} />
        </Stack.Navigator>
    );
}

// <Stack.Screen name="CRA" options={{
//     title: 'Community Risk Assessment'
// }} component={CRA} />
// <Stack.Screen name="AlertGen"  options={{
//     title: 'Alert Generation'
// }} component={AlertGen} />
// <Stack.Screen name="DataAnalysis"  options={{
//     title: 'Data Analysis'
// }} component={DataAnalysis} />
// <Stack.Screen name="GroundData"  options={{
//     title: 'Ground Data'
// }} component={GroundData} />
// <Stack.Screen name="SensorData"  options={{
//     title: 'Sensor Data'
// }} component={SensorData} />
// <Stack.Screen name="Maintenance"  options={{
//     title: 'Maintenance'
// }} component={Maintenance} />
// <Stack.Screen name="DataSync"  options={{
//     title: 'Data Sync'
// }} component={DataSync} />

export default LipataDashboardStack;