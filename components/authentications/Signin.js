import React, { Fragment, useState, useEffect } from 'react';
import { Image, StyleSheet, View, ScrollView, KeyboardAvoidingView, PermissionsAndroid } from 'react-native';
import { Layout, Text, Input, Button} from '@ui-kitten/components';
import { ImageStyle } from '../../styles/image_style';
import { Formik } from 'formik';
import CustomConfirm from '../utils/CustomConfirm';
import CustomLoading from '../utils/CustomLoading';
import MobileCaching from '../utils/MobileCaching';
import axios from 'axios';
import Config from 'react-native-config';

const Signin = (props) => {
    const StackNavigator = props.navigation;

    const [displayConfirm, setDisplayConfirm] = useState(false);
    const [confirmStatus, setConfirmStatus] = useState("success");
    const [confirmDescription, setConfirmDescription] = useState({});
    const [userName, setUserName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const onClickSignin = () => {

    }

    useEffect(() => {
        MobileCaching.getItem('credentials').then(response => {
            if (response) {
                props.navigation.navigate('Drawer');
            }
        });
    }, [props]);

    useEffect(()=> {
        MobileCaching.getItem('allowed').then(response => {
            if (response == null || response == true) {
                e.preventDefault();
            } else {
                StackNavigator.dispatch(e.data.action)
            }
        });
    },[StackNavigator]);

    return(
        <Layout style={styles.container} level='1'>
            <KeyboardAvoidingView
                style={{height: '100%'}}
            >
            <ScrollView>
                <Layout style={styles.layout}>
                    <Image style={ImageStyle.seal} source={require('../../assets/dost_seal_contrast.png')}></Image>
                    <Image style={ImageStyle.seal} source={require('../../assets/dynaslope_seal_contrast.png')}></Image>
                    <Image style={ImageStyle.seal} source={require('../../assets/dynaslope_seal_contrast.png')}></Image>
                    <Image style={ImageStyle.seal} source={require('../../assets/dynaslope_seal_contrast.png')}></Image>
                    <Image style={ImageStyle.seal} source={require('../../assets/dynaslope_seal_contrast.png')}></Image>
                    <Image style={ImageStyle.seal} source={require('../../assets/dynaslope_seal_contrast.png')}></Image>
                </Layout>
                <Layout style={[styles.container, {paddingTop: 25}]}>
                    <View>
                        <Text style={styles.text} category='h1'>COMMUNITY-BASED EARLY WARNING SYSTEM FOR LANDSLIDES</Text>
                    </View>
                    <View>
                        <Text style={styles.text} category='p1'>Brgy. Lipata, Paranas, Samar</Text>
                    </View>
                </Layout>
                <Formik
                    initialValues={{username: '', password: ''}}
                    onSubmit={values => {
                        setIsLoading(true);
                        if (values.username != "" && values.password != "") {
                            axios.post(`${Config.API_URL}/api/login`, {username: values.username, password: values.password}).then((response) => {
                                if (response.data.ok == true) {
                                    setIsLoading(false);
                                    MobileCaching.setItem('credentials', response.data);
                                    props.navigation.navigate('Drawer');
                                } else {
                                    setIsLoading(false);
                                    setConfirmStatus("fail");
                                    setConfirmDescription({
                                        title: 'Sign in failed',
                                        caption: response.data.message
                                    })
                                    setDisplayConfirm(true);
                                }
                            }).catch((error) => {
                                console.log(error);
                            });
                        }  else {
                            setConfirmStatus("fail");
                            setConfirmDescription({
                                title: 'Login Failed!',
                                caption: 'Incorrect username / password'
                            })
                        }
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <Fragment>
                            <Layout style={styles.container}>
                                <View>
                                    <Input
                                        style={styles.input}
                                        placeholder='E.g. Juan Delacruz'
                                        values={values.username}
                                        label={evaProps => <Text {...evaProps}>Username</Text>}
                                        caption={evaProps => <Text {...evaProps}>Required</Text>}
                                        onChangeText={handleChange('username')}
                                    />
                                </View>
                                <View>
                                    <Input
                                        style={styles.input}
                                        placeholder='*****************'
                                        secureTextEntry={true}
                                        values={values.password}
                                        label={evaProps => <Text {...evaProps}>Password</Text>}
                                        caption={evaProps => <Text {...evaProps}>Required</Text>}
                                        onChangeText={handleChange('password')}
                                    />
                                </View>
                            </Layout>
                            <Layout style={styles.buttonGroup}>
                                <Button style={styles.button} status="info" onPress={handleSubmit}>Log In</Button>
                                <Button style={styles.button} onPress={()=> {props.navigation.navigate('ForgotPassword');}}>Forgot Password?</Button>
                                <Button style={styles.button} onPress={()=> {props.navigation.navigate('Signup');}}>Waray pa account? Register didi!</Button>
                            </Layout>
                        </Fragment>
                    )}
                </Formik>
            </ScrollView>
            </KeyboardAvoidingView>
            <CustomConfirm 
                title={confirmDescription.title}
                caption={confirmDescription.caption}
                displayConfirm={displayConfirm}
                confirmStatus={confirmStatus}
                setDisplayConfirm={setDisplayConfirm}
                callback={(stat)=> {
                    setDisplayConfirm(false);
                    setTimeout(()=> {
                        if (stat === "success")
                            props.navigation.navigate('Drawer');
                    }, 3000);
                }}
            />
            <CustomLoading loading={isLoading} />
        </Layout>
    )
}

export default Signin;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10
    },
    layout: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
        textAlign: 'center',
        fontSize: 25
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

