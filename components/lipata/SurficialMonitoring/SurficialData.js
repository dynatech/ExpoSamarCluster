import React, { Fragment, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, Dimensions } from 'react-native';
import { Layout, Text, Icon, Button } from '@ui-kitten/components';
import ScreenHeader from '../../utils/ScreenHeader';
import moment from 'moment';
import SurficialGraph from '../../graphs/SurficialGraph';
import { DataTable } from 'react-native-paper';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const SurficialData = () => {
    const [surficialData, setSurficialData] = useState(require('../../graphs/dummy/SurficialPlotData.json'));
    
    return(
        <Fragment>
            <ScreenHeader title="Surficial Data"/>
            <ScrollView style={{backgroundColor: 'pink'}}>
                
                <Layout style={styles.container} level="1">
                    <Layout style={styles.layout}>
                        <Text category="p1" style={{textAlign: 'center'}}>Latest Surficial Data for Brgy. Lipata, Paranas, Samar as of {moment().format("MMMM D, YYYY h:mm A")}</Text>
                    </Layout>
                    <Layout style={styles.graph_container}>
                        <SurficialGraph data={surficialData}/>
                    </Layout>
                    <Layout style={{padding: 10}}>
                        <Button style={styles.buttonGroup} status="info" onPress={()=> {
                            console.log("DOWNLOAD")
                        }}>Download</Button>
                    </Layout>
                    <Layout style={{padding: 10}}>
                        <Button style={styles.buttonGroup} status="primary" onPress={()=> {
                            console.log("SHARE")
                        }}>Share</Button>
                    </Layout>
                </Layout>
                <Layout style={styles.container} level="1">
                    <Layout style={styles.layout}>
                        <Text category="h5" style={{textAlign: 'center', paddingBottom: 10}}>Surficial Marker Data as of {moment().format("MMMM D, YYYY")}</Text>
                    </Layout>
                    <KeyboardAvoidingView
                    >   
                        <View>
                            <ScrollView horizontal={true}>
                                <View style={{width: SCREEN_WIDTH * .9, backgroundColor: '#ffffff20'}}>
                                    <DataTable>
                                        <DataTable.Header>
                                            <DataTable.Title><Text style={{color: 'white'}}>Petsa</Text></DataTable.Title>
                                            <DataTable.Title ><Text style={{color: 'white'}}>Crack A</Text></DataTable.Title>
                                            <DataTable.Title><Text style={{color: 'white'}}>Crack B</Text></DataTable.Title>
                                            <DataTable.Title><Text style={{color: 'white'}}>Crack C</Text></DataTable.Title>
                                            <DataTable.Title numeric><Text style={{color: 'white'}}>Action</Text></DataTable.Title>
                                        </DataTable.Header>
                                        <DataTable.Row>
                                            <DataTable.Cell><Text style={{color: 'white'}}>2016-08-16</Text></DataTable.Cell>
                                            <DataTable.Cell><Text style={{color: 'white'}}>2.3cm</Text></DataTable.Cell>
                                            <DataTable.Cell><Text style={{color: 'white'}}>4.2cm</Text></DataTable.Cell>
                                            <DataTable.Cell><Text style={{color: 'white'}}>29cm</Text></DataTable.Cell>
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
                    </KeyboardAvoidingView>
                </Layout>
            </ScrollView>

        </Fragment>
    )
}

export default SurficialData;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        // backgroundColor: 'yellow',
        // height: SCREEN_HEIGHT * .7
    },
    layout: {
    //   flex: 1,
    //   flexDirection: 'row',
    //   flexWrap: 'wrap'
    },
    text: {
        // textAlign: 'center',
        fontSize: 25
    },
    ts: {
        fontSize: 15
    },
    input: {
        padding: 20,
        margin: 0,
        textAlign: 'center'
    },
    buttonGroup: {
        paddingRight: 50,
        paddingLeft: 50,
        // textAlign: 'center',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    graph_container: {
        width: SCREEN_WIDTH * .9,
    }
});