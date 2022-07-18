import { StyleSheet } from 'react-native'
import {Dimensions} from 'react-native';
  
let {width} = Dimensions.get('window');
let {height} = Dimensions.get('window');

const ImageStyle = StyleSheet.create({
   seal: {
      height: height * 0.09,
      width: width * 0.14,
      margin: 5
   },
   dashboard_seal: {
      height: height * 0.12,
      width: width * 0.23,
   },
   dashboard_menu_icon: {
      height: width * 0.33,
      width: width * 0.33,
   },
   alert_level_image: {
      height: 150,
      width: 150,
      borderRadius: 80,
      borderWidth: 3,
      borderColor: "#fff"
   },
   header_icon: {
      height: 100,
      width: 100,
      marginTop: 15,
   },
   hazard_maps: {
      height: height * .5,
      width: width * .9,
   },
   graphs: {
      height: height * .4,
      width: width * .9,
   },
   background: {
    flex: 1,
   },
   splashscreen: {
      height: height * 0.3,
      width: width * 0.55,
      margin: 5
   }
})

export { ImageStyle }