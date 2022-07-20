import React, { Fragment, useState, useEffect } from 'react';
import { StyleSheet, Image, Dimensions, ScrollView, View, PermissionsAndroid, TouchableOpacity, ImageBackground} from 'react-native';
import { Layout, Text, Icon, Input, Select, SelectItem, Autocomplete, AutocompleteItem, Button, Tooltip} from '@ui-kitten/components';
import ScreenHeader from '../../utils/ScreenHeader';
import moment from 'moment';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Modal from "react-native-modal";
import CustomConfirm from '../../utils/CustomConfirm';
import { DataTable } from 'react-native-paper';

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

    const [petsaTooltip, setPetsaTooltip] = useState(false);
    const [featureTooltip, setFeatureTooltip] = useState(false);
    const [lugarTooltip, setLugarTooltip] = useState(false);

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
        return <Icon name="camera-outline" {...{"style": {"height": 50, "tintColor": "#32bbf8", "width": 50, "marginVertical": -5}}}/>
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

    const renderPetsaTooltip = (evaProps) => (
        <View style={{flexDirection: 'row'}}>
            <Text {...evaProps}>Petsa at Oras na nakita  </Text>
            <Icon name='question-mark-circle-outline' fill='#8994ad' width={17} height={17} onPress={() => setPetsaTooltip(true)}/>
        </View>
    )

    const renderFeatureTooltip = (evaProps) => (
        <View style={{flexDirection: 'row'}}>
            <Text {...evaProps}>Landslide feature  </Text>
            <Icon name='question-mark-circle-outline' fill='#8994ad' width={17} height={17} onPress={() => setFeatureTooltip(true)}/>
        </View>
    )

    const renderLugarTooltip = (evaProps) => (
        <View style={{flexDirection: 'row'}}>
            <Text {...evaProps}>Lugar o Lokasyon  </Text>
            <Icon name='question-mark-circle-outline' fill='#8994ad' width={17} height={17} onPress={() => setLugarTooltip(true)}/>
        </View>
    )

    return(
        <Fragment>
            <ScreenHeader title="Landslide Features"/>
            <Layout style={styles.container} level='1'>
                <ScrollView>
                    <Layout style={styles.input_container}>
                        <View>
                            <Input
                                style={styles.input}
                                placeholder='Hal. YYYY-MM-DD'
                                value={moment(datetimestamp).format("YYYY-MM-DD hh:mm A")}
                                label={evaProps =>                                             
                                    <Tooltip
                                        anchor={()=> renderPetsaTooltip({...evaProps})}
                                        visible={petsaTooltip}
                                        onBackdropPress={() => setPetsaTooltip(false)}
                                        placement={'top start'}>
                                        Kailan ito nakita?
                                    </Tooltip>}
                                caption={evaProps => <Text {...evaProps}>Required</Text>}
                                accessoryRight={CalendarIcon}
                            />
                        </View>
                        <View >
                            <Select
                                style={{padding: 20}}
                                placeholder="             "
                                // label={evaProps => <Text {...evaProps}>Landslide feature</Text>}
                                label={evaProps =>                                             
                                    <Tooltip
                                        anchor={()=> renderFeatureTooltip({...evaProps})}
                                        visible={featureTooltip}
                                        onBackdropPress={() => setFeatureTooltip(false)}
                                        placement={'top start'}>
                                        Anong landslide feature ang naobserbahan?
                                    </Tooltip>}
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
                                placeholder='Hal. Crack A'
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
                                placeholder='Hal. Sa may skwelahan'
                                multiline={true}
                                textStyle={{ minHeight: 40 }}
                                value={featureLocation}
                                // label={evaProps => <Text {...evaProps}>Lugar o Lokasyon</Text>}
                                label={evaProps =>                                             
                                    <Tooltip
                                        anchor={()=> renderLugarTooltip({...evaProps})}
                                        visible={lugarTooltip}
                                        onBackdropPress={() => setLugarTooltip(false)}
                                        placement={'top start'}>
                                        {`Saan ito nakita? Gamitin ang mga lokasyon at ${'\n'}pwesto ng kalsada o mga mahahalagang istruktura sa paglarawan ng lokasyon ng feature.`}
                                    </Tooltip>}
                                caption={evaProps => <Text {...evaProps}>Required</Text>}
                                onChangeText={value => setFeatureLocation(value)}
                            />
                        </View>
                        <View>
                            <Input
                                style={styles.input}
                                placeholder='Hal. Edchelle'
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
                                placeholder=''
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
                            <View style={{height: 80, minHeight: 80, borderWidth: 5, borderRadius: 100, borderColor: '#32bbf8', marginTop: 5}}>
                                <Button
                                    appearance='ghost'
                                    status='info'
                                    style={styles.button}
                                    accessoryRight={CameraIcon} onPress={()=> {
                                        // initializeCamera();
                                    }}/>
                            </View>

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
                        <View styles={{justifyContent: 'space-between'}}>
                            <View style={{flexDirection: 'row', padding: 20}}>
                                <Text style={{textAlign: 'center', width: '100%'}} category="h6" status="basic">Manifestation of Movement Observations</Text>
                            </View>
                            <ScrollView horizontal={true} style={{alignContent: 'center'}}>
                                <View style={{minWidth: screenWidth * .95, margin: 10, backgroundColor: '#ffffff20'}}>
                                    <DataTable>
                                        <DataTable.Header>
                                            <DataTable.Title ><Text style={{color: 'white'}}>Petsa at Oras</Text></DataTable.Title>
                                            <DataTable.Title><Text style={{color: 'white'}}>Feature</Text></DataTable.Title>
                                            <DataTable.Title><Text style={{color: 'white'}}>Feature name</Text></DataTable.Title>
                                            <DataTable.Title><Text style={{color: 'white'}}>Reporter</Text></DataTable.Title>
                                            <DataTable.Title numeric><Text style={{color: 'white'}}>Action</Text></DataTable.Title>
                                        </DataTable.Header>
                                        <DataTable.Row>
                                            <DataTable.Cell><Text style={{color: 'white'}}>2012-01-01</Text></DataTable.Cell>
                                            <DataTable.Cell><Text style={{color: 'white'}}>Crack</Text></DataTable.Cell>
                                            <DataTable.Cell><Text style={{color: 'white'}}>Crack A</Text></DataTable.Cell>
                                            <DataTable.Cell><Text style={{color: 'white'}}>Edchelle</Text></DataTable.Cell>
                                            <DataTable.Cell numeric>
                                                <View style={{flexDirection: 'row'}}>
                                                    <Icon name="edit-outline" {...{"style": {"height": 20, "marginHorizontal": 5, "tintColor": "#fff", "width": 25}}}/>
                                                    <Icon name="trash-outline" {...{"style": {"height": 20, "marginHorizontal": 5, "tintColor": "#fff", "width": 25}}}/>
                                                </View>
                                            </DataTable.Cell>
                                        </DataTable.Row>
                                        <DataTable.Row>
                                            <DataTable.Cell><Text style={{color: 'white'}}>2012-01-01</Text></DataTable.Cell>
                                            <DataTable.Cell><Text style={{color: 'white'}}>Crack</Text></DataTable.Cell>
                                            <DataTable.Cell><Text style={{color: 'white'}}>Crack A</Text></DataTable.Cell>
                                            <DataTable.Cell><Text style={{color: 'white'}}>Edchelle</Text></DataTable.Cell>
                                            <DataTable.Cell numeric>
                                                <View style={{flexDirection: 'row'}}>
                                                    <Icon name="edit-outline" {...{"style": {"height": 20, "marginHorizontal": 5, "tintColor": "#fff", "width": 25}}}/>
                                                    <Icon name="trash-outline" {...{"style": {"height": 20, "marginHorizontal": 5, "tintColor": "#fff", "width": 25}}}/>
                                                </View>
                                            </DataTable.Cell>
                                        </DataTable.Row>
                                        <DataTable.Row>
                                            <DataTable.Cell><Text style={{color: 'white'}}>2012-01-01</Text></DataTable.Cell>
                                            <DataTable.Cell><Text style={{color: 'white'}}>Crack</Text></DataTable.Cell>
                                            <DataTable.Cell><Text style={{color: 'white'}}>Crack A</Text></DataTable.Cell>
                                            <DataTable.Cell><Text style={{color: 'white'}}>Edchelle</Text></DataTable.Cell>
                                            <DataTable.Cell numeric>
                                                <View style={{flexDirection: 'row'}}>
                                                    <Icon name="edit-outline" {...{"style": {"height": 20, "marginHorizontal": 5, "tintColor": "#fff", "width": 25}}}/>
                                                    <Icon name="trash-outline" {...{"style": {"height": 20, "marginHorizontal": 5, "tintColor": "#fff", "width": 25}}}/>
                                                </View>
                                            </DataTable.Cell>
                                        </DataTable.Row>
                                    </DataTable>
                                </View>
                            </ScrollView>
                            <Layout level="1" style={{flexDirection: 'row-reverse', marginTop: 10, marginBottom: 10}}>
                                <Layout style={{flexDirection: 'row'}}>
                                    <Icon name="arrow-left-outline" 
                                        {...{"style": {"height": 20, "marginHorizontal": 10, "tintColor": "#fff", "width": 25}}}
                                        onPress={()=> {console.log("LEFT")}}/>
                                    <Icon name="arrow-right-outline" 
                                        {...{"style": {"height": 20, "marginHorizontal": 10, "tintColor": "#fff", "width": 25}}}
                                        onPress={()=> {console.log("RIGHT")}}/>
                                </Layout>
                                <Layout style={{marginRight: 10}}>
                                    <Text>Page 1 of 4</Text>
                                </Layout>
                            </Layout>
                            <Layout>
                                <Button status="warning">Download</Button>
                            </Layout>
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
        // alignItems: 'center',
        // justifyContent: 'center',
        padding: 20,
    },
    input_container: {
        // flex: 1,
        // width: screenWidth * .9
    },
    layout: {
    //   flex: 1,
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