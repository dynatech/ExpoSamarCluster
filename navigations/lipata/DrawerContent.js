import React, { useEffect, Fragment, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Signout from '../../components/lipata/Drawer/Signout';
import Feedback from '../../components/lipata/Drawer/Feedback';
import Preference from '../../components/lipata/Drawer/Preference';
import ProfileSettings from '../../components/lipata/Drawer/ProfileSettings';
import LipataDashboardStack from './LipataDashboardStack';
import { Avatar, Title, Caption, Paragraph } from 'react-native-paper';
import { Divider, Text } from '@ui-kitten/components';
import MobileCaching from '../../components/utils/MobileCaching';

export function DrawerContent(props) {

  const [fullName, setFullname] = useState("");
  const [designation, setDesignation] = useState("");
  const [dp, setDp] = useState(null);

  useEffect(()=> {
    MobileCaching.getItem('credentials').then(response => {
      if (response) {
        console.log(response);
        setFullname(`${response.data.user.first_name} ${response.data.user.last_name}`);
        setDesignation(`${response.data.profile.designation_details.designation}`)
      }
    });

    MobileCaching.getItem('selectedDp').then(response => {
      if (response) {
        setDp(response);
      }
    });
  }, []);

    return (
      <DrawerContentScrollView {...props}>
        <View
          style={
            styles.drawerContent
          }
        >
          <View style={styles.userInfoSection}>
            {
              dp != null && 
                <Avatar.Image
                  source={dp}
                  size={50}
                />
            }
            <Text category="h5">{fullName != "" ? fullName : "N/A"}</Text>
            <Text category="c1">{designation != "" ? designation : "N/A"} GROUP</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Divider style={{width: '80%'}}/>
          </View>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    )
}

export default DrawerContent;

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1
    },
    userInfoSection: {
      padding: 20
    },
    title: {
      marginTop: 20,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
  