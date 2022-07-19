import React, {useRef, useEffect, useState} from 'react';
import { StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import { Layout, Text} from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import moment from 'moment';
import axios from 'axios';
import Config from 'react-native-config';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const SiteSummary = (props) => {
    
    const [tempDate, setTempDate] = useState("");
    const mountedRef = useRef(true);
    const dateRef = useRef(new Date())

    useEffect(()=> {
        axios.get(`${Config.API_URL}/api/utils/server_time_api`)
        .then(function (response) {
            dateRef.current = response.data.time;
        })
        .catch(function (error) {
          console.log(error);
        })
    }, []);

    useEffect(() => {
        setInterval(() => {
            if (!mountedRef.current) return null
            dateRef.current = moment(dateRef.current).add(1, 'seconds').format("LL hh:mm:ss A")
            setTempDate(dateRef.current)
        }, 1000)
    },[])

    useEffect(() => {
        return () => { 
          mountedRef.current = false
        }
    }, [])
   
    return(
        <Layout style={styles.container} level='1'>
            <Layout style={styles.layout} level='1'>
                <Text style={styles.text} category='h1'>Hi {props.userName}!</Text>
                <Text style={styles.text} category='p1'>Ang kasalukuyang alert sa Brgy. Lipata ay {'ALERT 0'}</Text>
                <Text style={styles.ts} category='p2'> {tempDate}</Text>
            </Layout>
        </Layout>
    )
}

export default SiteSummary;

const styles = StyleSheet.create({
    container: {
        height: 150,
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
        // fontSize: 25
        fontSize: SCREEN_HEIGHT * 0.025
    },
    ts: {
        // fontSize: 15
        fontSize: SCREEN_HEIGHT * 0.017
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