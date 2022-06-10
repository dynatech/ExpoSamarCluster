import React, { Fragment, useState, useEffect } from 'react';
import { StyleSheet, Image, Dimensions, ScrollView, View, PermissionsAndroid, TouchableOpacity, ImageBackground} from 'react-native';
import { Layout, Text, Icon, Input, Select, SelectItem, Autocomplete, AutocompleteItem, Button} from '@ui-kitten/components';
import ScreenHeader from '../../utils/ScreenHeader';
import moment from 'moment';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Modal from "react-native-modal";
import CustomConfirm from '../../utils/CustomConfirm';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const filter = (item, query) => item.name.toLowerCase().includes(query.toLowerCase());
const feature_names = [
    {name: 'A'},
    {name: 'B'},
    {name: 'C'},
];

const LandslideFeatures = () => {
    const [datetimestamp, setDateTimestamp] = useState(new Date());
    const [openCalendar, setOpenCalendar] = useState(false);
    const [selectedFeatureIndex, setSelectedFeatureIndex] = useState(null);
    const [selectedFeatureName, setSelectedFeatureName] = useState("");
    const [featureNameData, setFeatureNameData] = useState(feature_names)
    const [featureLocation, setFeatureLocation] = useState("");
    const [reporter, setReporter] = useState("");
    const [narratives, setNarratives] = useState("");
    const [imageFiles, setImageFiles] = useState([]);
    const [viewImage, setViewImage] = useState(null);
    const [openImageViewer, setOpenImageViewer] = useState(false);

    const [displayConfirm, setDisplayConfirm] = useState(false);
    const [confirmStatus, setConfirmStatus] = useState("success");
    const [confirmDescription, setConfirmDescription] = useState({});

    const initializeCamera = async () => {
        let options = {
            title: 'Select Image',
            customButtons: [
              { 
                name: 'customOptionKey', 
                title: 'Choose file from Custom Option' 
              },
            ],
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
            saveToPhotos: true
        };

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "App Camera Permission",
                    message:"App needs access to your camera ",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );

            const external = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                 'title': 'Open mo yung permission gago!',
                 'message': 'Pano ko issave to gago?',
                 buttonNeutral: "Ask Me Later",
                 buttonNegative: "Cancel",
                 buttonPositive: "OK"
                }
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED && external === PermissionsAndroid.RESULTS.GRANTED) {
                console.warn("options:", options)
                launchCamera(options, (res) => {
                    if (res.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (res.error) {
                        console.log('ImagePicker Error: ', res.error);
                    } else if (res.customButton) {
                        console.log('User tapped custom button: ', res.customButton);
                        alert(res.customButton);
                    } else {
                        const source = { uri: res.uri };
                        setImageFiles([...imageFiles, res.assets[0]]);
                    }
                });
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    }

    const CalendarIcon = (props) => {
        return <Icon name="calendar-outline" {...props} onPress={()=> ToggleDateTimestamp()}/>
    }

    const CameraIcon = (props) => {
        return <Icon name="camera-outline" {...{"style": {"height": 40, "marginHorizontal": 10, "tintColor": "#32bbf8", "width": 40}}}/>
    }

    const ToggleDateTimestamp = () => {
        setOpenCalendar(!openCalendar);
    }

    const feature_list = [
        {feature: 'Crack'},
        {feature: 'Scarp'},
        {feature: 'Seepage'},
    ];

    const renderOption = (item, index) => (
        <AutocompleteItem
          key={index}
          title={item.name}
        />
    );

    const onSelect = (index) => {
        setSelectedFeatureName(feature_names[index].title);
    };

    const onChangeText = (query) => {
        setSelectedFeatureName(query);
        setFeatureNameData(feature_names.filter(item => filter(item, query)));
    };

    const handleImageViewer = (img_path) => {
        setOpenImageViewer(true);
        setViewImage(img_path)
    }

    useEffect(()=> {

    }, []);

    return(
        <Fragment>
            <ScreenHeader title="Landslide Features"/>
            <Layout style={styles.container} level='1'>
                <ScrollView>
                    <Layout style={styles.input_container}>
                        <View>
                            <Input
                                style={styles.input}
                                placeholder='E.g. XXXYYYZZZ'
                                value={moment(datetimestamp).format("YYYY-MM-DD hh:mm A")}
                                label={evaProps => <Text {...evaProps}>Petsa at Oras na nakita</Text>}
                                caption={evaProps => <Text {...evaProps}>Required</Text>}
                                accessoryRight={CalendarIcon}
                                // onChangeText={handleChange('household_head')}
                                // onBlur={handleBlur('household_head')}
                            />
                        </View>
                        <View >
                            <Select
                                style={{padding: 20}}
                                placeholder="             "
                                label={evaProps => <Text {...evaProps}>Landslide feature:</Text>}
                                caption={evaProps => <Text {...evaProps}>Required</Text>}
                                value={selectedFeatureIndex && feature_list[selectedFeatureIndex.row].feature}
                                selectedIndex={selectedFeatureIndex}
                                onSelect={index => setSelectedFeatureIndex(index)}>
                                    {
                                        feature_list.map((row, index)=> (
                                            <SelectItem key={index} title={row.feature} value={row.feature}/>
                                        ))
                                    }
                            </Select>
                        </View>
                        <View>
                            <Autocomplete
                                placeholder='E.g. Crack A'
                                value={selectedFeatureName}
                                style={styles.input}
                                label={evaProps => <Text {...evaProps}>Feature name:</Text>}
                                caption={evaProps => <Text {...evaProps}>Required</Text>}
                                onSelect={onSelect}
                                onChangeText={onChangeText}>
                                {featureNameData.map(renderOption)}
                            </Autocomplete>
                        </View>
                        <View>
                            <Input
                                style={styles.input}
                                placeholder='E.g. XXXYYYZZZ'
                                multiline={true}
                                textStyle={{ minHeight: 40 }}
                                value={featureLocation}
                                label={evaProps => <Text {...evaProps}>Lugar o Lokasyon</Text>}
                                caption={evaProps => <Text {...evaProps}>Required</Text>}
                                onChangeText={value => setFeatureLocation(value)}
                            />
                        </View>
                        <View>
                            <Input
                                style={styles.input}
                                placeholder='E.g. XXXYYYZZZ'
                                value={reporter}
                                label={evaProps => <Text {...evaProps}>Reporter</Text>}
                                caption={evaProps => <Text {...evaProps}>Required</Text>}
                                onChangeText={valueText => setReporter(valueText)}
                                // onBlur={handleBlur('household_head')}
                            />
                        </View>
                        <View>
                            <Input
                                style={styles.input}
                                placeholder='E.g. XXXYYYZZZ'
                                multiline={true}
                                textStyle={{ minHeight: 100 }}
                                value={narratives}
                                label={evaProps => <Text {...evaProps}>Narrative ng observasyon at iba pang detalye</Text>}
                                caption={evaProps => <Text {...evaProps}>Required</Text>}
                                onChangeText={value => setNarratives(value)}
                            />
                        </View>
                        <View style={{textAlign: 'center', flex: 1, alignItems: 'center'}}>
                            <Text>Attach / Take photo(s)</Text>
                            <Button
                                appearance='ghost'
                                status='info'
                                style={styles.button}
                                accessoryRight={CameraIcon} onPress={()=> {
                                    initializeCamera();
                                }}/>
                        </View>
                        <View style={{textAlign: 'center', flex: 1, alignItems: 'center'}}>
                            <ScrollView horizontal={true}>
                                {
                                    imageFiles.length > 0 ?
                                        imageFiles.map((image, index)=> (
                                            <TouchableOpacity key={index} style={{padding: 5, marginBottom: 10}}
                                                onPress={()=> {
                                                    handleImageViewer(image)
                                                }}>
                                                <Image source={{uri: image.uri}} resizeMode='cover' style={{flex: 1, height: 50, width: 50}} />
                                            </TouchableOpacity>
                                        ))
                                        :
                                        <Text category="h5" style={{paddingBottom: 10}}>No Photo(s) available.</Text>
                                }
                            </ScrollView>
                        </View>
                        <View >
                            <Button status="info" onPress={()=> {
                                setConfirmStatus("success");
                                setConfirmDescription({
                                    title: 'Success!',
                                    caption: 'Manifestation of movements submitted!'
                                })
                                setDisplayConfirm(true);
                            }}>Submit</Button>
                        </View>
                    </Layout>
                </ScrollView>
            </Layout>
            <Modal isVisible={openImageViewer} 
                                onBackdropPress={()=> {
                                    setOpenImageViewer(false)}}
                                onBackButtonPress={()=> {
                                    setOpenImageViewer(false)}}
                                onSwipeComplete={() => {
                                    setOpenImageViewer(false)}}
                                swipeDirection="down">
                {
                    viewImage != null && 
                        <ImageBackground source={{uri: viewImage.uri}} resizeMode='cover' style={{flex: 1}} />
                }
            </Modal>
            <CustomConfirm 
                title={confirmDescription.title}
                caption={confirmDescription.caption}
                displayConfirm={displayConfirm}
                confirmStatus={confirmStatus}
                setDisplayConfirm={setDisplayConfirm}
                callback={(stat)=> {
                    setDisplayConfirm(false);
                }}
            />
        </Fragment>
    )
}

export default LandslideFeatures;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    input_container: {
        flex: 1,
        width: screenWidth * .9
    },
    layout: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    text: {
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