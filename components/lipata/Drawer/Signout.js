import React, { Fragment, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Layout } from '@ui-kitten/components';
import CustomLoading from '../../utils/CustomLoading';
import MobileCaching from '../../utils/MobileCaching';

const Signout = (props) => {

    const [isLoading, setLoading] = useState(false);
    useEffect(()=> {
        setLoading(true);
        setTimeout(()=> {
            MobileCaching.setItem('credentials', null);
            MobileCaching.setItem('fromSignout', true);
            props.navigation.navigate('Signin');
            setLoading(false);
        }, 3000);
    }, []);
    return(
        <Layout style={styles.container} level='1'>
            <CustomLoading loading={isLoading} />
        </Layout>
    )
}

export default Signout;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
});