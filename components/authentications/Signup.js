import React, {Fragment, useState} from 'react';
import {StyleSheet, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import {Layout, Text, Input, Button} from '@ui-kitten/components';
import {Formik } from 'formik';
import CustomConfirm from '../utils/CustomConfirm';
import ScreenHeader from '../utils/ScreenHeader';


const Signup = (props) => {

    const [displayConfirm, setDisplayConfirm] = useState(false);
    const [confirmStatus, setConfirmStatus] = useState("success");
    const [confirmDescription, setConfirmDescription] = useState({});
    const [signupData, setSignupData] = useState(null);


    return(
        <Layout style={styles.container} level='1' >
            <KeyboardAvoidingView style={{height: '100%'}}>
                <ScrollView>
                <Layout>
                    <ScreenHeader title="Sign up" />
                    <Layout>
                    <Formik
                        initialValues={{username: '', email: '', password: '', confirmPassword: ''}}
                        onSubmit={values => {
                            const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                            if (re.test(values.email)) {
                                if (/\s/.test(values.username.trim()) != true) {
                                    if (values.password === values.confirmPassword) {
                                        setConfirmStatus("success");
                                        setConfirmDescription({
                                            title: 'Sign up Success!',
                                            caption: 'Proceed to Profile Creation'
                                        })
                                        setSignupData({...values})
                                    } else {
                                        setConfirmStatus("fail");
                                        setConfirmDescription({
                                            title: 'Sign up failed',
                                            caption: 'Mismatched password'
                                        })
                                    }
                                } else {
                                    setConfirmStatus("fail");
                                    setConfirmDescription({
                                        title: 'Sign up failed',
                                        caption: 'Invalid Username'
                                    })
                                }
                            } else {
                                setConfirmStatus("fail");
                                setConfirmDescription({
                                    title: 'Sign up failed',
                                    caption: 'Invalid Email Address'
                                })
                            }

                            setDisplayConfirm(true);
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
                                            // caption={evaProps => <Text {...evaProps}>Required</Text>}
                                            onChangeText={handleChange('username')}
                                        />
                                        <Input
                                            style={styles.input}
                                            placeholder='Email'
                                            values={values.email}
                                            label={evaProps => <Text {...evaProps}>Email</Text>}
                                            onChangeText={handleChange('email')}
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
                                            label={evaProps => <Text {...evaProps}>Confirm Password</Text>}
                                            onChangeText={handleChange('confirmPassword')}
                                        />
                                    </View>
                                </Layout>
                                <Layout style={styles.button}>
                                    <Button status="info" onPress={handleSubmit}>Sign Up</Button>
                                </Layout>
                            </Fragment>
                        )}
                    </Formik>
                    </Layout>
                </Layout>
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