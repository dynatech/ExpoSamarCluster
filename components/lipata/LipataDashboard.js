import React, { Fragment, useState, useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Layout, Text, Input, Button} from '@ui-kitten/components';
import { ImageStyle } from '../../styles/image_style';
import NavHeader from '../utils/NavHeader';
import SiteSummary from '../utils/SiteSummary';
// import { Notifications } from 'react-native-notifications';

const LipataDashboard = (props) => {
    const StackNavigator = props.navigation;
    const [ userName, setUserName ] = useState("");

    // useEffect(()=>{
    //     Notifications.registerRemoteNotifications();

    //     Notifications.events().registerNotificationReceivedForeground((notification: Notifications, completion) => {
    //         const payload = notification.payload;
    //         console.log(`Notification received in foreground: ${payload['gcm.notification.title']} : ${payload['gcm.notification.body']}`);

    //         Notifications.postLocalNotification({
    //             title: payload['gcm.notification.title'],
    //             body: payload['gcm.notification.body'],
    //             extra: "data"
    //         });

    //         completion({alert: false, sound: false, badge: false});
    //     });
    
    //     Notifications.events().registerNotificationOpened((notification: Notifications, completion) => {
    //       console.log(`Notification opened: ${notification.payload}`);
    //       completion();
    //     });
    // }, []);

    useEffect(() => {
        if (props.route.params) {
            // console.log(props.route.params.username)
            setUserName(props.route.params.username)
         }
    }, [props])

    return(
        <Layout style={styles.container} level='1'>
            <KeyboardAvoidingView
                style={{height: '100%'}}
            >
                <NavHeader StackNavigator={StackNavigator} />
                <SiteSummary userName={userName} />
                <Layout style={styles.container} level='1'>
                    <Layout style={styles.layout} level='1'>
                        <Layout style={[styles.container, {paddingTop: 42}]} level='1'>
                            <TouchableOpacity style={styles.menu} onPress={() => { StackNavigator.navigate("CRATabStack") }}>
                                <Image style={ImageStyle.dashboard_menu_icon} source={require('../../assets/CRA-originalpallete-Square.png')}></Image>
                            </TouchableOpacity>
                            <Text category='p2' style={styles.textMenu}>Community Risk {"\n"}Assessment</Text>
                        </Layout>
                        <Layout style={styles.container} level='1'>
                            <TouchableOpacity style={styles.menu} onPress={() => { StackNavigator.navigate("SurficialMonitoringStack") }}>
                                <Image style={ImageStyle.dashboard_menu_icon} source={require('../../assets/Surficial-originalpallete-Square.png')}></Image>
                            </TouchableOpacity>
                            <Text category='p2' style={styles.textMenu}>Surficial Monitoring</Text>
                        </Layout>
                    </Layout>
                    <Layout style={styles.layout} level='1'>
                        <Layout style={styles.container} level='1'>
                            <TouchableOpacity style={styles.menu} onPress={() => { StackNavigator.navigate("SensorDataStack") }}>
                                <Image style={ImageStyle.dashboard_menu_icon} source={require('../../assets/Sensor-originalpallete-Square.png')}></Image>
                            </TouchableOpacity>
                            <Text category='p2' style={styles.textMenu}>Sensor Data</Text>
                        </Layout>
                        <Layout style={styles.container} level='1'>
                            <TouchableOpacity style={styles.menu} onPress={() => { StackNavigator.navigate("CallNTextStack") }}>
                                <Image style={ImageStyle.dashboard_menu_icon} source={require('../../assets/CallandText-originalpallete-Square.png')}></Image>
                            </TouchableOpacity>
                            <Text category='p2' style={styles.textMenu}>Call and Text</Text>
                        </Layout>
                    </Layout>
                    <Layout style={styles.layout} level='1'>
                        <Layout style={styles.container} level='1'>
                            <TouchableOpacity style={styles.menu} onPress={() => { StackNavigator.navigate("EarlyWarningInformation") }}>
                                <Image style={ImageStyle.dashboard_menu_icon} source={require('../../assets/EWI-originalpallete-Square.png')}></Image>
                            </TouchableOpacity>
                            <Text category='p2' style={styles.textMenu}>Early Warning Information</Text>
                        </Layout>
                        <Layout style={styles.container} level='1'>
                            <TouchableOpacity style={styles.menu} onPress={() => { StackNavigator.navigate("ActivitySchedule") }}>
                                <Image style={ImageStyle.dashboard_menu_icon} source={require('../../assets/Calendar-originalpallete-Square.png')}></Image>
                            </TouchableOpacity>
                            <Text category='p2' style={styles.textMenu}>Activity Schedule</Text>
                        </Layout>
                    </Layout>
                </Layout>
            </KeyboardAvoidingView>
        </Layout>
    )
}

export default LipataDashboard;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    layout: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 25
    },
    menu: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textMenu: {
        textAlign: 'center'
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
        width: '70%'
    }
});

