
import React, { Fragment, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Modal as Mod, ScrollView, PermissionsAndroid, Image, ImageBackground} from 'react-native';
import { Layout, Text, Button, Icon, Card, Input} from '@ui-kitten/components';
import ScreenHeader from '../../utils/ScreenHeader';
import Modal from 'react-native-modal';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';
import CustomConfirm from '../../utils/CustomConfirm';

import moment from 'moment';

const ActivitySchedule = () => {
    const [openCalendar, setOpenCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [openForm, setOpenForm] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    const [datetimestamp, setDateTimestamp] = useState(new Date());
    const [imageFiles, setImageFiles] = useState([]);
    const [viewImage, setViewImage] = useState(null);
    const [openImageViewer, setOpenImageViewer] = useState(false);
    const [activityDetails, setActivityDetails] = useState("");
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [reporter, setReporter] = useState("");
    const [paksa, setPaksa] = useState("");
    const [activities, setActivities] = useState(
        {
            '2022-04-22': [{name: 'Pagpupulong', time: '10 AM - 12 PM', description: 'Meeting tungkol sa lunch'}, {name: 'Dinner', time: '12 AM - 1 PM', description: 'Meeting tungkol sa Dinner'}],
            '2022-04-23': [{name: 'item 2 - any js object',  time: '10 AM - 12 PM', description: 'Meeting tungkol sa lunch'}],
            '2022-05-24': [],
            '2022-04-24': [{name: 'item 3 - any js object',  time: '10 AM - 12 PM', description: 'Meeting tungkol sa lunch'}, {name: 'any js object',  time: '10 AM - 12 PM', description: 'Meeting tungkol sa lunch'}]
        }
    );

    const [displayConfirm, setDisplayConfirm] = useState(false);
    const [confirmStatus, setConfirmStatus] = useState("success");
    const [confirmDescription, setConfirmDescription] = useState({});

    const [markedDates, setMarkedDates] = useState({
        '2022-04-22': {marked: true},
        '2022-04-23': {marked: true},
        '2022-05-22': {marked: true},
        '2022-04-24': {marked: true},
    });

    const CalendarIcon = (props) => {
        return <Icon name="calendar-outline" {...props} onPress={()=> ToggleDateTimestamp()}/>
    }

    const ToggleDateTimestamp = () => {
        setOpenCalendar(!openCalendar);
    }

    const CameraIcon = (props) => {
        return <Icon name="camera-outline" {...{"style": {"height": 40, "marginHorizontal": 10, "tintColor": "#32bbf8", "width": 40}}}/>
    }

    const ImageIcon = (props) => {
        return <Icon name="image-outline" {...{"style": {"height": 40, "marginHorizontal": 10, "tintColor": "#32bbf8", "width": 40}}}/>
    }

    const handleImageViewer = (img_path) => {
        setOpenImageViewer(true);
        setViewImage(img_path)
    }

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

    const BrowseImage = async () => {
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

        launchImageLibrary(options, (res) => {
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
    }

    const ViewDetails = (item) => { 
        setSelectedActivity(item)
        setOpenDetails(true);
    }

    return(
        <Fragment>
            <ScreenHeader title="Activity Schedule"/>
            <Layout style={styles.container} level='1'>
                <Layout style={{flex: 1, width: '100%'}}>
                    {/* { Add loading } */}
                        <Agenda
                            items={activities}
                            loadItemsForMonth={month => {
                                console.log('trigger items loading');
                            }}
                            onCalendarToggled={calendarOpened => {
                                console.log(calendarOpened);
                            }}
                            onDayPress={day => {
                                console.log('day pressed', day);
                                setSelectedDate(moment(day.dateString).format("YYYY-MM-DD"));
                            }}
                            onDayChange={day => {
                                console.log('day changed');
                            }}
                            selected={selectedDate}
                            pastScrollRange={50}
                            futureScrollRange={50}
                            renderItem={(item, firstItemInDay) => {
                                return <TouchableOpacity style={{marginTop: 20, padding: 10, backgroundColor: 'white', width: '95%'}} onPress={()=> {
                                    //
                                    ViewDetails(item);
                                }}>
                                        <View style={{flex: 1, flexDirection: 'row'}}>
                                            <View style={{flex: 1}}>
                                                <View>
                                                    <Text category="p1" style={{color: '#5e5e5e'}}>{item.time}</Text>
                                                </View>
                                                <View>
                                                    <Text category="h6" style={{color: '#5e5e5e'}}>{item.name}</Text>
                                                </View>
                                                <View>
                                                    <Text category="c1" style={{color: '#5e5e5e'}}>{item.description}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>;
                            }}
                            rowHasChanged={(r1, r2) => {
                                return r1.text !== r2.text;
                            }}
                            renderEmptyDate={() => {
                                return <View style={{marginTop: 20, padding: 10, backgroundColor: 'white', width: '95%'}}>
                                            <View>
                                                <View>
                                                    <Text category="h6" style={{color: '#5e5e5e', paddingTop: 15}}>No appointment(s)</Text>
                                                </View>
                                                <View>
                                                    <Text style={{fontStyle: 'italic', textDecorationLine: 'underline'}} status="info" onPress={()=> {}}>Add event here!</Text>
                                                </View>
                                            </View>
                                        </View>;
                            }}
                            renderEmptyData={() => {
                                return <View />;
                            }}
                            showClosingKnob={false}
                            markedDates={markedDates}
                            disabledByDefault={false}
                            onRefresh={() => console.log('refreshing...')}
                            refreshing={false}
                            refreshControl={null}
                            style={{
                                borderBottomLeftRadius: 0,
                                borderBottomLeftRadius: 0,
                                borderTopRightRadius: 5,
                                borderTopLeftRadius: 5
                            }}
                            theme={{
                                agendaDayTextColor: '#939ea7',
                                agendaDayNumColor: '#939ea7',
                                agendaTodayColor: '#939ea7',
                                agendaKnobColor: '#939ea7',
                                backgroundColor: 'white',
                                calendarBackground: '#f7f7f7',
                                textSectionTitleColor: '#585858',
                                textSectionTitleDisabledColor: 'green',
                                selectedDayBackgroundColor: '#00adf5',
                                selectedDayTextColor: '#ffffff',
                                todayTextColor: '#00adf5',
                                dayTextColor: '#585858',
                                textDisabledColor: '#d9e1e8',
                                dotColor: '#00adf5',
                                selectedDotColor: '#ffffff',
                                arrowColor: 'orange',
                                disabledArrowColor: '#d9e1e8',
                                monthTextColor: '#585858',
                                indicatorColor: '#585858',
                                textDayFontWeight: '300',
                                textMonthFontWeight: 'bold',
                                textDayHeaderFontWeight: '300',
                                textDayFontSize: 16,
                                textMonthFontSize: 16,
                                textDayHeaderFontSize: 16
                              }}
                            />
                            <Button status="info" style={{borderBottomLeftRadius: 5, 
                                borderBottomRightRadius: 5, 
                                borderTopLeftRadius: 0, 
                                borderTopRightRadius: 0, 
                                borderRadius: 0}}
                                onPress={()=> setOpenForm(true)}
                                >
                                <Text>Add Event for {moment(selectedDate).format("LL")}</Text>
                            </Button>
                </Layout>
                {/* <Layout style={{flex: 0.1}}>
                    <Button status="info">Add Event</Button>
                </Layout> */}
            </Layout>
            <Mod      
                style={{width: '100%', height: '100%'}}
                visible={openDetails}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setOpenDetails(false)}>
                <Card disabled={true} style={{flex: 1}}>
                    <Layout style={{flexDirection: 'row-reverse', marginBottom: 20}}>
                        <Icon name="close-circle-outline" {...{"style": {"height": 50, "tintColor": "#fff", "width": 50}}}
                                onPress={()=> setOpenDetails(false)}/>
                    </Layout>
                    <ScrollView>
                        <Layout style={{justifyContent: 'center', paddingBottom: 60}}>
                            <Layout>
                                <Input
                                    style={styles.input}
                                    // placeholder={}
                                    value={selectedActivity && selectedActivity.time}
                                    label={evaProps => <Text {...evaProps}>Petsa at Oras</Text>}
                                    editable={false}
                                    InputProps
                                    // caption={evaProps => <Text {...evaProps}>Required</Text>}
                                    // onChangeText={value => setReporter(value)}
                                />
                            </Layout>
                            <Layout>
                                <Input
                                    style={styles.input}
                                    placeholder='Hal. Juan Dela Cruz'
                                    // value={reporter}
                                    value={selectedActivity && selectedActivity.name}
                                    label={evaProps => <Text {...evaProps}>Paksa</Text>}
                                    editable={false}
                                    // caption={evaProps => <Text {...evaProps}>Required</Text>}
                                    // onChangeText={value => setReporter(value)}
                                />   
                            </Layout>
                            <Layout>
                                <Input
                                    style={styles.input}
                                    placeholder='Hal. Juan Dela Cruz'
                                    // value={reporter}
                                    value={selectedActivity && selectedActivity.description}
                                    label={evaProps => <Text {...evaProps}>Detalye</Text>}
                                    editable={false}
                                    multiline={true}
                                    textStyle={{ minHeight: 300 }}
                                    // caption={evaProps => <Text {...evaProps}>Required</Text>}
                                    // onChangeText={value => setReporter(value)}
                                />
                            </Layout>
                        </Layout>
                    </ScrollView>
                </Card>
            </Mod>


            <Mod      
                style={{width: '100%', height: '100%'}}
                visible={openForm}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setOpenForm(false)}>
                <Card disabled={true} style={{flex: 1}}>
                    <Layout style={{flexDirection: 'row-reverse', marginBottom: 20}}>
                        <Icon name="close-circle-outline" {...{"style": {"height": 50, "tintColor": "#fff", "width": 50}}}
                                onPress={()=> setOpenForm(false)}/>
                    </Layout>
                    <ScrollView>
                        <Layout style={{justifyContent: 'center', paddingBottom: 60}}>
                            <Layout style={{flexDirection: 'row'}}>
                                <Layout style={{flex: 0.7}}>
                                    <Input
                                        style={styles.input}
                                        placeholder='Hal. XXXYYYZZZ'
                                        value={moment(datetimestamp).format("YYYY-MM-DD hh:mm A")}
                                        label={evaProps => <Text {...evaProps}>Petsa at Oras</Text>}
                                        caption={evaProps => <Text {...evaProps}>Required</Text>}
                                        accessoryRight={CalendarIcon}
                                    />
                                </Layout>
                                <Layout style={{flex: 0.3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                    <Layout>
                                        <Button
                                            appearance='ghost'
                                            status='info'
                                            style={styles.button}
                                            accessoryRight={CameraIcon} onPress={()=> {
                                                initializeCamera();
                                        }}/>
                                    </Layout>
                                    <Layout>
                                        <Button
                                            appearance='ghost'
                                            status='info'
                                            style={styles.button}
                                            accessoryRight={ImageIcon} onPress={()=> {
                                                BrowseImage();
                                        }}/>
                                    </Layout>
                                </Layout>
                            </Layout>
                            <Layout>
                                <Layout>
                                    <Input
                                        style={styles.input}
                                        placeholder='Hal. Pagpupulong'
                                        value={paksa}
                                        label={evaProps => <Text {...evaProps}>Paksa</Text>}
                                        caption={evaProps => <Text {...evaProps}>Required</Text>}
                                        onChangeText={value => setPaksa(value)}
                                    />
                                </Layout>
                                <Layout>
                                    <Input
                                        style={styles.input}
                                        placeholder='Hal. XXXYYYZZZ'
                                        multiline={true}
                                        textStyle={{ minHeight: 300 }}
                                        value={activityDetails}
                                        label={evaProps => <Text {...evaProps}>Activity details</Text>}
                                        caption={evaProps => <Text {...evaProps}>Required</Text>}
                                        onChangeText={value => setActivityDetails(value)}
                                    />
                                </Layout>
                                <Layout>
                                    <Input
                                        style={styles.input}
                                        placeholder='Hal. Juan Dela Cruz'
                                        value={reporter}
                                        label={evaProps => <Text {...evaProps}>Reporter</Text>}
                                        caption={evaProps => <Text {...evaProps}>Required</Text>}
                                        onChangeText={value => setReporter(value)}
                                    />
                                </Layout>
                                <Layout>
                                    <View style={{textAlign: 'center', flex: 1, alignItems: 'center'}}>
                                        <ScrollView horizontal={true}>
                                            {
                                                imageFiles.length > 0 ?
                                                    imageFiles.map((image)=> (
                                                        <TouchableOpacity style={{padding: 5, marginBottom: 10}}
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
                                </Layout>
                                <Layout>
                                    <Button status="info" style={{margin: 10}} onPress={()=> {
                                        let date = moment(datetimestamp).format("YYYY-MM-DD");

                                        let tempActivities = {...activities};
                                        let tempKeyValue = tempActivities[date];
                                        if (tempKeyValue) {
                                            tempActivities[date].push({
                                                name: `${paksa} (${reporter})`,
                                                time: moment(datetimestamp).format("hh:mm:ss A"),
                                                description: activityDetails
                                            })
                                        } else {
                                            tempActivities[date] = [{
                                                name: `${paksa} (${reporter})`,
                                                time: moment(datetimestamp).format("hh:mm:ss A"),
                                                description: activityDetails
                                            }]
                                        }
                                        setActivities(tempActivities);

                                        let tempMarkedDates = {...markedDates};
                                        tempMarkedDates[date] = {marked: true};
                                        setMarkedDates(tempMarkedDates);

                                        setConfirmDescription({
                                            title: 'Successfully added!',
                                            caption: `${paksa} - ${reporter}`
                                        })
                                        setDisplayConfirm(true);
                                    }}>Save activity</Button>
                                </Layout>
                            </Layout>
                        </Layout>
                    </ScrollView>
                </Card>
            </Mod>
            <DatePicker
                modal
                mode={"date"}
                open={openCalendar}
                date={datetimestamp}
                onConfirm={(date) => {
                    setOpenCalendar(false);
                    setDateTimestamp(date);
                }}
                onCancel={() => {
                    setOpenCalendar(false)
                }}
            />
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
                callback={()=> {
                 setDisplayConfirm(false);
                 setOpenForm(false);
                }}
             /> 
        </Fragment>
    )
}


export default ActivitySchedule;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
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
        margin: 10,
        textAlign: 'center',
    },
    calendar: {
        width: '100%',
    },
    buttonGroup: {
        paddingRight: 50,
        paddingLeft: 50,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        height: 50,
        width: 50
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});