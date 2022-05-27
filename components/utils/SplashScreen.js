import React, { useEffect } from 'react';
import { Image, StyleSheet, View, PermissionsAndroid } from 'react-native';
import { Layout, Text, Button} from '@ui-kitten/components';
import { ImageStyle } from '../../styles/image_style';
import MobileCaching from './MobileCaching';

const SplashScreen = (props) => {

    const requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "Cool Photo App Camera Permission",
              message:
                "Cool Photo App needs access to your camera " +
                "so you can take awesome pictures.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the camera");
          } else {
            console.log("Camera permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
    };

    const requestExternalStoragePermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: "Cool Photo App READ_EXTERNAL_STORAGE Permission",
              message:
                "Cool Photo App needs access to your READ_EXTERNAL_STORAGE " +
                "so you can take awesome pictures.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the READ_EXTERNAL_STORAGE");
          } else {
            console.log("READ_EXTERNAL_STORAGE permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
    };

    const requestWriteStoragePermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: "Cool Photo App WRITE_EXTERNAL_STORAGE Permission",
              message:
                "Cool Photo App needs access to your WRITE_EXTERNAL_STORAGE " +
                "so you can take awesome pictures.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the WRITE_EXTERNAL_STORAGE");
          } else {
            console.log("WRITE_EXTERNAL_STORAGE permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
    };

    const AllowPermission = () => {
        requestCameraPermission();
        requestExternalStoragePermission();
        requestWriteStoragePermission();
        MobileCaching.setItem('allowed', true);
    }

    const CheckPermission = async () => {
        const camera =  await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
        const read =  await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
        const write =  await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        if (camera && read && write) {
            return true;
        } else {
            return false;
        }
    }

    useEffect(()=> {
      console.log("HIT ME");
      if (CheckPermission()) {
          props.navigation.navigate('Signin');
      }
    }, [props]);

    return(
        <Layout style={styles.container} level='1'>
            <Layout style={[styles.container, {paddingTop: 25}]}>
                <View style={styles.layout}>
                    <Image style={ImageStyle.splashscreen} source={require('../../assets/dynaslope_seal_contrast.png')}></Image>
                </View>
                <View>
                    <Text style={styles.text} category='h1'>COMMUNITY-BASED EARLY WARNING SYSTEM FOR LANDSLIDES</Text>
                </View>
            </Layout>
            <Layout style={[styles.container, {paddingTop: 25}]}>
                <View>
                    <Text style={styles.subtext} category='p1'>* This App requires you to allow Storage, Camera and Notification permissions on your phone</Text>
                </View>
                <View style={{alignItems: 'center', padding: 10}}>
                    <Button style={styles.button} status="info" onPress={AllowPermission}>Allow access</Button>
                </View>
            </Layout>
        </Layout>
    )
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10
    },
    layout: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
        textAlign: 'center',
        fontSize: 25
    },
    subtext: {
        textAlign: 'center',
        fontSize: 15
    },
    input: {
        padding: 20,
        margin: 0,
        textAlign: 'center'
    },
    buttonGroup: {
        paddingRight: 50,
        paddingLeft: 50,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        marginTop: 10,
        width: '70%',
    }

});