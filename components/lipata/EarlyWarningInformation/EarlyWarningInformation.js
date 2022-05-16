import React, { Fragment, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Layout, Text, Button} from '@ui-kitten/components';
import ScreenHeader from '../../utils/ScreenHeader';
import { ImageStyle } from '../../../styles/image_style';
import CustomConfirm from '../../utils/CustomConfirm';

const data = {
    
}

const EarlyWarningInformation = () => {
    const [displayConfirm, setDisplayConfirm] = useState(false);
    const [confirmStatus, setConfirmStatus] = useState("success");

    let alert_level = 2;

    const RenderAlertLevelImage = (props) => {
        const {alert_level, alert_triggers} = props.eventDetails;
        let alert_image = null;
        if (alert_level < 3) {
            switch(alert_triggers) {
                case "e":
                    alert_image = require('../../../assets/alert_levels/eq.png');
                    break;
                case "r":
                    alert_image = require('../../../assets/alert_levels/rain.png');
                    break;
                case "g":
                    alert_image = require('../../../assets/alert_levels/gndmeas.png');
                    break;
                case "s":
                    alert_image = require('../../../assets/alert_levels/subsurface.png');
                    break;
                default:
                    break;
            }
        } else {
            alert_image = require('../../../assets/alert_levels/alert_3.png');
        }
        
        return (
            <Fragment>
                <Image source={alert_image} style={ImageStyle.alert_level_image} resizeMode="center" />
            </Fragment>
        )
    }

    return(
        <Fragment>
            <ScreenHeader title="Early Warning Information"/>
            <Layout style={styles.container} level='1'>
                <Layout style={styles.alert_content_section}>
                    <Text style={alert_level == 3 ? 
                        styles.level3 : 
                        alert_level == 2 ? styles.level2 : 
                        alert_level == 1 ? styles.level1 : 
                        styles.level0} category="h3">Alert Level {alert_level}</Text>
                    <RenderAlertLevelImage eventDetails={{alert_level: 2, alert_triggers: "e"}}/>
                    <Text category="h6">Community</Text>
                    <Text category="h6">(LEWC, BLGU)</Text>
                    <Text category="h6">recommended response</Text>
                    <Text category="h5" style={{color: '#F8991D'}}>{`Prepare to Evacuate`}</Text>
                    <Text category="h6" style={{paddingTop: 30}}>Weather Updates</Text>
                    <Text category="h6" >Maulan</Text>
                    <Button status="warning" style={{marginTop: 30}} onPress={()=> setDisplayConfirm(true)}>
                        <Text>ACKNOWLEDGE</Text>
                    </Button>   
                </Layout>
            </Layout>
            <CustomConfirm 
                title={"EWI"}
                caption={"Early warning information Acknowledged!"}
                displayConfirm={displayConfirm}
                confirmStatus={confirmStatus}
                setDisplayConfirm={setDisplayConfirm}
                callback={(stat)=> {
                    setDisplayConfirm(false);
            }}/>
        </Fragment>
    )
}

export default EarlyWarningInformation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    alert_content_section: {
        paddingTop: 50,
        flex: 1,
        alignItems: 'center',
    },
    level3: {
        color: '#991B1E'
    },
    level2: {
        color: '#F8991D'
    },
    level1: {
        color: '#FCEE27'
    },
    level0: {
        color: '#fff'  
    },
    extended: {
        color: '#fff'  
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