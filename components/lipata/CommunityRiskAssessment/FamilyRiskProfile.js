import React, { Fragment, useState, useEffect } from 'react';
import { StyleSheet, Dimensions, KeyboardAvoidingView, ScrollView, View} from 'react-native';
import { Layout, Input, Text, Card, Button, Icon, Modal } from '@ui-kitten/components';
import ScreenHeader from '../../utils/ScreenHeader';
import uuid from 'react-native-uuid';
import { Formik } from 'formik';
import ActionButton from 'react-native-action-button';
import { DataTable } from 'react-native-paper';

const optionsPerPage = [10, 30, 50];

const FamilyRiskProfile = () => {
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
    const [profileMembers, setProfileMembers] = useState([
        {
            uid: uuid.v4(),
            household_id: '',
            risk_type: '',
            household_head: '',
            gender: '',
            age: '',
            birthdate: '',
            misc: ''}
    ]);
    const [showDataTable, setShowDataTable] = useState(false);
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    useEffect(()=> {
        setPage(0);
    }, [itemsPerPage]);

    const AddIcon = () => (
        <Icon name='plus-square-outline' {...{"style": {"height": 20, "marginHorizontal": 10, "tintColor": "#fff", "width": 20}}} />
    );

    const SaveIcon = () => (
        <Icon name='save-outline' {...{"style": {"height": 20, "marginHorizontal": 10, "tintColor": "#fff", "width": 20}}} />
    );

    const DownloadIcon = () => (
        <Icon name='download-outline' {...{"style": {"height": 20, "marginHorizontal": 10, "tintColor": "#fff", "width": 20}}} />
    )

    const RenderPrimaryHouseholdInput = (props) => {
        const { head } = props;
        const uid = uuid.v4();
        return(
            <Card style={styles.card} key={uid}
                status={head ? 'primary' : 'warning'} 
                header={Header({type: head ? 1 : 2, uid: props.member ? props.member.uid : uid})}>
                    <Fragment>
                        <Layout style={styles.input_container}>
                            <View>
                                <Input
                                    style={styles.input}
                                    placeholder='E.g. XXXYYYZZZ'
                                    values={values.household_id}
                                    label={evaProps => <Text {...evaProps}>Household ID</Text>}
                                    caption={evaProps => <Text {...evaProps}>Required</Text>}
                                    onChangeText={handleChange('household_id')}
                                    onBlur={handleBlur('household_id')}
                                />
                            </View>
                            <View>
                                <Input
                                    style={styles.input}
                                    placeholder='E.g. XXXYYYZZZ'
                                    values={values.risk_type}
                                    label={evaProps => <Text {...evaProps}>Risk Type</Text>}
                                    caption={evaProps => <Text {...evaProps}>Required</Text>}
                                    onChangeText={handleChange('risk_type')}
                                    onBlur={handleBlur('risk_type')}
                                />
                            </View>
                            {
                                head && 
                                    <View>
                                        <Input
                                            style={styles.input}
                                            placeholder='E.g. XXXYYYZZZ'
                                            values={values.household_head}
                                            label={evaProps => <Text {...evaProps}>Household Head</Text>}
                                            caption={evaProps => <Text {...evaProps}>Required</Text>}
                                            onChangeText={handleChange('household_head')}
                                            onBlur={handleBlur('household_head')}
                                        />
                                    </View>
                            }
                            <View>
                                <Input
                                    style={styles.input}
                                    placeholder='E.g. XXXYYYZZZ'
                                    values={values.gender}
                                    label={evaProps => <Text {...evaProps}>Kasarian</Text>}
                                    caption={evaProps => <Text {...evaProps}>Required</Text>}
                                    onChangeText={handleChange('gender')}
                                    onBlur={handleBlur('gender')}
                                />
                            </View>
                            <View>
                                <Input
                                    style={styles.input}
                                    placeholder='E.g. XXXYYYZZZ'
                                    values={values.age}
                                    label={evaProps => <Text {...evaProps}>Edad</Text>}
                                    caption={evaProps => <Text {...evaProps}>Required</Text>}
                                    onChangeText={handleChange('age')}
                                    onBlur={handleBlur('age')}
                                />
                            </View>
                            <View>
                                <Input
                                    style={styles.input}
                                    placeholder='E.g. XXXYYYZZZ'
                                    values={values.birthdate}
                                    label={evaProps => <Text {...evaProps}>Kapanganakan</Text>}
                                    caption={evaProps => <Text {...evaProps}>Required</Text>}
                                    onChangeText={handleChange('birthdate')}
                                    onBlur={handleBlur('birthdate')}
                                />
                            </View>
                            <View>
                                <Input
                                    style={styles.input}
                                    placeholder='E.g. XXXYYYZZZ'
                                    values={values.misc}
                                    label={evaProps => <Text {...evaProps}>My Kapansanan, buntis, bata, etc...</Text>}
                                    onChangeText={handleChange('misc')}
                                    onBlur={handleBlur('misc')}
                                />
                            </View>
                        </Layout>
                    </Fragment>
            </Card>
        )
    }

    const handleAdditionalMember = () => {
        setProfileMembers([...profileMembers, {
            uid: uuid.v4(),
            household_id: '',
            risk_type: '',
            household_head: '',
            gender: '',
            age: '',
            birthdate: '',
            misc: ''}]);
    }

    const handleListSubmit = () => {
        console.log("handleListSubmit:", profileMembers);
    }

    const Header = (props) => (
        <View style={{}}>
            <Layout style={{backgroundColor: 'red', width: '100%', flexDirection: 'row'}}>
                <Layout style={{ width: props.type && props.type == 1 ? '100%': '60%' }}>
                    <Text category='h6'>{props.type && props.type == 1 ? 'Household Head' : 'Household Member'}</Text>
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
                    <Text style={{fontStyle: 'italic', textDecorationLine: 'underline'}} status="info" onPress={()=> setShowDataTable(true)}>View Family Risk Profile List here!</Text>
                    <ScrollView>
                        {/* <View style={{width: screenWidth-60}}>
                            <RenderPrimaryHouseholdInput head={true}/>
                        </View> */}
                        {
                            profileMembers.map((member, index)=> (
                                <View key={index} style={{width: screenWidth-60, marginTop: 20}}>
                                    <RenderPrimaryHouseholdInput head={false} member={member}/>
                                </View>
                            ))
                        }
                    </ScrollView>
                    
                </KeyboardAvoidingView>
            </Layout>
            <ActionButton buttonColor="rgba(231,76,60,1)" style={{position: 'absolute', left: 0, right: -25, top: screenHeight - 109, }}>
                <ActionButton.Item buttonColor='#16526D' title="Add another Household Member" onPress={() => handleAdditionalMember()}>
                    <AddIcon/>
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#F8991D' title="Save Family Risk Profile" onPress={() => handleListSubmit()}>
                    <SaveIcon/>
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#006600' title="Download Family Risk Profiles" onPress={() => handleListSubmit()}>
                    <DownloadIcon/>
                </ActionButton.Item>
            </ActionButton>
        <Modal
            style={{width: '100%', height: '100%'}}
            visible={showDataTable}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setShowDataTable(false)}>
            <Card disabled={true} style={{flex: 1}}>
                <Layout style={{flexDirection: 'row-reverse', marginBottom: 20}}>
                    <Icon name="close-circle-outline" {...{"style": {"height": 50, "tintColor": "#fff", "width": 50}}}
                            onPress={()=> setShowDataTable(false)}/>
                </Layout>
                <View>
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
                </View>
            </Card>
        </Modal>
        {/* <DatePicker
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
});