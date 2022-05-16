import React, { Fragment, useState } from 'react';
import { StyleSheet, Modal, TouchableHighlight} from 'react-native';
import CustomProgressiveImage from '../../utils/CustomProgressiveImage';
import { Layout, Text, Input, Button } from '@ui-kitten/components';
import ScreenHeader from '../../utils/ScreenHeader';
import ImageViewer from 'react-native-image-zoom-viewer';
import { ImageStyle } from '../../../styles/image_style';
import moment from 'moment';
import ChartView from 'react-native-highcharts';

const SubsurfaceData = () => {
    const [mapView, setMapView] = useState(false);
    var Highcharts='Highcharts';
    var conf={
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = Math.random();
                            series.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            title: {
                text: 'Live random data'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Random data',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });
                    }
                    return data;
                }())
            }]
        };

    const options = {
        global: {
            useUTC: false
        },
        lang: {
            decimalPoint: ',',
            thousandsSep: '.'
        }
    };

    return(
        <Fragment>
            <ScreenHeader title="Subsurface Data"/>
            <Layout style={styles.container} level='1'>
                <Layout style={styles.layout}>
                    <Text category="p1" style={{textAlign: 'center'}}>Latest Subsurface Data for Brgy. Lipata, Paranas, Samar as of {moment().format("MMMM D, YYYY h:mm A")}</Text>
                </Layout>
                <Layout style={styles.image_container}>
                    <ChartView style={{height:300}} config={conf} options={options}></ChartView>
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
    }
});