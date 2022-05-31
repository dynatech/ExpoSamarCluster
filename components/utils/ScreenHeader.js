import React, { Fragment, useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Layout, Text} from '@ui-kitten/components';
import { ImageStyle } from '../../styles/image_style';

const ScreenHeader = (props) => {
    const { title } = props;
    const [headerIcon, setHeaderIcon] = useState(null);
    const [iconLabel, setIconLabel] = useState(null);

    useEffect(()=> {
        switch(title) {
            case "Family Risk Profile":
            case "Hazard Map":
                setHeaderIcon(require('../../assets/CRA-originalpallete-Square.png'));
                setIconLabel('Community Risk Assessment');
                break;
            case "Landslide Features":
            case "Surficial Marker":
            case "Surficial Data":
                setHeaderIcon(require('../../assets/Surficial-originalpallete-Square.png'));
                setIconLabel('Surficial Data');
                break;
            case "Rainfall Data":
            case "Subsurface Data":
                setHeaderIcon(require('../../assets/Sensor-originalpallete-Square.png'));
                setIconLabel('Subsurface Data');
                break;
            case "Early Warning Information":
                setHeaderIcon(require('../../assets/EWI-originalpallete-Square.png'));
                setIconLabel('Early Warning Information');
                break;
            case "Activity Schedule":
                setHeaderIcon(require('../../assets/Calendar-originalpallete-Square.png'));
                setIconLabel('Activity Schedule');
                break;
            case "Call":
            case "Messenger":
                setHeaderIcon(require('../../assets/CallandText-originalpallete-Square.png'));
                setIconLabel('Communications');
                break;
            default:
                break;
        }
    }, []);

    return(
        <Layout style={styles.container} level='1'>

            {
                headerIcon ? 
                    <Fragment>
                        <View style={{flex: 0.3, paddingLeft: 20, justifyContent: 'center', alignItems: 'center'}}>
                            <Image style={ImageStyle.header_icon} source={headerIcon}></Image>
                            <Text style={styles.iconLabel} category='c1'>{iconLabel}</Text>
                        </View>
                        <View style={{flex: 0.7}}>
                            <Text style={styles.text} category='h1'>{title}</Text>
                        </View>
                    </Fragment>
                    :
                    <View style={{flex: 1}}>
                        <Text style={{ textAlign: 'center'}} category='h1'>{title}</Text>
                    </View>
            }
        </Layout>
    )
}

export default ScreenHeader;


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    text: {
        fontSize: 30,
        paddingLeft: 10
    },
    iconLabel: {
        fontSize: 12,
        paddingTop: 5,
        textAlign: 'center'
    }
});