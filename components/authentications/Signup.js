import React, {Fragment, useState} from 'react';
import {StyleSheet, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import {Layout, Text, Input, Button} from '@ui-kitten/components';
import {Formik } from 'formik';
import CustomConfirm from '../utils/CustomConfirm';
import CustomLoading from '../utils/CustomLoading';
import ScreenHeader from '../utils/ScreenHeader';
import axios from 'axios';
import Config from "react-native-config";

const Signup = (props) => {

    const [displayConfirm, setDisplayConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [confirmStatus, setConfirmStatus] = useState("success");
    const [confirmDescription, setConfirmDescription] = useState({});
    const [signupData, setSignupData] = useState(null);

    const isNumber = (char) => {
        if (typeof char !== 'string') {
          return false;
        }
      
        if (char.trim() === '') {
          return false;
        }
      
        return !isNaN(char);
    }

    const isValidMobile = (mobile_no) => {
        if (mobile_no.substring(0, 2) == "09" && mobile_no.length == 11) {
            return true;
        } else {
            return false;
        }
    }

    return(
        <Layout style={styles.container} level='1' >
            <KeyboardAvoidingView style={{height: '100%'}}>
                <ScrollView>
                <Layout>
                    <ScreenHeader title="Sign up" />
                    <Layout>
                    <Formik
                        initialValues={{username: '', mobile_no: '', password: '', confirmPassword: ''}}
                        onSubmit={values => {
                            if (/\s/.test(values.username.trim()) != true && values.username != "") {
                                if (isValidMobile(values.mobile_no)) {
                                    if (values.password === values.confirmPassword) {
                                        setIsLoading(true);
                                        setTimeout(()=> {
                                            axios.post(`${Config.API_URL}/api/validate_username`, {username: values.username}).then((response) => {
                                                if (response.data.status) {
                                                    setIsLoading(false);
                                                    props.navigation.navigate('ProfileSettings', {...values, isSignup: true});
                                                } else {
                                                    setIsLoading(false);
                                                    setConfirmStatus("fail");
                                                    setConfirmDescription({
                                                        title: 'Sign up failed',
                                                        caption: response.data.message
                                                    })
                                                    setDisplayConfirm(true);
                                                }
                                                setIsLoading(false);
                                            }).catch((error) => {
                                                setIsLoading(false);
                                                setConfirmStatus("fail");
                                                setConfirmDescription({
                                                    title: 'Sign up failed',
                                                    caption: 'Invalid API Request. Please contact the developers.'
                                                })
                                                setDisplayConfirm(true);
                                            });
                                        }, 4000);
                                        
                                    } else {
                                        setConfirmStatus("fail");
                                        setConfirmDescription({
                                            title: 'Sign up failed',
                                            caption: 'Mismatched password'
                                        })
                                        setDisplayConfirm(true);
                                    }
                                } else {
                                    setConfirmStatus("fail");
                                    setConfirmDescription({
                                        title: 'Sign up failed',
                                        caption: 'Invalid Mobile Number'
                                    })
                                    setDisplayConfirm(true); 
                                }
                            } else {
                                setConfirmStatus("fail");
                                setConfirmDescription({
                                    title: 'Sign up failed',
                                    caption: 'Invalid Username'
                                })
                                setDisplayConfirm(true);
                            }
                        }}
                    >
                        {({ handleChange, handleSubmit, values }) => (
                            <Fragment>
                                <Layout style={styles.container}>
                                    <View>
                                        <Input
                                            style={styles.input}
                                            placeholder='Username'
                                            values={values.username}
                                            label={evaProps => <Text {...evaProps}>Username</Text>}
                                            caption={evaProps => <Text {...evaProps}>Ang password ay dapat buoin ng mga letra at numero na hindi bababa sa 8 titik at hindi lalampas sa 14</Text>}
                                            onChangeText={handleChange('username')}
                                        />
                                        <Input
                                            style={styles.input}
                                            placeholder='09xxxxxxxxx'
                                            maxLength={11}
                                            values={values.mobile_no}
                                            keyboardType={'number-pad'}
                                            label={evaProps => <Text {...evaProps}>Mobile Number</Text>}
                                            onChangeText={handleChange('mobile_no')}
                                        />
                                        <Input
                                            style={styles.input}
                                            placeholder='Enter Password'
                                            secureTextEntry={true}
                                            values={values.password}
                                            label={evaProps => <Text {...evaProps}>Password</Text>}
                                            onChangeText={handleChange('password')}
                                        />
                                        <Input
                                            style={styles.input}
                                            placeholder='Confirm Password'
                                            secureTextEntry={true}
                                            values={values.confirmPassword}
                                            label={evaProps => <Text {...evaProps}>Ulitin ang password </Text>}
                                            onChangeText={handleChange('confirmPassword')}
                                        />
                                    </View>
                                </Layout>
                                <Layout style={styles.button}>
                                    <Button status="info" onPress={handleSubmit}>Gumawa ng account</Button>
                                </Layout>
                            </Fragment>
                        )}
                    </Formik>
                    </Layout>
                </Layout>
                </ScrollView>
            </KeyboardAvoidingView>
            <CustomLoading loading={isLoading} />
            <CustomConfirm 
                title={confirmDescription.title}
                caption={confirmDescription.caption}
                displayConfirm={displayConfirm}
                confirmStatus={confirmStatus}
                setDisplayConfirm={setDisplayConfirm}
                callback={(stat)=> {
                    setDisplayConfirm(false);
                    if (stat === "success") {
                        props.navigation.navigate('ProfileSettings', signupData);
                    }
                }}
            /> 
        </Layout>
    )
}

export default Signup;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      margin: 0,
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
        padding: 15,
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
        marginTop: 20,
        paddingRight: 50,
        paddingLeft: 50,
        width: '100%',
    }
});