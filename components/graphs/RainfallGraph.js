import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import HighchartsWebView from 'highcharts-react-native';
import moment from 'moment';
import chroma from "chroma-js";

const RainfallGraph = (props) => {
    const { data , view } = props;
    const [processedData, setProcessedData] = useState([]);

    const default_data = {
        set: {
            "24h": [],
            "72h": [],
            rain: [],
            null_ranges: [],
            max_rval: 0,
            max_72h: 0,
            gauge_name: "loading",
            distance: 0,
            data_source: "loading",
            threshold_value: 0,
            rain_id: null
        },
        series_data: [],
        max_rval_data: []
    };
    
    const observed_data_dict = {
        "-1": "Actual is lower than recorded",
        "0": "No rainfall/Data is zero",
        "1": "Actual is higher than recorded"
    };
    
    const rainfall_colors = {
        "24h": "rgba(73, 105, 252, 0.9)",
        "72h": "rgba(239, 69, 50, 0.9)",
        rain: "rgba(0, 0, 0, 0.9)"
    };

    const createRainPlotSubtitle = (distance, gauge_name) => {
        const source = gauge_name.toUpperCase().replace("RAIN_", "");
        const subtitle = distance === null ? source : `${source} (${distance} km away)`;
        return subtitle;
    }

    const prepareRainfallData = (set) => {
        const { null_ranges, invalid_data } = set;
        const series_data = [];
        const max_rval_data = [];
    
        Object.keys(rainfall_colors).forEach((name) => {
            const color = rainfall_colors[name];
    
            let data = set[name];
            if (name === "rain") {
                // data = processInstantaneousRainData(data, invalid_data);
            }
    
            const entry = {
                name,
                step: true,
                data,
                color,
                id: name,
                fillOpacity: 1,
                lineWidth: 1,
                turboThreshold: 100000
            };
    
            if (name !== "rain") series_data.push(entry);
            else max_rval_data.push(entry);
        });
    
        const null_processed = null_ranges.map(({ from, to }) => ({ from, to, color: "rgba(68, 170, 213, 0.3)" }));
    
        return { set, series_data, max_rval_data, null_processed };
    }

    const prepareCumulativeRainfallChartOption = (row) => {
        const { set, series_data } = row;
        const {
            distance, max_72h, 
            threshold_value: max_rain_2year, gauge_name
        } = set;
        
        return {
            series: series_data,
            chart: {
                type: "line",
                zoomType: "x",
                panning: true,
                panKey: "shift",
                height: 600,
                resetZoomButton: {
                    position: {
                        x: 0,
                        y: -30
                    }
                },
                spacingTop: 16,
                spacingRight: 24
            },
            title: {
                text: `<b>Cumulative Rainfall Chart of ${createRainPlotSubtitle(distance, gauge_name)}</b><br/>As of: <b>${moment().format("D MMM YYYY, HH:mm")}</b>`,
                style: { fontSize: "0.85rem" },
                margin: 26,
                y: 20
            },
            xAxis: {
                type: "datetime",
                dateTimeLabelFormats: {
                    month: "%e %b %Y",
                    year: "%Y"
                },
                title: {
                    text: "<b>Date</b>"
                },
                events: {
                    setExtremes: syncExtremes
                }
            },
            yAxis: {
                title: {
                    text: "<b>Value (mm)</b>"
                },
                max: Math.max(0, (max_72h - parseFloat(max_rain_2year))) + parseFloat(max_rain_2year),
                min: 0,
                plotBands: [{
                    value: Math.round(parseFloat(max_rain_2year / 2) * 10) / 10,
                    color: rainfall_colors["24h"],
                    dashStyle: "shortdash",
                    width: 2,
                    zIndex: 0,
                    label: {
                        text: `24-hr threshold (${max_rain_2year / 2})`
        
                    }
                }, {
                    value: max_rain_2year,
                    color: rainfall_colors["72h"],
                    dashStyle: "shortdash",
                    width: 2,
                    zIndex: 0,
                    label: {
                        text: `72-hr threshold (${max_rain_2year})`
                    }
                }]
            },
            plotOptions: {
                series: {
                    marker: {
                        radius: 3
                    },
                    cursor: "pointer"
                }
            }
        };
    }

    useEffect(() => {
        const temp = [];
        data.forEach(set => {
            const data = prepareRainfallData(set);
            temp.push(data);
        });
        
        if (temp.length > 0) setProcessedData(temp);
    }, [data]);

    useEffect(() => {
        const temp = [];
        processedData.forEach(data => {
            // const instantaneous = prepareInstantaneousRainfallChartOption(data);
            const cumulative = prepareCumulativeRainfallChartOption(data);
            temp.push({ instantaneous, cumulative });
        });
        setOptions(temp);
        if (temp.length > 0 && save_svg) setGetSVGNow(true);
    }, [processedData]);


    return(
        <View></View>
    )
}

export default RainfallGraph;