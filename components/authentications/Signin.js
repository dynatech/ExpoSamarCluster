import React, { Fragment, useState } from 'react';
import { Image, StyleSheet, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Layout, Text, Input, Button} from '@ui-kitten/components';
import { ImageStyle } from '../../styles/image_style';
import { Formik } from 'formik';
// import SweetAlert from 'react-native-sweet-alert';
import CustomConfirm from '../utils/CustomConfirm';
import CustomLoading from '../utils/CustomLoading';

// comment for git push

const Signin = (props) => {
    const [displayConfirm, setDisplayConfirm] = useState(false);
    const [confirmStatus, setConfirmStatus] = useState("success");
    const [confirmDescription, setConfirmDescription] = useState({});
    const [userName, setUserName] = useState("");
    


    const onClickSignin = () => {

    }

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
                        setDisplayConfirm(true);
                        if (values.username != "" && values.password != "") {
                            setConfirmStatus("success");
                            setConfirmDescription({
                                title: 'Login Success!',
                                caption: 'Click OK to Proceed to Dashboard'
                            })
                            setUserName(values.username);
                         
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
                    if (stat === "success")
                        props.navigation.navigate('Drawer', {username: userName});

            }}/>
            {/* <CustomLoading loading={true} /> */}
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

