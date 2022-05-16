import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ForgotPassword from '../components/authentications/ForgotPassword';
import Signin from '../components/authentications/Signin';
import Signup from '../components/authentications/Signup';
import Drawer from './lipata/Drawer';
import ProfileSettings from '../components/lipata/Drawer/ProfileSettings';

const Stack = createStackNavigator();

function AuthStack() {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Signin" options={{
                    header: () => null
                }} component={Signin} />
                <Stack.Screen name="Signup" options={{
                    header: () => null,
                    title: 'Account Registration'
                }} component={Signup} />
                <Stack.Screen name="ForgotPassword"  options={{
                    header: () => null,
                    title: 'Forgot Password'
                }} component={ForgotPassword} />
                <Stack.Screen name="Drawer"  options={{
                    header: () => null
                }} component={Drawer} />
                <Stack.Screen name="ProfileSettings"  options={{
                    header: () => null
                }} component={ProfileSettings} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AuthStack;