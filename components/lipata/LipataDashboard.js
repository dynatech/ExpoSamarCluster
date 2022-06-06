import React, { Fragment, useState, useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import { Layout, Text, Input, Button} from '@ui-kitten/components';
import { ImageStyle } from '../../styles/image_style';
import NavHeader from '../utils/NavHeader';
import SiteSummary from '../utils/SiteSummary';
import MobileCaching  from '../utils/MobileCaching';

const LipataDashboard = (props) => {
    const StackNavigator = props.navigation;
    const [ userName, setUserName ] = useState("");

    useEffect(() => {
        MobileCaching.getItem('credentials').then(response => {
            if (response) {
                setUserName(response.data.user.nickname.charAt(0).toUpperCase() + response.data.user.nickname.slice(1));
            }
        });
    }, [props]);


    useEffect(() =>
    {
        StackNavigator.addListener('beforeRemove', (e) => {
            e.preventDefault();
            MobileCaching.getItem('fromSignout').then(response => {
                if (response) {
                    MobileCaching.setItem('fromSignout', null);
                    StackNavigator.dispatch(e.data.action)
                } else {
                    Alert.alert(
                        'Do you want to Sign out?',
                        'Stored credentials will be removed.',
                        [
                        { text: "Don't leave", style: 'cancel', onPress: () => {} },
                        {
                            text: 'Logout',
                            style: 'destructive',
                            onPress: () => {
                                MobileCaching.setItem('credentials', null);
                                StackNavigator.dispatch(e.data.action)
                            },
                        },
                        ]
                    );
                }
            });
        })
    },[StackNavigator, props]);

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

