import React, { Fragment, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button } from '@ui-kitten/components';
import CustomLoading from '../../utils/CustomLoading';
import MobileCaching from '../../utils/MobileCaching';

const Signout = (props) => {

    const [isLoading, setLoading] = useState(false);
    useEffect(()=> {
        setLoading(true);
        setTimeout(()=> {
            MobileCaching.setItem('credentials', null);
            props.navigation.navigate('Signin');
            setLoading(false);
        }, 3000);
    }, []);
    return(
        <CustomLoading loading={isLoading} />
    )
}

export default Signout;