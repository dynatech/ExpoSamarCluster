import React, { useEffect, useState, useRef } from 'react';
import { LogBox } from 'react-native';
import AuthStack from './navigations/AuthStack';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { default as theme } from './assets/branding.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import 'react-native-reanimated'
import Config from 'react-native-config';
import axios from 'axios';
import MobileCaching  from './components/utils/MobileCaching';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

const App = () => {

  LogBox.ignoreAllLogs()
  useEffect(() => {
    axios.get(`${Config.API_URL}/api/utils/designations`)
    .then(function (response) {
      MobileCaching.setItem('DESIGNATIONS', response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  }, []);
  

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  // Can only be tested on an actual device
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      console.log("token:", token);
      setExpoPushToken(token)
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const registerForPushNotificationsAsync = async () => {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync({
        experienceId: '@jgeliberte/ExpoSamarCluster',
      })).data;
      return token;
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
        <AuthStack />
      </ApplicationProvider>
    </>
  );
};

export default App;