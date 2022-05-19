import React, {Fragment, useState} from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Layout, Text, Input, Button} from '@ui-kitten/components';
import { Formik } from 'formik';
import CustomConfirm from '../utils/CustomConfirm';
import ScreenHeader from '../utils/ScreenHeader';

const ForgotPassword = (props) => {

    
    const [displayConfirm, setDisplayConfirm] = useState(false);
    const [confirmStatus, setConfirmStatus] = useState("success");
    const [confirmDescription, setConfirmDescription] = useState({});
    
    const ResendCode = () => {
        return(
            console.log("Pressed")

        )
    }

    const RequestCode = () => {
            return (
                <Formik
                        initialValues={{givenDetails: ''}}
                        onSubmit={values => {
                            setDisplayConfirm(true);
                            if (values.givenDetails != "" ) {
                                setConfirmStatus("success");
                                setConfirmDescription({
                                    title: 'Code Sent!',
                                    caption: 'Check your email or phone for the code'
                                })
                            }  else {
                                setConfirmStatus("fail");
                                setConfirmDescription({
                                    title: 'Incorrect User details',
                                    caption: 'Input username or mobile number'
                                })
                            }
                            
                        }}
                    >
                        {({ handleChange, handleSubmit, values }) => (
                            <Fragment>
                                <Layout style={styles.container}>
                                    <View>
                                        <Input
                                            style={styles.input}
                                            placeholder='Username or Mobile number'
                                            values={values.givenDetails}
                                            label={evaProps => <Text {...evaProps}>Input details</Text>}
                                            caption={evaProps => <Text {...evaProps}>We will send you a verification code to set or reset your new password. Carrier rates may apply.</Text>}
                                            onChangeText={handleChange('givenDetails')}
                                        />
                                    </View>
                                </Layout>
                                <Layout style={styles.button}>
                                    <Button status="info" onPress={handleSubmit}>Request OTP Code</Button>
                                </Layout>
                            </Fragment>
                        )}
                </Formik>
            )
            }
    
    const VerifyOtp = () => {
            return(
                <Fragment>
                    <View>
                        <Input
                            style={styles.input}
                            placeholder='XXXX'
                            // value={OtpCode}
                            label={evaProps => <Text {...evaProps}>OTP Code</Text>}
                            caption={evaProps => <Text {...evaProps}>Required</Text>}
                            // onChangeText={value => setOtpCode(value)}
                            />
                        <Input
                            style={styles.input}
                            placeholder='******'
                            secureTextEntry={true}
                            label={evaProps => <Text {...evaProps}>New Password</Text>}
                            caption={evaProps => <Text {...evaProps}>Required</Text>}
                            />
                        <Input
                            style={styles.input}
                            placeholder='******'
                            secureTextEntry={true}
                            label={evaProps => <Text {...evaProps}>Confirm New Password</Text>}
                            caption={evaProps => <Text {...evaProps}>Required</Text>}
                            />
                        <Text style={[styles.input, styles.link]} onPress={() => {
                            
                        }}>Did not receive OTP? Resend.</Text>
                        <Layout style={styles.button}>
                            <Button status="info" onPress={() => ("")}>Submit</Button>
                        </Layout> 
                    </View>
                </Fragment> 
                )
            }
    
    return (
            <Layout style={styles.container} level='1'>
            <KeyboardAvoidingView style={{height: '100%'}}>
            <ScrollView>
                <ScreenHeader title="Forgot Password?"/>   
                {confirmDescription.title === 'Code Sent!' ?
                    <VerifyOtp />
                    :
                    <RequestCode />            
                }
             </ScrollView>
             </KeyboardAvoidingView>
            <CustomConfirm 
                title={confirmDescription.title}
                caption={confirmDescription.caption}
                displayConfirm={displayConfirm}
                confirmStatus={confirmStatus}
                setDisplayConfirm={setDisplayConfirm}
                callback={()=> {
                //  console.log();
                 setDisplayConfirm(false);}}
             /> 
             </Layout>          
    )
    }
    

export default ForgotPassword;

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
        padding: 10,
        margin: 5,
        textAlign: 'center'
    },
    link: {
        fontStyle: 'italic',
        textDecorationLine: 'underline',
        color: '#F8991D'
    },
    inputGroup: {
        padding: 20,
        margin: 20,
        textAlign: 'center'
    },
    button: {
        marginTop : 30,
        paddingRight: 30,
        paddingLeft: 30,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },

});