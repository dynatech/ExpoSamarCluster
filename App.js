import React, {useEffect} from 'react';
import { LogBox } from 'react-native';
import AuthStack from './navigations/AuthStack';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { default as theme } from './assets/branding.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Notifications } from 'react-native-notifications';
import 'react-native-reanimated'

const App = () => {
  LogBox.ignoreAllLogs()
  
  useEffect(()=> {
    Notifications.registerRemoteNotifications();

    Notifications.events().registerRemoteNotificationsRegistered((event: Registered) => {
        // TODO: Send the token to my server so it could send back push notifications...
        console.log("Device Token Received", event.deviceToken);
    });
    Notifications.events().registerRemoteNotificationsRegistrationFailed((event: RegistrationError) => {
        console.error(event);
    });
  }, []);

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