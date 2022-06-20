import React, { Fragment, useState } from 'react';
import { StyleSheet, Modal, View} from 'react-native';
import { Layout, Text, Input, Button, Select, SelectItem, IndexPath, Icon } from '@ui-kitten/components';
import ScreenHeader from '../../utils/ScreenHeader';
import moment from 'moment';
import SubsurfaceGraph from '../../graphs/SubsurfaceGraph';
import { ScrollView } from 'react-native-gesture-handler';

const SubsurfaceData = () => {
    const [mapView, setMapView] = useState(false);
    const [selectedViewIndex, setSelectedViewIndex] = useState(new IndexPath(0));
    const [subsurfaceData, setSubsurfaceData] = useState(require('../../graphs/dummy/SubsurfacePlotData.json'));
    
    const VIEW_LIST = [
        {
            view: 'cp-a',
            title: 'Column Position: Across Slope'
        },
        {
            view: 'cp-d',
            title: 'Column Position: Downslope'
        },
        {
            view: 'dp-a',
            title: 'Displacement Plot: Across Slope'
        },
        {
            view: 'dp-d',
            title: 'Displacement Plot: Downslope'
        },
        {
            view: 'va-a',
            title: 'Velocity Alerts Plot: Across Slope'
        },
        {
            view: 'va-d',
            title: 'Velocity Alerts Plot:  Downslope'
        },
    ]

    return(
        <Fragment>
            <ScreenHeader title="Subsurface Data"/>
            <Layout style={styles.container} level='1'>
                <ScrollView>
                    <Layout style={styles.layout}>
                        <Text category="p1" style={{textAlign: 'center'}}>Latest Subsurface Data for Brgy. Lipata, Paranas, Samar as of {moment().format("MMMM D, YYYY h:mm A")}</Text>
                    </Layout>
                    <Layout style={[styles.layout, {paddingBottom: 10}]}>
                        <Select
                            style={{width: '100%'}}
                            placeholder="             "
                            label={evaProps => <Text {...evaProps}>Subsurface Plot</Text>}
                            caption={evaProps => <Text {...evaProps}>Across slope
                            Pinapakita ng plot ang aktwal na posisyon o itsura ng subsurface sensor nang pakaliwa at pakanan.</Text>}
                            value={selectedViewIndex && VIEW_LIST[selectedViewIndex.row].title}
                            selectedIndex={selectedViewIndex}
                            onSelect={index => setSelectedViewIndex(index)}>
                                {
                                    VIEW_LIST.map((row, index)=> (
                                        <SelectItem key={index} title={row.title} value={row.view}/>
                                    ))
                                }
                        </Select>
                    </Layout>
                    <View style={{flexDirection: 'row', padding: 20}}>
                        <Text style={{textAlign: 'center'}} category="h5" status="basic">Ito ang datos mula sa landslide sensor sa nakaraang 7 na araw</Text>
                    </View>
                    <Layout style={styles.graph_container}>
                        <SubsurfaceGraph data={subsurfaceData} view={VIEW_LIST[selectedViewIndex.row].view}/>
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
                </ScrollView>
            </Layout>
        </Fragment>
    )
}

export default SubsurfaceData;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    highcharts_container: {
        // height: 200,
        // width: 200,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    layout: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    image_container: {
        flex: 7,
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
        textAlign: 'center'
    },
    buttonGroup: {
        paddingRight: 50,
        paddingLeft: 50,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    graph_container: {
        height: 800,
        width: '100%'
    }
});