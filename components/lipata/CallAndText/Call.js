import React, { Fragment, useState } from 'react';
import { StyleSheet, Dimensions, Linking, View } from 'react-native';
import { Layout, Button, Divider, List, ListItem, Icon, Input, Text, Modal, Card, Select, SelectItem,} from '@ui-kitten/components';
import ScreenHeader from '../../utils/ScreenHeader';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const Call = (props) => {
    const [isDialPadOpen, setDialPadOpen] = useState(false);
    const [mobileNumber, setMobileNumber] = useState("");
    const [showContactDetail, setShowContactDetail] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [tempName, setTempName] = useState(null); // For testing purposes only

    const data = new Array(14).fill({
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
            <TouchableOpacity style={{width: '100%', padding: 10}} onPress={()=> {
                setIsUpdate(true);
                setShowContactDetail(true);
                setTempName(`${item.name} ${index + 1}`)
            }}>
                <Layout>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                        {`${item.name} ${index + 1}`}
                    </Text>
                </Layout>
                <Layout>
                    <Text category="c1">
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

const AddContactIcon = (props) => {
    return <Icon name="person-add-outline" {...props} onPress={()=> {}}/>
}

const CallIcon = (props) => {
    return <Icon name="phone-call-outline" {...props} onPress={()=> {}}/>
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
            <Button key={index+1} style={styles.dial_key} onPress={()=> {
                if (mobileNumber.length < 12) {
                    setMobileNumber(`${mobileNumber}${index+1}`);
                }
            }}>
                <Text style={styles.dial_key}>{index + 1}</Text>
            </Button>
        )
    })
    key_pad.push(<Button key="add" status="warning" style={[styles.dial_key]} accessoryLeft={AddContactIcon} onPress={()=> {
        if (mobileNumber.length >= 7) {
            setIsUpdate(false)
            setShowContactDetail(true)
            setTempName("NEW")
        }
    }}></Button>)
    key_pad.push(<Button key="0" style={styles.dial_key} onPress={()=> {
        setMobileNumber(`${mobileNumber}0`);
    }}><Text style={styles.dial_key}>0</Text></Button>)
    key_pad.push(<Button key="dial-call" style={[styles.dial_key, {backgroundColor: '#17b942'}]} onPress={()=> {
        Linking.openURL(`tel:${mobileNumber}`)
    }} accessoryLeft={CallIcon}>
    </Button>)
    let return_value = [
        <Layout style={styles.dial_format}>
            {key_pad}
        </Layout>
    ]
    return return_value;
}

export default Call;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    layout: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    dialpad_layout: {
        flex: 0.15,
    },
    contact_list_layout: {
        flex: 0.85,
    },
    contact_list: {
        width: SCREEN_WIDTH - 40,
        maxHeight: SCREEN_HEIGHT - 20,
    },
    dial_key: {
        width: 75,
        height: 75,
        borderRadius: 50,
        margin: 10,
    },
    dial_format: {
        flex: 0.85,
        width: '79%',
        textAlign: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 25
    },
    ts: {
        fontSize: 15
    },
    input: {
        padding: 20,
        margin: 0,
        textAlign: 'center',
        width: '100%'
    },
    buttonGroup: {
        paddingRight: 50,
        paddingLeft: 50,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});