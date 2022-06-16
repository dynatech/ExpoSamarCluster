import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { Layout, Button, Icon, IconButton, Popover, Text, Avatar, MenuItem, OverflowMenu } from '@ui-kitten/components';
import CustomLoading from './CustomLoading';
import CustomConfirm from './CustomConfirm';

const SCREEN_WIDTH = Dimensions.get('window').width;

const NavHeader = (props) => {
    const { StackNavigator } = props;
    const shakeIconRef = useRef();
    const infiniteAnimationIconRef = useRef();
    const [visible, setVisible] = useState(false);
    const [openOverflowMenu, setOpenOverflowMenu] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [displayConfirm, setDisplayConfirm] = useState(false);
    const [confirmStatus, setConfirmStatus] = useState("success");
    const [confirmDescription, setConfirmDescription] = useState({});

    const [selectedIndex, setSelectedIndex] = React.useState(null);

    const {dp} = props;
  
    const onItemSelect = (index) => {
      setSelectedIndex(index);
      setVisible(false);
    };

    const [ userName, setUserName ] = useState("");
    
    // useEffect(() => {
    //     if (props.route.params) {
    //         console.log(props.route.params.username)
    //         // setUserName(props.route.params.username)
    //      }
    // }, [props])

    const StarIcon = (props) => (
        <Icon {...props} fill='white' name='archive-outline'/>
    );

    const AlertIcon = (props) => (
      <Icon {...props} fill='yellow' name='alert-triangle-outline'/>
    )

    useEffect(() => {
        infiniteAnimationIconRef.current.startAnimation();
    },[]);

    const RenderDataSync = (props) => (
        <Icon onPress={() => {
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
            setDisplayConfirm(true);
            setConfirmStatus("success");
            setConfirmDescription({
                title: 'Data Synced!',
                caption: 'Local data has been updated'
            })
          }, 3000);
        }}
            {...props}
            ref={shakeIconRef}
            animationConfig={{ cycles: Infinity }}
            animation='pulse'
            name='swap-outline'
        />
    )

    const RenderNotifications = (props) => (
        <Icon onPress={() => setOpenOverflowMenu(true)}
            {...props}
            ref={infiniteAnimationIconRef}
            animationConfig={{ cycles: Infinity }}
            animation='pulse'
            name='bell-outline'
        />
    )
    
    const RenderProfileSetting = (props) => (  
        <TouchableOpacity 
            onPress={()=> {
                StackNavigator.openDrawer();
            }}
        >
          <Avatar style={styles.avatar} size= 'small' shape='rounded'  
          source={dp ? dp : require('../../assets/ProfileIcon.png')} 
          >
          </Avatar>
        </TouchableOpacity>
    )

    return (
        <Layout style={styles.container} level='1'>
            <Button
                appearance='ghost'
                status='info'
                style={styles.button}
                onPress={() => setVisible(true)}
                accessoryRight={RenderProfileSetting}/>
            <Button
                appearance='ghost'
                status='info'
                style={styles.button}
                onPress={() => setOpenOverflowMenu(true)}
                accessoryRight={RenderNotifications}/>
            <Button
                appearance='ghost'
                status='info'
                accessoryLeft={RenderDataSync}
                onPress={() => shakeIconRef.current.startAnimation()}/>

        <Layout style={styles.container} level='1'>
          <OverflowMenu
              anchor={RenderNotifications}
              visible={openOverflowMenu}
              selectedIndex={selectedIndex}
              style={{width: SCREEN_WIDTH - 100, maxHeight: SCREEN_WIDTH, backgroundColor: "#417bd9"}}
            //   onSelect={onItemSelect}
              onBackdropPress={() => setOpenOverflowMenu(false)}>
              <MenuItem style={{backgroundColor: '#417bd9'}} title={evaProps => 
                <View style={{width: '100%', paddingRight: 35}}>
                  <Text {...evaProps}>New Message!</Text>
                  <Text {...evaProps}>From: Mang boy (+63) 909-9090-90</Text>
                  <Text {...evaProps}>Kamusta po kayo?</Text>
              </View>} accessoryLeft={StarIcon}/>
              <MenuItem style={{backgroundColor: '#417bd9'}} title={evaProps => 
                  <View style={{width: '100%' , paddingRight: 35}}>
                    <Text {...evaProps}>New Message!</Text>
                    <Text {...evaProps}>From: Ma'am Susan (+63) 909-9090-91</Text>
                    <Text {...evaProps}>Good evening sir!</Text>
                  </View>} accessoryLeft={StarIcon}/>
                <MenuItem style={{backgroundColor: '#417bd9'}} title={evaProps => 
                  <View style={{width: '100%' , paddingRight: 35}}>
                    <Text {...evaProps}>ALERT LEVEL 1!</Text>
                    <Text {...evaProps}>Kasalukuyang nakakaranas ng malakas na...</Text>
                    <Text {...evaProps}>June 12, 2022 12:00:00 PM</Text>
                  </View>} accessoryLeft={AlertIcon}/>
            </OverflowMenu>
        </Layout>
        <CustomLoading loading={isLoading} />
        <CustomConfirm 
            title={confirmDescription.title}
            caption={confirmDescription.caption}
            displayConfirm={displayConfirm}
            confirmStatus={confirmStatus}
            setDisplayConfirm={setDisplayConfirm}
            callback={()=> {
              setDisplayConfirm(false);}}
          /> 
      </Layout>
    
    )
}

export default NavHeader;

const styles = StyleSheet.create({
    container: {
      height: 45,
      flexDirection: 'row-reverse',
    },
    layout: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
        textAlign: 'center',
        fontSize: 25
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
    },
    avatar: {
        margin: 8,
      },
});