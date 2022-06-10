import React, { Fragment, useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Dimensions} from 'react-native';
import { Layout, Text, Input, Button, Icon, Select, SelectItem } from '@ui-kitten/components';
import ScreenHeader from '../../utils/ScreenHeader';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import CustomConfirm from '../../utils/CustomConfirm';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const SurficialMarker = () => {
    const [datetimestamp, setDateTimestamp] = useState(new Date())
    const [openCalendar, setOpenCalendar] = useState(false);
    const [selectedPanahonIndex, setSelectedPanahonIndex] = useState(null);
    const [markerMeasurement, setMarkerMeasurement] = useState({});
    const [reporter, setReporter] = useState("");
    const [displayConfirm, setDisplayConfirm] = useState(false);

    const marker_names = [
        {name: 'A'},
        {name: 'B'},
        {name: 'C'}
    ]

    const panahon_list = [
        {panahon: 'Maaraw'},
        {panahon: 'Maulan'},
        {panahon: 'Maambon'},
        {panahon: 'Maulap'},
    ]

    const CalendarIcon = (props) => {
        return <Icon name="calendar-outline" {...props} onPress={()=> ToggleDateTimestamp()}/>
    }

    const ToggleDateTimestamp = () => {
        setOpenCalendar(!openCalendar);
    }

    const handleMarkerSubmission = () => {
        setDisplayConfirm(true)
    }

    return(
        <Fragment>
            <ScreenHeader title="Surficial Marker"/>
            <Layout style={styles.container} level='1'>
                <ScrollView>
                    <Layout style={styles.input_container}>
                        <View>
                            <Input
                                style={styles.input}
                                placeholder='E.g. XXXYYYZZZ'
                                value={moment(datetimestamp).format("YYYY-MM-DD hh:mm A")}
                                label={evaProps => 
                                    <View style={{flexDirection: 'row'}}>
                                        <Text {...evaProps}>Petsa at Oras ng pag sukat  </Text>
                                        <Icon name='question-mark-circle-outline' fill='#8994ad' width={17} height={17} />
                                    </View>}
                                caption={evaProps => <Text {...evaProps}>Required</Text>}
                                accessoryRight={CalendarIcon}
                                // onChangeText={handleChange('household_head')}
                                // onBlur={handleBlur('household_head')}
                            />
                        </View>
                        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                            {
                                marker_names.map((row, index)=>(
                                    <Input
                                        key={index}
                                        style={styles.input_group}
                                        placeholder='E.g. XXXYYYZZZ'
                                        // value={moment(datetimestamp).format("YYYY-MM-DD hh:mm A")}
                                        label={evaProps => 
                                            <View style={{flexDirection: 'row'}}>
                                                <Text {...evaProps}>Sukat ni {row.name}  </Text>
                                                <Icon name='question-mark-circle-outline' fill='#8994ad' width={17} height={17} />
                                            </View>
                                        }
                                        caption={evaProps => <Text {...evaProps}>Required</Text>}
                                        onChangeText={(e)=> {
                                            let temp = {...markerMeasurement};
                                            temp[row.name] = e;
                                            setMarkerMeasurement(temp);
                                        }}
                                        // onBlur={handleBlur('household_head')}
                                    />
                                ))
                            }
                        </View>
                        <View >
                            <Select
                                style={{padding: 20}}
                                placeholder="             "
                                label={evaProps => 
                                <Text {...evaProps}>Panahon:</Text>}
                                caption={evaProps => <Text {...evaProps}>Required</Text>}
                                value={selectedPanahonIndex && panahon_list[selectedPanahonIndex.row].panahon}
                                selectedIndex={selectedPanahonIndex}
                                onSelect={index => setSelectedPanahonIndex(index)}>
                                    {
                                        panahon_list.map((row, index)=> (
                                            <SelectItem key={index} title={row.panahon} value={row.panahon}/>
                                        ))
                                    }
                            </Select>
                        </View>
                        <View >
                            <Input
                                style={styles.input}
                                placeholder='E.g. XXXYYYZZZ'
                                value={reporter}
                                label={evaProps => <Text {...evaProps}>Pangalan ng nag sukat:</Text>}
                                caption={evaProps => <Text {...evaProps}>Required</Text>}
                                onChangeText={e => setReporter(e)}
                                // onBlur={handleBlur('household_head')}
                            />
                        </View>
                        <View >
                            <Button status="info" onPress={()=> {handleMarkerSubmission()}}>Submit</Button>
                        </View>
                    </Layout>
                </ScrollView>
                {/* <Layout style={[styles.container, {backgroundColor: 'green'}]}>
                    <Text>GRAPH SECTION</Text>
                </Layout> */}
            </Layout>
            <DatePicker
                modal
                open={openCalendar}
                date={datetimestamp}
                onConfirm={(date) => {
                    setOpenCalendar(false)
                    setDateTimestamp(date)
                }}
                onCancel={() => {
                    setOpenCalendar(false)
                }}
            />
            <CustomConfirm 
                title={"Are you sure?"}
                caption={"Sigurado ka ba?"}
                displayConfirm={displayConfirm}
                confirmStatus={"notify"}
                setDisplayConfirm={setDisplayConfirm}
                callback={(stat)=> {
                    setDisplayConfirm(false);}}
                withCancel={true}/>
        </Fragment>
    )
}

export default SurficialMarker;

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
        // textAlign: 'center',
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
    input_group: {
        width: (screenWidth / 3) * .85,
        paddingLeft: 20,
        margin: 0,
        textAlign: 'center',
    },
    buttonGroup: {
        paddingRight: 50,
        paddingLeft: 50,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    }
});