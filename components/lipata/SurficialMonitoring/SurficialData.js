import React, { Fragment } from 'react';
import { StyleSheet, TouchableOpacity, View, TouchableHighlight} from 'react-native';
import { Layout, Text, Input, Button } from '@ui-kitten/components';
import ScreenHeader from '../../utils/ScreenHeader';
import moment from 'moment';

const SurficialData = () => {
    return(
        <Fragment>
            <ScreenHeader title="Surficial Data"/>
            <Layout style={styles.container} level='1'>
                <Layout style={styles.layout}>
                    <Text category="p1" style={{textAlign: 'center'}}>Latest Surficial Data for Brgy. Lipata, Paranas, Samar as of {moment().format("MMMM D, YYYY h:mm A")}</Text>
                </Layout>
                <Layout style={styles.image_container}>
                    {/* <TouchableHighlight onPress={()=> setMapView(true)}>
                       <CustomProgressiveImage 
                            source={require('../../../hazard_maps/LPA_DSL_Hazard_Map.jpg')}
                            style={ImageStyle.hazard_maps}
                            resizeMode="cover"
                       />
                    </TouchableHighlight> */}
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
            {/* <Modal visible={mapView}
                transparent={true}>
                <ImageViewer imageUrls={[{url:'', props: {source: require('../../../hazard_maps/LPA_DSL_Hazard_Map.jpg')}}]} enableSwipeDown={true} onSwipeDown={() => { setMapView(false) }} />
            </Modal> */}
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