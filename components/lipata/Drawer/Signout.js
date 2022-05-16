import React, { Fragment, useEffect } from 'react';
import { View } from 'react-native';
import { Button } from '@ui-kitten/components';

const Signout = (props) => {
    useEffect(()=> {
        props.navigation.navigate('Signin');
    }, []);
    return(
        <Fragment />
    )
}

export default Signout;