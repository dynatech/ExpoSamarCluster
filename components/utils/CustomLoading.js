import * as React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import Modal from "react-native-modal";
import 'react-native-reanimated'
import { MotiView } from '@motify/components';
import { Easing } from 'react-native-reanimated';

export default function CustomLoading(props) {
    return(
        <Modal isVisible={props.loading} 
        // onBackdropPress={}
        // onBackButtonPress={}
        // onSwipeComplete={}
        // swipeDirection="down"
        >
           <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={[styles.dot, { justifyContent: 'center', alignItems: 'center' }]}>
                    {
                        [...Array(3).keys()].map(index=> {
                            return <MotiView 
                                        from={{opacity: 1, scale: 1}} 
                                        animate={{opacity: 0, scale: 4}} 
                                        transition={{ type: 'timing', duration: 2000, easing: Easing.out(Easing.ease)}}
                                        key={index} 
                                        style={[StyleSheet.absoluteFillObject, styles.dot]}/>
                        })
                    }
                    <Image source={require('../../assets/dynaslope_seal_contrast.png')}></Image>
                </View>
           </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    dot: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: '#6E01EF'
    }
})