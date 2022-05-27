import React, { Fragment, useState, useEffect } from 'react';
import { StyleSheet, BackHandler, View, ScrollView} from 'react-native';
import { Layout, Text, Input, Button, Select, SelectItem, Icon, IndexPath } from '@ui-kitten/components';
import ScreenHeader from '../../utils/ScreenHeader';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import CustomLoading from '../../utils/CustomLoading';
import CustomConfirm from '../../utils/CustomConfirm';
import axios from 'axios';
import Config from "react-native-config";
import MobileCaching from '../../utils/MobileCaching';

const ProfileSettings = (props) => {

    const GENDER_LIST = [
        {gender: 'Male'},
        {gender: 'Female'},
        {gender: '/'}
    ]

    const DESIGNATION_LIST = [
        {designation: "LEWC"},
        {designation: "BLGU"},
        {designation: "MLGU"},
        {designation: "PLGU"},
        {designation: "Community"}
    ]

    const [openCalendar, setOpenCalendar] = useState(false);
    const [datetimestamp, setDateTimestamp] = useState(new Date())
    const [selectedGender, setSelectedGender] = useState(new IndexPath(0));
    const [selectedDesignation, setSelectedDesignation] = useState(new IndexPath(0));
    const [profileSetting, setProfileSetting] = useState({
        firstname: "",
        lastname: "",
        middlename: "",
        gender: GENDER_LIST[selectedGender.row].gender,
        kaarawan: new Date(),
        designation: DESIGNATION_LIST[selectedDesignation.row].designation,
        address: ""
    });

    const [isLoading, setLoading] = useState(false);
    const [displayConfirm, setDisplayConfirm] = useState(false);
    const [confirmStatus, setConfirmStatus] = useState("success");
    const [confirmDescription, setConfirmDescription] = useState({});

    const [isSignup, setIsSignup] = useState(false);

    const CalendarIcon = (props) => {
        return <Icon name="calendar-outline" {...props} onPress={()=> ToggleDateTimestamp()}/>
    }

    const ToggleDateTimestamp = () => {
        setOpenCalendar(!openCalendar);
    }

    useEffect(()=> {
        if (props.route.params) {
            if (props.route.params.isSignup) {
                setIsSignup(true);
                setProfileSetting({...profileSetting, ...props.route.params});
            }
        } else {
            MobileCaching.getItem('credentials').then(response => {
                if (response) {
                    setProfileSetting({
                        id: response.data.user.user_id,
                        firstname: response.data.user.first_name,
                        lastname: response.data.user.last_name,
                        middlename: response.data.user.middle_name,
                        gender: response.data.user.sex,
                        designation: '',
                        kaarawan: new Date(response.data.user.birthday),
                        address: response.data.profile.address
                    });
                    setSelectedGender(new IndexPath(GENDER_LIST.findIndex(o => o.gender == response.data.user.sex)));
                }
            });
        }
    }, []);

    return(
        <Fragment>
            <ScreenHeader title={`Profile ${isSignup && isSignup === true ? 'Details' : 'Settings'}`}/>
            <ScrollView>
                <Layout style={styles.container} level='1'>
                    <Layout>
                        <Input
                            style={styles.input}
                            placeholder='E.g. Juan'
                            value={profileSetting.firstname}
                            label={evaProps => <Text {...evaProps}>Firstname</Text>}
                            caption={evaProps => <Text {...evaProps}>Required</Text>}
                            onChangeText={(e)=> setProfileSetting({...profileSetting, firstname: e})}
                        />
                    </Layout>
                    <Layout>
                        <Input
                            style={styles.input}
                            placeholder='E.g. Dela Cruz'
                            value={profileSetting.lastname}
                            label={evaProps => <Text {...evaProps}>Lastname</Text>}
                            caption={evaProps => <Text {...evaProps}>Required</Text>}
                            onChangeText={(e)=> setProfileSetting({...profileSetting, lastname: e})}
                        />
                    </Layout>
                    <Layout>
                        <Input
                            style={styles.input}
                            placeholder='E.g. Tamayo'
                            value={profileSetting.middlename}
                            label={evaProps => <Text {...evaProps}>Middlename</Text>}
                            onChangeText={(e)=> setProfileSetting({...profileSetting, middlename: e})}
                        />
                    </Layout>
                    <Layout style={{flexDirection: 'row'}}>
                        <Layout style={{flex: 0.5}}>
                            <Select
                                    style={{padding: 10}}
                                    placeholder="             "
                                    label={evaProps => <Text {...evaProps}>Gender:</Text>}
                                    caption={evaProps => <Text {...evaProps}>Required</Text>}
                                    value={selectedGender && GENDER_LIST[selectedGender-1].gender}
                                    selectedIndex={selectedGender}
                                    onSelect={index => {
                                        setSelectedGender(index)
                                        setProfileSetting({...profileSetting, gender: GENDER_LIST[index.row].gender})
                                    }}>
                                        {
                                            GENDER_LIST.map((row, index)=> (
                                                <SelectItem key={index} title={row.gender} value={row.gender}/>
                                            ))
                                        }
                            </Select>
                        </Layout>
                        <Layout style={{flex: 0.5}}>
                            <Select
                                    style={{padding: 10}}
                                    placeholder="             "
                                    label={evaProps => <Text {...evaProps}>Designation:</Text>}
                                    caption={evaProps => <Text {...evaProps}>Required</Text>}
                                    value={selectedDesignation && DESIGNATION_LIST[selectedDesignation-1].designation}
                                    selectedIndex={selectedDesignation}
                                    onSelect={index => {
                                        setSelectedDesignation(index)
                                        setProfileSetting({...profileSetting, designation: DESIGNATION_LIST[index.row].designation})
                                    }}>
                                        {
                                            DESIGNATION_LIST.map((row, index)=> (
                                                <SelectItem key={index} title={row.designation} value={row.designation}/>
                                            ))
                                        }
                            </Select>
                        </Layout>
                    </Layout>
                    <Layout>
                        <Input
                                style={styles.input}
                                placeholder='E.g. 1994-08-16'
                                value={moment(profileSetting.kaarawan).format("YYYY-MM-DD")}
                                label={evaProps => <Text {...evaProps}>Kaarawan</Text>}
                                caption={evaProps => <Text {...evaProps}>Required</Text>}
                                accessoryRight={CalendarIcon}
                                onChangeText={(e)=> setProfileSetting({...profileSetting, kaarawan: moment(e).format("YYYY-MM-DD")})}
                        />
                    </Layout>
                    <Layout>
                        <Input
                            multiline
                            style={styles.input}
                            textStyle={{ minHeight: 100 }}
                            placeholder='E.g. Luneta, Manila'
                            value={profileSetting.address}
                            label={evaProps => <Text {...evaProps}>Address</Text>}
                            caption={evaProps => <Text {...evaProps}>Required</Text>}
                            onChangeText={(e)=> setProfileSetting({...profileSetting, address: e})}
                        />
                    </Layout>
                    <Layout style={{padding: 20}}>
                        <Button status="info" style={{width: '100%'}} onPress={()=> {
                            setLoading(true);
                            setTimeout(()=> {
                                setLoading(false);
                                if (isSignup) {
                                    let data = {
                                        ...profileSetting,
                                        kaarawan: moment(profileSetting.kaarawan).format("YYYY-MM-DD"),
                                        site_id: 24
                                    }
                                    axios.post(`${Config.API_URL}/api/signup`, data).then((response) => {
                                        axios.post(`${Config.API_URL}/api/login`, response.data).then((response) => {
                                            if (response.data.ok == true) {
                                                MobileCaching.setItem('credentials', response.data);
                                                props.navigation.navigate('Drawer');
                                            } else {
                                                setConfirmStatus("fail");
                                                setConfirmDescription({
                                                    title: 'Sign up failed',
                                                    caption: response.data.message
                                                })
                                                setDisplayConfirm(true);
                                            }
                                        }).catch((error) => {
                                            console.log(error);
                                        });
                                    }).catch((error) => {
                                        console.log(error);
                                    });
                                } else {
                                    // Settings only
                                }
                            }, 3000);
                            }}>
                            <Text>Save profile</Text>
                        </Button>
                    </Layout>
            </Layout>
            </ScrollView>
            <DatePicker
                modal
                mode={"date"}
                open={openCalendar}
                date={profileSetting.kaarawan}
                onConfirm={(date) => {
                    setOpenCalendar(false)
                    setProfileSetting({...profileSetting, kaarawan: date})
                }}
                onCancel={() => {
                    setOpenCalendar(false)
                }}
            />
            <CustomLoading loading={isLoading} />
            {
                props.route.params != undefined && props.route.params.isSignup &&
                <CustomConfirm 
                    title={confirmDescription.title}
                    caption={confirmDescription.caption}
                    displayConfirm={displayConfirm}
                    confirmStatus={confirmStatus}
                    setDisplayConfirm={setDisplayConfirm}
                    callback={(stat)=> {
                        setDisplayConfirm(false);
                        if (stat === "success") {
                            
                        }
                    }}
                />
            }
        </Fragment>
    )
}

export default ProfileSettings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    layout: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    text: {
        // textAlign: 'center',
        fontSize: 25
    },
    ts: {
        fontSize: 15
    },
    input: {
        padding: 10,
        margin: 0,
        width: '100%',
        textAlign: 'center'
    },
    buttonGroup: {
        paddingRight: 50,
        paddingLeft: 50,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    }
});