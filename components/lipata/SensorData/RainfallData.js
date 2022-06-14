import React, { Fragment, useState, useEffect } from 'react';
import { StyleSheet, Modal, TouchableHighlight} from 'react-native';
import CustomProgressiveImage from '../../utils/CustomProgressiveImage';
import { Layout, Text, Input, Button, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import ScreenHeader from '../../utils/ScreenHeader';
import ImageViewer from 'react-native-image-zoom-viewer';
import { ImageStyle } from '../../../styles/image_style';
import RainfallGraph from '../../graphs/RainfallGraph';

import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';

const RainfallData = () => {
    const [mapView, setMapView] = useState(false);
    const [selectedViewIndex, setSelectedViewIndex] = useState(new IndexPath(0));
    const [selectedGaugeName, setSelectedGaugeName] = useState(new IndexPath(0));
    const [rainfallData, setRainfallData] = useState(require('../../graphs/dummy/RainfallPlotData.json'));
    const [gaugeNames, setGaugeNames] = useState([]);
    const [selectedGraphView, setSelectedGraphView] = useState([]);

    const VIEW_LIST = [
        {
            view: 'instantaneous',
            title: 'Instantaneous Rainfall Data'
        },
        {
            view: 'cumulative',
            title: 'Cumulative Rainfall Data'
        },
    ]

    return(
        <Fragment>
            <ScreenHeader title="Rainfall Data"/>
            <Layout style={styles.container} level='1'>
                <ScrollView>
                    <Layout style={styles.layout}>
                        <Text category="p1" style={{textAlign: 'center'}}>Latest Rainfall Data for Brgy. Lipata, Paranas, Samar as of {moment().format("MMMM D, YYYY h:mm A")}</Text>
                    </Layout>
                    <Layout style={[styles.layout, {paddingBottom: 10}]}>
                        <Select
                            style={{width: '100%'}}
                            placeholder="             "
                            label={evaProps => <Text {...evaProps}>Gauge name:</Text>}
                            caption={evaProps => <Text {...evaProps}>Required</Text>}
                            value={selectedGaugeName && gaugeNames.length != 0 && gaugeNames[selectedGaugeName.row].title}
                            selectedIndex={selectedGaugeName}
                            onSelect={index => setSelectedGaugeName(index)}>
                                {
                                    gaugeNames.map((row, index)=> (
                                        <SelectItem key={index} title={row.title} value={row.value}/>
                                    ))
                                }
                        </Select>
                    </Layout>
                    <Layout style={[styles.layout, {paddingBottom: 10}]}>
                        <Select
                            style={{width: '100%'}}
                            placeholder="             "
                            label={evaProps => <Text {...evaProps}>Rainfall Graph:</Text>}
                            caption={evaProps => <Text {...evaProps}>Required</Text>}
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
                    <Layout style={styles.graph_container}>
                        <RainfallGraph data={rainfallData} setGaugeNames={setGaugeNames} selectedViewIndex={VIEW_LIST[selectedViewIndex.row].view} selectedGaugeName={gaugeNames.length != 0 ? gaugeNames[selectedGaugeName.row].title : []}/>
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
            <Modal visible={mapView}
                transparent={true}>
                <ImageViewer imageUrls={[{url:'', props: {source: require('../../../hazard_maps/LPA_DSL_Hazard_Map.jpg')}}]} enableSwipeDown={true} onSwipeDown={() => { setMapView(false) }} />
            </Modal>
        </Fragment>
    )
}

export default RainfallData;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
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
        height: 400,
        width: '100%'
    }
});