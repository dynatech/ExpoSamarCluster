import React, { Fragment, useState, useRef } from 'react';
import { StyleSheet, Dimensions, View, Keyboard, Linking } from 'react-native';
import { Layout, Text, Input, Icon, List, ListItem, Divider } from '@ui-kitten/components';
import ScreenHeader from '../../utils/ScreenHeader';
import moment from 'moment';
import { setIn } from 'formik';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const data = [
    {
        source: 'Mang boy',
        mobile_no: '09296770345',
        content: 'Hi kamusta po kayo?',
        ts: moment().format("YYYY-MM-DD hh:mm:ss A")
    },
    {
        source: 'You',
        mobile_no: '09605673306',
        content: 'Okay lang po! Kayo po ba?',
        ts: moment().format("YYYY-MM-DD hh:mm:ss A")
    },
]
const ThreadHeaderIcons = (props) => {
    return [
        <Icon key={'search'} name="search-outline" {...props} onPress={()=> {}}/>,
        <Icon key={'call'} name="phone-call-outline" {...props}  onPress={()=> Linking.openURL(`tel:`)}/>,
        <Icon key={'message'} name="message-square-outline" {...props} onPress={()=> {Linking.openURL(`sms:?addresses=&body=`)}}/>
    ]
}

const Messenger = () => {
    const [conversation, setConversation] = useState(data);
    const [message, setMessage] = useState(null);
    const [isInboxView, setInboxView] = useState(true);

    const ListRef = useRef();

    const inboxData = new Array(14).fill({
        name: 'Mang boy',
        mobile_no: '+(63) 9123456789',
        message: 'Kamusta po kayo jan?',
        ts: moment().format("YYYY-MM-DD HH:mm:ss")
    });


    const renderItem = ({item, index}) => {
        return(
            item.source != "You" ?
            <View style={{alignItems: 'flex-start'}} key={`outgoing-${index}`}>
                <View style={{ backgroundColor: '#05B8FF', margin: 10, padding: 10, borderRadius: 20}} key={`v1-${index}`}>
                    <View>
                        <Text category="h6">{item.source}</Text>
                    </View>
                    <View>
                        <Text category="p1">{item.content}</Text>
                    </View>
                    <View>
                        <Text category="c1">{item.ts}</Text>
                    </View>
                </View>
            </View>
            :
            <View style={{alignItems: 'flex-end'}} key={`incoming-${index}`}>
                <View style={{ backgroundColor: '#17b942', margin: 10, padding: 10, borderRadius: 20}} key={`v1-${index}`}>
                    <View>
                        <Text category="h6" style={{textAlign: 'right'}}>{item.source}</Text>
                    </View>
                    <View>
                        <Text category="p1" style={{textAlign: 'right'}}>{item.content}</Text>
                    </View>
                    <View>
                        <Text category="c1" style={{textAlign: 'right'}}>{item.ts}</Text>
                    </View>
                </View>
            </View>
        )
    }

    const renderInbox = ({ item, index }) => (
        <ListItem
            key={index}
            title={
                <View style={{flexDirection: 'column'}}>
                    <Text>{`${item.name} ${index + 1}`}</Text>
                    <Text category="p2">{`${item.mobile_no}`}</Text>
                    <Text category="p1">{`${item.message}`}</Text>
                </View>
            }
            description={`${item.ts}`}
            onPress={()=> {
                setInboxView(false);    
            }}
        />
    );


    const SendIcon = (message, setMessage, setConversation, conversation) => {
        let temp = [...conversation];
        return <Icon name="navigation-outline" 
        {...{"style": {"height": 24, "marginHorizontal": 8, "tintColor": "#8f9bb3", "width": 24, transform: [{ rotate: "90deg" }]}}}
        onPress={()=> {
            console.log("HEY")
            temp.push({
                source: 'You',
                mobile_no: '09605673306',
                content: message,
                ts: moment().format("YYYY-MM-DD hh:mm:ss A")
            })
            setConversation(temp);
            setMessage("");
            Keyboard.dismiss();
            ListRef.current.scrollToEnd();
        }}/>
    }

    const AttachIcon = (props) => {
        return <Icon name="attach-2-outline" {...props} onPress={()=> {}}/>
    }

    return(
        <Fragment>
            <ScreenHeader title="Messenger"/>
            {
                isInboxView ? 
                    <Layout style={styles.container} level='1'>
                        <Layout style={styles.inbox_list_layout}>
                            <List
                                style={styles.inbox_list}
                                data={inboxData}
                                ItemSeparatorComponent={Divider}
                                renderItem={renderInbox}
                            />
                        </Layout>
                    </Layout>
                :
                <Layout style={styles.container} level='1'>
                    <Layout style={styles.recipient_section}>
                        <Input
                            disabled
                            style={[styles.input, {maxWidth: SCREEN_WIDTH - 20, minWidth: SCREEN_WIDTH - 20}]}
                            placeholder='E.g. (63)9123456789'
                            // value={`${mobileNumber}`}
                            accessoryRight={ThreadHeaderIcons}
                            maxLength={11}
                            // onChangeText={handleChange('household_head')}
                            // onBlur={handleBlur('household_head')}
                        />
                    </Layout>
                    <Layout style={styles.thread_section}>
                        <List
                            ref={ListRef}
                            style={styles.message_content}
                            data={conversation}
                            renderItem={renderItem}
                        />
                    </Layout>
                    <Layout style={[styles.command_section, {flexDirection: 'column-reverse'}]}>
                        <Input
                            multiline
                            style={[{maxWidth: SCREEN_WIDTH - 20, minWidth: SCREEN_WIDTH - 20, paddingLeft: 10, paddingRight: 10, }]}
                            textStyle={{ justifyContent: 'center', padding: 10, maxHeight: 100}}
                            placeholder='E.g. (63)9123456789'
                            value={message}
                            accessoryRight={()=> SendIcon(message, setMessage, setConversation, conversation)}
                            accessoryLeft={AttachIcon}
                            onChangeText={(e)=> setMessage(e)}
                            // onBlur={handleBlur('household_head')}
                        />
                    </Layout>
                </Layout>
            }
        </Fragment>
    )
}

export default Messenger;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    recipient_section: {
        flex: 0.10
    },
    thread_section: {
        flex: 0.70,
    },
    message_content: {
        width: SCREEN_WIDTH - 40,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    command_section: {
        flex: 0.20
    },
    layout: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    text: {
        fontSize: 25
    },
    ts: {
        fontSize: 15
    },
    input: {
        padding: 5,
        margin: 0,
        textAlign: 'center',
    },
    buttonGroup: {
        paddingRight: 50,
        paddingLeft: 50,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inbox_list_layout: {
        flex: 0.85,
    },
    inbox_list: {
        width: SCREEN_WIDTH - 40,
        maxHeight: SCREEN_HEIGHT - 20,
    },
});