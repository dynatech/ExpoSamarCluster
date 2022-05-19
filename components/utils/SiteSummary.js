import React, {useRef, useEffect, useState} from 'react';
import { StyleSheet, TouchableOpacity} from 'react-native';
import { Layout, Text} from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import moment from 'moment';


const SiteSummary = (props) => {
    
    const [tempDate, setTempDate] = useState("");
    const mountedRef = useRef(true)

    useEffect(() => {
        setInterval(() => {
            if (!mountedRef.current) return null
            const currentDate = new Date()
            setTempDate(moment(currentDate).format("LL hh:mm:ss A"))
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