import React, {Fragment, useState} from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Layout, Text, Input, Button, Icon, Tooltip } from '@ui-kitten/components';
import { Formik } from 'formik';
import CustomConfirm from '../utils/CustomConfirm';
import ScreenHeader from '../utils/ScreenHeader';

const ForgotPassword = (props) => {

    
    const [displayConfirm, setDisplayConfirm] = useState(false);
    const [confirmStatus, setConfirmStatus] = useState("success");
    const [confirmDescription, setConfirmDescription] = useState({});
    const [visible, setVisible] = useState(false);
    
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
                                    caption: 'We sent an OTP on your registered mobile number'
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
                                            caption={evaProps => <Text {...evaProps}>Magpapadala ng code sa iyong mobile number para maireset ang inyong password.</Text>}
                                            onChangeText={handleChange('givenDetails')}
                                        />
                                    </View>
                                </Layout>
                                <Layout style={styles.button}>
                                    <Button status="info" onPress={handleSubmit}>Manghingi ng code</Button>
                                </Layout>
                            </Fragment>
                        )}
                </Formik>
            )
            }
    

    const renderToggleButton = (evaProps) => (
        <View style={{flexDirection: 'row'}}>
            <Text {...evaProps}>OTP Code  </Text>
            <Icon name='question-mark-circle-outline' fill='#8994ad' width={17} height={17} onPress={() => setVisible(true)}/>
        </View>

    );
    const VerifyOtp = () => {
            return(
                <Fragment>
                    <View>
                        <Input
                            style={styles.input}
                            placeholder='XXXX'
                            // value={OtpCode}
                            label={evaProps =>                                             
                                <Tooltip
                                    anchor={()=> renderToggleButton({...evaProps})}
                                    visible={visible}
                                    onBackdropPress={() => setVisible(false)}
                                    placement={'top start'}>
                                    Isulat ang code na natanggap sa iyong mobile number
                                </Tooltip>}
                            caption={evaProps => <Text {...evaProps}>Required</Text>}
                            // onChangeText={value => setOtpCode(value)}
                            />
                        <Input
                            style={styles.input}
                            placeholder='******'
                            secureTextEntry={true}
                            label={evaProps => <Text {...evaProps}>Bagong password</Text>}
                            caption={evaProps => <Text {...evaProps}>Required</Text>}
                            />
                        <Input
                            style={styles.input}
                            placeholder='******'
                            secureTextEntry={true}
                            label={evaProps => <Text {...evaProps}>Ulitin ang bagong password</Text>}
                            caption={evaProps => <Text {...evaProps}>Required</Text>}
                            />
                        <Text style={[styles.input, styles.link]} onPress={() => {
                            
                        }}>Di natanggap ang code? Magpadala ulit.</Text>
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
                <ScreenHeader title="Nakalimutan ang iyong password?"/>   
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