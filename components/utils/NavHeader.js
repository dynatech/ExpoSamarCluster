import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Layout, Button, Icon, IconButton, Popover, Text, Avatar, MenuItem, OverflowMenu } from '@ui-kitten/components';

const NavHeader = (props) => {
    const { StackNavigator } = props;
    const shakeIconRef = useRef();
    const infiniteAnimationIconRef = useRef();
    const [visible, setVisible] = React.useState(false);
    const [openOverflowMenu, setOpenOverflowMenu] = React.useState(false);

    const [selectedIndex, setSelectedIndex] = React.useState(null);
  
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
        <Icon {...props} name='archive-outline'/>
      );

    useEffect(() => {
        infiniteAnimationIconRef.current.startAnimation();
    },[]);

    const RenderDataSync = (props) => (
        <Icon onPress={() => setVisible(true)}
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
          source={require('../../assets/ProfileIcon.png')} 
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
        <Popover
           visible={visible}
           anchor={RenderDataSync}
           onBackdropPress={() => setVisible(false)}>
           <Layout style={styles.content}>
             {/* <Avatar
               style={styles.avatar}
               source={require('../../assets/icon.png')}/> */}
             <Text>
              Data synced
             </Text>
           </Layout>
         </Popover>

        <Layout style={styles.container} level='1'>
        <OverflowMenu
          anchor={RenderNotifications}
          visible={openOverflowMenu}
          selectedIndex={selectedIndex}
        //   onSelect={onItemSelect}
          onBackdropPress={() => setOpenOverflowMenu(false)}>
          <MenuItem title='Notif 1' accessoryLeft={StarIcon}/>
          <MenuItem title='Notif 2' accessoryLeft={StarIcon}/>
          <MenuItem title='Notif 3' accessoryLeft={StarIcon}/>
        </OverflowMenu>
    </Layout>
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