import React, { Fragment } from 'react';
import { Modal, View } from "react-native";
import { Text, Button, Icon } from '@ui-kitten/components';

const CustomConfirm = (props) => {
    const {title, caption, displayConfirm, confirmStatus, setDisplayConfirm, callback, withCancel } = props;

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={displayConfirm}
            onRequestClose={() => {
                setDisplayConfirm(!displayConfirm);
            }}
        >
            <View style={{flex: 1, textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{width: 300, height: 300, backgroundColor: '#16526D', borderRadius: 15, justifyContent: 'center', borderColor: 'white', borderWidth: 5}}>
                    <View style={{padding: 5}}>
                        <Text style={{textAlign: 'center', fontSize: 30, flexWrap: 'wrap'}} category='h1'>{title}</Text>
                        <Text style={{textAlign: 'center', fontSize: 75}} category='h1'>
                            {
                                confirmStatus == "success" &&
                                <Icon
                                    style={{
                                        width: 75,
                                        height: 75,
                                    }}
                                    fill='#8DDC73'
                                    name='checkmark-circle-2-outline'
                                />
                            }

                            {
                                confirmStatus == "fail" &&
                                <Icon
                                    style={{
                                        width: 75,
                                        height: 75,
                                    }}
                                    fill='#DE6C66'
                                    name='close-circle-outline'
                                />
                            }

                            {
                                confirmStatus == "notify" &&
                                <Icon
                                    style={{
                                        width: 75,
                                        height: 75,
                                    }}
                                    fill='#E08967'
                                    name='alert-circle-outline'
                                />
                            }
                        </Text>
                        <Text style={{textAlign: 'center'}} category='p1'>{caption}</Text>
                    </View>
                    <View style={{paddingTop: 20,paddingRight: 20 ,paddingLeft: 20, paddingBottom: 5, flexDirection: 'row'}}>
                        {withCancel == true ? 
                        <Fragment>
                            <Button status="info" style={{width: '45%', marginRight: 15}} onPress={()=> {callback(confirmStatus)}}>
                                OK
                            </Button>
                            <Button status="basic" style={{width: '45%', marginRight: 15}} onPress={()=> { setDisplayConfirm(false) }}>
                                Cancel
                            </Button>
                        </Fragment> : 
                        <Button status="basic" style={{width: '100%'}} onPress={()=> {callback(confirmStatus)}}>
                            OK
                        </Button>}

                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default CustomConfirm;