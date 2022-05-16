import React, { Fragment, useState } from 'react';
import { StyleSheet, Modal, TouchableHighlight} from 'react-native';
import CustomProgressiveImage from '../../utils/CustomProgressiveImage';
import { Layout, Text, Input, Button } from '@ui-kitten/components';
import ScreenHeader from '../../utils/ScreenHeader';
import ImageViewer from 'react-native-image-zoom-viewer';
import { ImageStyle } from '../../../styles/image_style';

import moment from 'moment';


const RainfallData = () => {
    const [mapView, setMapView] = useState(false);

    return(
        <Fragment>
            <ScreenHeader title="Rainfall Data"/>
            <Layout style={styles.container} level='1'>
                <Layout style={styles.layout}>
                    <Text category="p1" style={{textAlign: 'center'}}>Latest Rainfall Data for Brgy. Lipata, Paranas, Samar as of {moment().format("MMMM D, YYYY h:mm A")}</Text>
                </Layout>
                <Layout style={styles.image_container}>
                    <TouchableHighlight onPress={()=> setMapView(true)}>
                       <CustomProgressiveImage 
                            source={require('../../../hazard_maps/LPA_DSL_Hazard_Map.jpg')}
                            style={ImageStyle.graphs}
                            resizeMode="cover"
                       />
                    </TouchableHighlight>
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
    }
});