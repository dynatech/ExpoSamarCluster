import React, { Fragment, useState, useEffect, useRef } from 'react';
import { StyleSheet, Dimensions, KeyboardAvoidingView, ScrollView, View} from 'react-native';
import { Layout, Input, Text, Card, Button, Icon, Modal, CheckBox, } from '@ui-kitten/components';
import ScreenHeader from '../../utils/ScreenHeader';
import uuid from 'react-native-uuid';
import ActionButton from 'react-native-action-button';
import { DataTable } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const optionsPerPage = [10, 30, 50];

const FamilyRiskProfile = () => {
    const [openCalendar, setOpenCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [scrollToIndex, setScrollToIndex] = useState(0);
    const [dataSourceCords, setDataSourceCords] = useState([]);
    const [ref, setRef] = useState(null);

    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
    const [profileMembers, setProfileMembers] = useState([
        {
            uid: uuid.v4(),
            household_id: '',
            household_head: '',
            gender: '',
            birthdate: '',
            buntis: false,
            kapansanan: false,
            misc: ''}
    ]);

    let profileMembers_ = useRef([
        {
            uid: uuid.v4(),
            household_id: '',
            household_head: '',
            gender: '',
            birthdate: '',
            buntis: false,
            kapansanan: false,
            misc: ''}
    ])

    const [member, setMember] = useState({});
    const [tempData, setTempData] = useState({});
    const [showDataTable, setShowDataTable] = useState(false);
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    useEffect(()=> {
        setPage(0);
    }, [itemsPerPage]);

    useEffect(()=> {
        console.log("dataSourceCords:", dataSourceCords);
    }, [dataSourceCords]);

    const AddIcon = () => (
        <Icon name='plus-square-outline' {...{"style": {"height": 20, "marginHorizontal": 10, "tintColor": "#fff", "width": 20}}} />
    );

    const SaveIcon = () => (
        <Icon name='save-outline' {...{"style": {"height": 20, "marginHorizontal": 10, "tintColor": "#fff", "width": 20}}} />
    );

    const DownloadIcon = () => (
        <Icon name='download-outline' {...{"style": {"height": 20, "marginHorizontal": 10, "tintColor": "#fff", "width": 20}}} />
    );

    const CalendarIcon = (props) => {
        return <Icon name="calendar-outline" {...props} onPress={()=> ToggleDateTimestamp()}/>
    }

    const ToggleDateTimestamp = () => {
        setOpenCalendar(!openCalendar);
    }

    const scrollHandler = (coords) => {
        if (coords) {
            ref.scrollTo({
                x: 0,
                y: coords[coords.length-1],
                animated: true,
              });
        } else {
            console.log(coords)
        }
      };
     

    const validateMember = (value, key, temp) => {
        let isValid = true;
        switch(key) {
            case "household_id":
                if (value.trim() != "") {
                    temp['household_id'] = value;
                } else {
                    isValid = false;
                }
                break;
            // case "risk_type":
            //     if (value.trim() != "") {
            //         temp['risk_type'] = value;
            //     } else {
            //         isValid = false;
            //     }
            //     break;
            case "household_head":
                if (value.trim() != "") {
                    temp['household_head'] = value;
                } else {
                    isValid = false;
                }
                break;
            case "household_member":
                if (value.trim() != "") {
                    temp['household_member'] = value;
                } else {
                    isValid = false;
                }
                break;
            case "gender":
                if (value.trim() != "") {
                    temp['gender'] = value;
                } else {
                    isValid = false;
                }
                break;
            // case "age":
            //     if (value.trim() != "") {
            //         temp['age'] = value;
            //     } else {
            //         isValid = false;
            //     }
            //     break;
            case "birthdate":
                temp['birthdate'] = moment(value).format("YYYY-MM-DD");
                break;
            case "misc":
                if (value.trim() != "") {
                    temp['misc'] = value;
                } else {
                    isValid = false;
                }
                break;
            default:
                isValid = false;
                break;
        }

        if (
            "household_id" in temp &&
            // "risk_type" in temp &&
            "gender" in temp &&
            // "age" in temp &&
            "birthdate" in temp &&
            "misc" in temp &&
            (
                "household_head" in temp || "household_member" in temp
            )
        ) {
            if (isValid) {
                let index = profileMembers_.current.findIndex(o => o.uid == temp.uid);
                profileMembers_.current[index] = temp;
            }
        }
    }

    const RenderPrimaryHouseholdInput = (props) => {
        const { index, head, member } = props;
        const uid = uuid.v4();
        let temp = { uid: profileMembers_.current[index] ? profileMembers_.current[index].uid : uid, buntis: false, kapansanan: true}

        return(
            <Card style={styles.card} key={uid}
                status={head ? 'primary' : 'warning'} 
                header={Header({type: head ? 1 : 2, uid: profileMembers_.current[index] ? profileMembers_.current[index] : uid, index: index})}>
                <Fragment>
                    <Layout style={styles.input_container}>
                    {
                            head ?
                                <View>
                                    <Input
                                        style={styles.input}
                                        placeholder='E.g. XXXYYYZZZ'
                                        value={temp['household_head']}
                                        defaultValue={member.household_head}
                                        label={evaProps => 
                                            <View style={{flexDirection: 'row'}}>
                                                <Text {...evaProps}>Household Head </Text>
                                                <Icon name='question-mark-circle-outline' fill='#8994ad' width={17} height={17} />
                                            </View>}
                                        caption={evaProps => <Text {...evaProps}>Required</Text>}
                                        onChangeText={(e)=> {
                                            validateMember(e, 'household_head', temp);
                                        }}
                                    />
                                </View>
                            :
                                <View>
                                    <Input
                                        style={styles.input}
                                        placeholder='E.g. XXXYYYZZZ'
                                        value={temp['household_member']}
                                        defaultValue={member.household_member}
                                        label={evaProps => <View style={{flexDirection: 'row'}}>
                                                <Text {...evaProps}>Household Member #{index}</Text>
                                                <Icon name='question-mark-circle-outline' fill='#8994ad' width={17} height={17} />
                                            </View>
                                        }
                                        caption={evaProps => <Text {...evaProps}>Required</Text>}
                                        onChangeText={(e)=> {
                                            validateMember(e, 'household_member', temp);
                                            
                                        }}
                                    />
                                </View>
                        }
                        <View>
                            <Input
                                style={styles.input}
                                placeholder='E.g. XXXYYYZZZ'
                                value={temp['household_id']}
                                defaultValue={member.household_id}
                                label={evaProps => <View style={{flexDirection: 'row'}}>
                                        <Text {...evaProps}>Household ID</Text>
                                        <Icon name='question-mark-circle-outline' fill='#8994ad' width={17} height={17} />
                                    </View>
                                }
                                caption={evaProps => <Text {...evaProps}>Required</Text>}
                                onChangeText={(e)=> {
                                    validateMember(e, 'household_id', temp)
                                }}
                            />
                        </View>
                        {/* <View>
                            <Input
                                style={styles.input}
                                placeholder='E.g. XXXYYYZZZ'
                                value={temp['risk_type']}
                                defaultValue={member.risk_type}
                                label={evaProps => <Text {...evaProps}>Risk Type</Text>}
                                caption={evaProps => <Text {...evaProps}>Required</Text>}
                                onChangeText={(e)=> {
                                    validateMember(e, 'risk_type', temp)
                                }}
                            />
                        </View> */}
                        <View>
                            <Input
                                style={styles.input}
                                placeholder='E.g. XXXYYYZZZ'
                                value={temp['gender']}
                                defaultValue={member.gender}
                                label={evaProps => <Text {...evaProps}>Kasarian</Text>}
                                caption={evaProps => <Text {...evaProps}>Required</Text>}
                                onChangeText={(e)=> {
                                    validateMember(e, 'gender', temp);
                                }}
                            />
                        </View>
                        {/* <View>
                            <Input
                                style={styles.input}
                                placeholder='E.g. XXXYYYZZZ'
                                value={temp['age']}
                                defaultValue={member.age}
                                label={evaProps => <Text {...evaProps}>Edad</Text>}
                                caption={evaProps => <Text {...evaProps}>Required</Text>}
                                onChangeText={(e)=> {
                                    validateMember(e, 'age', temp);
                                }}
                            />
                        </View> */}
                        <View>
                            <Input
                                style={styles.input}
                                placeholder='E.g. XXXYYYZZZ'
                                value={moment(selectedDate).format("YYYY-MM-DD")}
                                defaultValue={member.birthdate}
                                label={evaProps => <Text {...evaProps}>Kapanganakan</Text>}
                                caption={evaProps => <Text {...evaProps}>Required</Text>}
                                // accessoryRight={(e)=> {
                                //     let temp = CalendarIcon(e);
                                //     validateMember(selectedDate, 'birthdate', temp);
                                //     return temp;
                                // }}
                                onChangeText={(e)=> {
                                    validateMember(e, 'birthdate', temp);
                                }}
                            />
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <CheckBox
                                style={styles.checkbox}
                                checked={temp['buntis']}
                                onChange={nextChecked => {
                                    temp['buntis'] = nextChecked
                                    console.log(nextChecked)
                                } }>
                                Buntis
                            </CheckBox>
                            <CheckBox
                                style={styles.checkbox}
                                checked={temp['kapansanan']}
                                onChange={nextChecked => temp['kapansanan'] = nextChecked}>
                                May kapansanan
                            </CheckBox>
                        </View>
                        <View>
                            <Input
                                style={styles.input}
                                placeholder='E.g. XXXYYYZZZ'
                                value={temp['misc']}
                                defaultValue={member.misc}
                                label={evaProps => <Text {...evaProps}>Isaad ang kapansanan</Text>}
                                onChangeText={(e) => {
                                    validateMember(e, 'misc', temp);
                                }}
                            />
                        </View>
                    </Layout>
                </Fragment>
            </Card>
        )
    }

    const handleAdditionalMember = () => {
        let temp = [...profileMembers_.current];

        temp.push({
            uid: uuid.v4(),
            household_id: '',
            // risk_type: '',
            household_member: '',
            gender: '',
            // age: '',
            birthdate: '',
            buntis: false,
            kapansanan: false,
            misc: ''
        });
        profileMembers_.current = temp;
        setProfileMembers(temp)
    }

    const handleListSubmit = () => {
        console.log("handleListSubmit:", profileMembers);
    }

    const Header = (props) => (
        <View style={{}}>
            <Layout style={{width: '100%', flexDirection: 'row'}}>
                <Layout style={{ width: props.type && props.type == 1 ? '60%': '60%' }}>
                    <Text category='h6'>{props.type && props.type == 1 ? 'Household Head' : `Household Member #${props.index}`}</Text>
                    <Text category='s1'>{props.type && props.type == 1 ? 'Ulo ng Sambahayan' : 'Miyembro ng Sambahayan'}</Text>
                </Layout>
                {
                    props.type && props.type != 1 &&
                        <Layout style={{ width: '40%' }}>
                            <Button status="danger" onPress={()=> {
                                let temp = [...profileMembers];
                                temp.splice(temp.findIndex(x => x.uid === props.uid), 1);
                                setProfileMembers(temp)
                            }}>Remove</Button>
                        </Layout>
                }
            </Layout>
        </View>
    );
      
    // 1 - Primary, 2 - Additional household member
    return(
        <Fragment>
            <ScreenHeader title="Family Risk Profile"/>
            <Layout style={styles.container} level='1'>
                <KeyboardAvoidingView
                    style={{height: '100%'}}
                >   
                    <View>
                        <View style={{flexDirection: 'row', padding: 20}}>
                            <Icon name='question-mark-circle-outline' fill='#8994ad' width={25} height={25} onPress={() => setVisible(true)}/>
                            <Text style={{textAlign: 'center'}} category="h6" status="basic">Nakalista dito ang mga households na at-risk sa landslide</Text>
                        </View>
                        <ScrollView horizontal={true}>
                            <View style={{width: 600, backgroundColor: '#ffffff20'}}>
                                <DataTable>
                                    <DataTable.Header>
                                        <DataTable.Title ><Text style={{color: 'white'}}>ID #</Text></DataTable.Title>
                                        <DataTable.Title><Text style={{color: 'white'}}>Head</Text></DataTable.Title>
                                        <DataTable.Title><Text style={{color: 'white'}}>Risk type</Text></DataTable.Title>
                                        <DataTable.Title><Text style={{color: 'white'}}>Member count</Text></DataTable.Title>
                                        <DataTable.Title numeric><Text style={{color: 'white'}}>Action</Text></DataTable.Title>
                                    </DataTable.Header>
                                    <DataTable.Row>
                                        <DataTable.Cell><Text style={{color: 'white'}}>XYZ123</Text></DataTable.Cell>
                                        <DataTable.Cell><Text style={{color: 'white'}}>Sample Data</Text></DataTable.Cell>
                                        <DataTable.Cell><Text style={{color: 'white'}}>Sample Data</Text></DataTable.Cell>
                                        <DataTable.Cell><Text style={{color: 'white'}}>6.0</Text></DataTable.Cell>
                                        <DataTable.Cell numeric>
                                            <View style={{flexDirection: 'row'}}>
                                                <Icon name="edit-outline" {...{"style": {"height": 20, "marginHorizontal": 5, "tintColor": "#fff", "width": 25}}}/>
                                                <Icon name="trash-outline" {...{"style": {"height": 20, "marginHorizontal": 5, "tintColor": "#fff", "width": 25}}}/>
                                            </View>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                    <DataTable.Row>
                                        <DataTable.Cell><Text style={{color: 'white'}}>XYZ123</Text></DataTable.Cell>
                                        <DataTable.Cell><Text style={{color: 'white'}}>Sample Data</Text></DataTable.Cell>
                                        <DataTable.Cell><Text style={{color: 'white'}}>Sample Data</Text></DataTable.Cell>
                                        <DataTable.Cell><Text style={{color: 'white'}}>6.0</Text></DataTable.Cell>
                                        <DataTable.Cell numeric>
                                            <View style={{flexDirection: 'row'}}>
                                                <Icon name="edit-outline" {...{"style": {"height": 20, "marginHorizontal": 5, "tintColor": "#fff", "width": 25}}}/>
                                                <Icon name="trash-outline" {...{"style": {"height": 20, "marginHorizontal": 5, "tintColor": "#fff", "width": 25}}}/>
                                            </View>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                    <DataTable.Row>
                                        <DataTable.Cell><Text style={{color: 'white'}}>XYZ123</Text></DataTable.Cell>
                                        <DataTable.Cell><Text style={{color: 'white'}}>Sample Data</Text></DataTable.Cell>
                                        <DataTable.Cell><Text style={{color: 'white'}}>Sample Data</Text></DataTable.Cell>
                                        <DataTable.Cell><Text style={{color: 'white'}}>6.0</Text></DataTable.Cell>
                                        <DataTable.Cell numeric>
                                            <View style={{flexDirection: 'row'}}>
                                                <Icon name="edit-outline" {...{"style": {"height": 20, "marginHorizontal": 5, "tintColor": "#fff", "width": 25}}}/>
                                                <Icon name="trash-outline" {...{"style": {"height": 20, "marginHorizontal": 5, "tintColor": "#fff", "width": 25}}}/>
                                            </View>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                </DataTable>
                            </View>
                        </ScrollView>
                        <Layout level="1" style={{flexDirection: 'row-reverse', marginTop: 10, marginBottom: 10}}>
                            <Layout style={{flexDirection: 'row'}}>
                                <Icon name="arrow-left-outline" 
                                    {...{"style": {"height": 20, "marginHorizontal": 10, "tintColor": "#fff", "width": 25}}}
                                    onPress={()=> {console.log("LEFT")}}/>
                                <Icon name="arrow-right-outline" 
                                    {...{"style": {"height": 20, "marginHorizontal": 10, "tintColor": "#fff", "width": 25}}}
                                    onPress={()=> {console.log("RIGHT")}}/>
                            </Layout>
                            <Layout style={{marginRight: 10}}>
                                <Text>Page 1 of 4</Text>
                            </Layout>
                        </Layout>
                        <Layout>
                            <Button status="warning">Download</Button>
                        </Layout>
                        <Layout style={{padding: 10}}>
                            <Text style={{fontStyle: 'italic', textDecorationLine: 'underline', textAlign: 'center'}} status="info" onPress={()=> setShowDataTable(true)}>Add a new Family profile here!</Text>
                        </Layout>
                    </View>
                </KeyboardAvoidingView>
            </Layout>
        <Modal
            style={{width: '100%', height: '100%'}}
            visible={showDataTable}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setShowDataTable(false)}>
                <ScrollView>
                    <Card disabled={true} style={{flex: 1}}>
                        <Layout style={{flexDirection: 'row-reverse', marginBottom: 20}}>
                            <Icon name="close-circle-outline" {...{"style": {"height": 50, "tintColor": "#fff", "width": 50}}}
                                    onPress={()=> setShowDataTable(false)}/>
                        </Layout>
                        <ScrollView ref={(ref) => {
                            setRef(ref);
                        }}>
                            {
                                profileMembers.map((member, index)=> (
                                    <View key={index} style={{width: screenWidth-60, marginTop: 20}}
                                        onLayout={(event) => {
                                            const layout = event.nativeEvent.layout;
                                            dataSourceCords[index] = layout.y;
                                            scrollHandler(dataSourceCords);
                                        }}
                                    >
                                    <RenderPrimaryHouseholdInput index={index} head={index == 0 ? true : false} member={member}/>
                                    </View>
                                ))
                            }
                        </ScrollView>
                        <ActionButton buttonColor="rgba(231,76,60,1)" style={{position: 'absolute', left: 0, right: -25, top: screenHeight - 109, }}>
                            <ActionButton.Item buttonColor='#16526D' title="Add another Household Member" onPress={() => {
                                handleAdditionalMember();
                            }}>
                                <AddIcon/>
                            </ActionButton.Item>
                            <ActionButton.Item buttonColor='#F8991D' title="Save Family Risk Profile" onPress={() => handleListSubmit()}>
                                <SaveIcon/>
                            </ActionButton.Item>
                            <ActionButton.Item buttonColor='#006600' title="Download Family Risk Profiles" onPress={() => handleListSubmit()}>
                                <DownloadIcon/>
                            </ActionButton.Item>
                        </ActionButton>
                    </Card>
                </ScrollView>
        </Modal>
        {/* <DatePicker
            modal
            mode={"date"}
            open={openCalendar}
            date={selectedDate}
            onConfirm={(date) => {
                setOpenCalendar(false)
                setSelectedDate(date)
            }}
            onCancel={() => {
                setOpenCalendar(false)
            }}
        /> */}
        </Fragment>
    )
}

export default FamilyRiskProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    input_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
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
        padding: 20,
        margin: 0,
        width: '100%',
        textAlign: 'center'
    },
    button: {
        marginTop: 10,
    },
    buttonGroup: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    checkbox: {
        margin: 2,
    },
});