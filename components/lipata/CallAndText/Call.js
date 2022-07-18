import React, { Fragment, useState } from 'react';
import { StyleSheet, Dimensions, Linking, View, TouchableOpacity } from 'react-native';
import { Layout, Button, Divider, List, ListItem, Icon, Input, Text, Modal, Card, Select, SelectItem,} from '@ui-kitten/components';
import ScreenHeader from '../../utils/ScreenHeader';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const Call = (props) => {
    const [isDialPadOpen, setDialPadOpen] = useState(false);
    const [mobileNumber, setMobileNumber] = useState("");
    const [showContactDetail, setShowContactDetail] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [tempName, setTempName] = useState(null); // For testing purposes only

    const data = new Array(20).fill({
        name: 'Mang boy',
        mobile_no: '+(63) 9123456789',
    });

    const DialIcon = (props) => {
        let return_value = [];
        if (mobileNumber.length != 0) {
            return_value = [
                <Icon key="backspace" name="backspace-outline" {...props} onPress={()=> eraseLast()}/>,
                <Icon key="keypad" name="keypad-outline" {...props} onPress={()=> {setDialPadOpen(!isDialPadOpen)}}/>
            ]
        } else {
            return_value = [
                <Icon key="keypad" name="keypad-outline" {...props} onPress={()=> {setDialPadOpen(!isDialPadOpen)}}/>
            ]
        }
        return return_value;
    }

    const renderItem = ({ item, index }) => (
        <Layout level='1'>
            <TouchableOpacity style={{width: '100%', padding: 10}} key={`contact-${index}`} onPress={()=> {
                setIsUpdate(true);
                setShowContactDetail(true);
                setTempName(`${item.name} ${index + 1}`)
            }}>
                <Layout>
                    <Text style={styles.contact_list_name}>
                        {`${item.name} ${index + 1}`}
                    </Text>
                </Layout>
                <Layout>
                    <Text style={styles.contact_list_number}>
                        {`${item.name} ${index + 1}`}
                    </Text>
                </Layout>
            </TouchableOpacity>
        </Layout>
    );

    const eraseLast = () => {
        if (mobileNumber.length != 0) {
            setMobileNumber(`${mobileNumber.substring(0, mobileNumber.length - 1)}`)
        }
    }

    return(
        <Fragment>
            <ScreenHeader title="Call"/>
            <Layout style={styles.container} level='1'>
                <Layout style={styles.dialpad_layout}>
                    <Input
                        disabled
                        style={styles.input}
                        placeholder='E.g. (63)9123456789'
                        value={`${mobileNumber}`}
                        accessoryRight={DialIcon}
                        maxLength={11}
                        textStyle={{
                            fontSize: 50
                        }}
                        // onChangeText={handleChange('household_head')}
                        // onBlur={handleBlur('household_head')}
                    />
                </Layout>
                {
                    isDialPadOpen ? <DialPad setMobileNumber={setMobileNumber} 
                                        mobileNumber={mobileNumber} 
                                        setShowContactDetail={setShowContactDetail} 
                                        setIsUpdate={setIsUpdate} 
                                        setTempName={setTempName}/>
                    : 
                        <Layout style={styles.contact_list_layout}>
                            <List
                                style={styles.contact_list}
                                data={data}
                                ItemSeparatorComponent={Divider}
                                renderItem={renderItem}
                            />
                        </Layout>
                }
            </Layout>
            <Modal
                style={{width: '100%', height: '100%'}}
                visible={showContactDetail}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setShowContactDetail(false)}>
                <Card disabled={true} style={{flex: 1}}>
                    <Layout style={{flexDirection: 'row-reverse', marginBottom: 20}}>
                        <Icon name="close-circle-outline" {...{"style": {"height": 50, "tintColor": "#fff", "width": 50}}}
                                onPress={()=> setShowContactDetail(false)}/>
                    </Layout>
                    <View>
                        <Layout>
                            <Input
                                label={evaProps => <Text {...evaProps}>Firstname</Text>}
                                caption={evaProps => <Text {...evaProps}>Required</Text>}
                                style={styles.input}
                                placeholder='E.g. Juan'
                            />
                        </Layout>
                        <Layout>
                            <Input
                                label={evaProps => <Text {...evaProps}>Lastname</Text>}
                                caption={evaProps => <Text {...evaProps}>Required</Text>}
                                style={styles.input}
                                placeholder='E.g. Dela Cruz'
                            />
                        </Layout>
                        <Layout>
                            <Input
                                disabled
                                label={evaProps => <Text {...evaProps}>Mobile No.</Text>}
                                style={styles.input}
                                value={mobileNumber}
                                maxLength={11}
                            />
                        </Layout>
                        <Layout>
                            <Button status="info" style={{margin: 20}} accessoryLeft={AddContactIcon}>
                                <Text>{isUpdate === true ? "Save Contact" : "Update Contact"}</Text>
                            </Button>
                        </Layout>
                        <Layout>
                            <Button style={{margin: 20, backgroundColor: '#17b942'}} 
                                accessoryLeft={CallIcon} 
                                onPress={()=> Linking.openURL(`tel:${mobileNumber}`)}>
                                <Text>{`Call ${tempName}`}</Text>
                            </Button>
                        </Layout>
                        <Layout style={{flexDirection: 'row'}}>
                            <Button status="warning" style={{margin: 20, width: '38%'}} accessoryLeft={SMSIcon} onPress={()=> Linking.openURL(`sms:?addresses=${mobileNumber}&body=`)}>
                                <Text>{`via SMS`}</Text>
                            </Button>
                            <Button status="warning" style={{margin: 20, width: '38%'}} accessoryLeft={ChatIcon} onPress={()=> {
                                props.navigation.navigate('Text');
                                setShowContactDetail(false);
                            }}>
                                <Text>{`via Chat`}</Text>
                            </Button>
                        </Layout>
                    </View>
                </Card>
            </Modal>

        </Fragment>
    )
}

const AddContactIcon = () => {
    return <Icon name="person-add-outline" {...{"style": {"height": SCREEN_WIDTH * .11, "tintColor": "#fff", "width": SCREEN_WIDTH * .11}}} onPress={()=> {}}/>
}

const CallIcon = (props) => {
    return <Icon name="phone-call-outline" {...{"style": {"height": SCREEN_WIDTH * .09, "tintColor": "#fff", "width": SCREEN_WIDTH * .09}}} onPress={()=> {}}/>
}

const SMSIcon = (props) => {
    return <Icon name="message-square-outline" {...props} onPress={()=> {}}/>
}

const ChatIcon = (props) => {
    return <Icon name="message-circle-outline" {...props} onPress={()=> {}}/>
}

const DialPad = (props) => {
    const { setMobileNumber, mobileNumber, setShowContactDetail, setIsUpdate, setTempName } = props;

    const data = new Array(9).fill();
    let key_pad = [];
    data.forEach((element, index) => {
        key_pad.push(            
            <TouchableOpacity key={`numpad-${index+1}`} style={styles.dial_key} onPress={()=> {
                if (mobileNumber.length < 12) {
                    setMobileNumber(`${mobileNumber}${index+1}`);
                }
            }}>
                <View style={styles.dialpad_button}>
                    <Text style={styles.text} key={`numkey-${index}`}>{index + 1}</Text>
                </View>
            </TouchableOpacity>
        )
    })
    key_pad.push(

        <TouchableOpacity key="dial-addContact" style={styles.dial_key} onPress={()=> {
            if (mobileNumber.length >= 7) {
                setIsUpdate(false)
                setShowContactDetail(true)
                setTempName("NEW")
            }
        }}>
            <View style={[styles.dialpad_button_symbol, {backgroundColor: '#DBA400'}]}> 
                <AddContactIcon key="dialkey-addContact"/>
            </View>

        </TouchableOpacity>
    )
        
    key_pad.push(
        <TouchableOpacity key="0" style={styles.dial_key} 
            onPress={()=> {
                setMobileNumber(`${mobileNumber}0`);
            }}>
            <View style={styles.dialpad_button}>
                    <Text style={styles.text} key="key-0">0</Text>
            </View>
        </TouchableOpacity>
    )
    
    key_pad.push(

        <TouchableOpacity key="dial-call" style={styles.dial_key} onPress={()=> {
            Linking.openURL(`tel:${mobileNumber}`)
        }}>
            <View style={[styles.dialpad_button_symbol, {backgroundColor: '#17b942'}]}> 
                <CallIcon key="dialkey-call"/>
            </View>

        </TouchableOpacity>
    )
    
    let return_value = [
        <Layout style={styles.dial_format} key="dialpad container">
            {key_pad}
        </Layout>
    ]
    return return_value;
}

export default Call;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        padding: SCREEN_WIDTH * .02,
        width: '100%',
    },
    layout: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    dialpad_layout: {
        // flex: 1,
        
    },
    contact_list_layout: {
        flex: 1,
    },
    contact_list: {

    },
    contact_list_name: {
        // fontSize: SCREEN_HEIGHT * .025,
        fontSize: 20,
        fontWeight: 'bold'
    },
    contact_list_number: {
        // fontSize: SCREEN_HEIGHT * .017
        fontSize: 15
    },
    dial_key: {
        width: SCREEN_WIDTH * .2,
        height: SCREEN_WIDTH * .2,
        borderRadius: 100,
        margin: '2%',
        backgroundColor: '#181f34',
    },
    dialpad_button: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        height: '100%', 
        width: '100%'
    },
    dialpad_button_symbol: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    dial_format: {
        flex: 1,
        width: '85%',
        height: '80%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        paddingTop: SCREEN_HEIGHT * .05,
    },
    text: {
        fontSize: SCREEN_WIDTH * .07,
        alignSelf: 'center'
    },
    text_symbol: {

    },
    ts: {
        fontSize: 15
    },
    input: {
        padding: 20,
        margin: 0,
        textAlign: 'center',
        width: '100%',
    },
    buttonGroup: {
        paddingRight: 50,
        paddingLeft: 50,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});