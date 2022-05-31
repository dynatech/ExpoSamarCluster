import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import HighchartsWebView from 'highcharts-react-native';
import moment from 'moment';
import chroma from "chroma-js";

const SubsurfaceGraph = (props) => {
    const [colpos, setColpos] = useState([]);
    const [displacement, setDisplacement] = useState([]);
    const [velocityPlot, setVelocityPlot] = useState([]);
    const [graphContainer, setGraphContainer] = useState([]);
    const [data, setData] = useState(null);

    const prepareColumnPositionChartOption = (set_data) => {
        const { data, max_position, min_position, orientation } = set_data;
        const xAxisTitle = orientation === "across_slope" ? "Across Slope" : "Downslope";
        return {
            graph_view: orientation === "across_slope" ? "cp-a" : "cp-d",
            series: data,
            chart: {
                type: "scatter",
                zoomType: "x",
                height: 800,
                resetZoomButton: {
                    position: {
                        x: 0,
                        y: -30
                    }
                },
                spacingTop: 20,
                spacingRight: 24
            },
            title: {
                text: `<b>Column Position Plot of LPA</b>`,
                style: { fontSize: "1rem" }
            },
            xAxis: {
                min: max_position,
                max: (min_position + 0.02),
                gridLineWidth: 1,
                title: {
                    text: `<b>Horizontal displacement,  (m)</b>`
                }
            },
            yAxis: {
                title: {
                    text: "<b>Depth (m)</b>"
                }
            },
            plotOptions: {
                series: {
                    lineWidth: 2,
                    marker: {
                        enabled: true,
                        radius: 3,
                        lineColor: null
                    }
                }
            },
            // time: { timezoneOffset: -8 * 60 }
        };
    }

    const prepareDisplacementChartOption = (set_data) => {
        const { orientation, data, annotations } = set_data;
        const xAxisTitle = orientation === "across_slope" ? "Across Slope" : "Downslope";
        return {
            graph_view: orientation === "across_slope" ? "dp-a" : "dp-d",
            series: data,
            chart: {
                type: "line",
                zoomType: "x",
                panning: true,
                panKey: "shift",
                height: 800,
                resetZoomButton: {
                    position: {
                        x: 0,
                        y: -30
                    }
                },
                spacingTop: 20,
                spacingRight: 24
            },
            title: {
                text: `<b>Displacement Plot</b>`,
                style: { fontSize: "1rem" },
                margin: 20,
                y: 16
            },
            subtitle: {
                text: `As of: <b>${moment().format("D MMM YYYY, HH:mm")}</b><br><br><b>Note: </b> (+/-) consistently increasing/decreasing trend`,
                style: { fontSize: "0.6rem" }
            },
            xAxis: {
                type: "datetime",
                dateTimeLabelFormats: {
                    month: "%e %b %Y",
                    year: "%Y"
                },
                title: {
                    text: "<b>Date</b>"
                }
            },
            yAxis: {
                plotBands: annotations,
                title: {
                    text: "<b>Relative Displacement (mm)</b>"
                }
            },
            plotOptions: {
                spline: {
                    marker: {
                        enabled: true
                    }
                }
            },
        };
    }

    const prepareVelocityAlertsOption = (set_data) => {
        const { data, orientation } = set_data;
        const xAxisTitle = orientation === "across_slope" ? "Across Slope" : "Downslope";
        const categories = data.map(x => x.name).filter(x => typeof x === "number");
        categories.unshift(0);
        
        return {
            graph_view: orientation === "across_slope" ? "va-a" : "va-d",
            series: data,
            chart: {
                type: "line",
                zoomType: "x",
                panning: true,
                panKey: "shift",
                height: 800,
                resetZoomButton: {
                    position: {
                        x: 0,
                        y: -30
                    }
                },
                spacingTop: 20,
                spacingRight: 24
            },
            title: {
                text: `<b>Velocity Alerts Plot</b>`,
                style: { fontSize: "1rem" },
                margin: 20,
                y: 16
            },
            subtitle: {
                text: `As of: <b>${moment().format("D MMM YYYY, HH:mm")}</b>`,
                style: { fontSize: "0.6rem" }
            },
            xAxis: {
                type: "datetime",
                dateTimeLabelFormats: {
                    month: "%e %b %Y",
                    year: "%Y"
                },
                title: {
                    text: "<b>Time</b>"
                }
            },
            legend: {
                enabled: false
            },
            yAxis: {
                categories,
                reversed: true,
                title: {
                    text: "<b>Nodes</b>"
                },
                labels: {
                    formatter () {
                        return this.value;
                    }
                }
            },
            plotOptions: {
                line: {
                    marker: {
                        enabled: true,
                        radius: 2
                    }
                }
            },
        };
    }

    useEffect(()=> {
        props.data.forEach(element => {
            const { data: data_list, type} = element;
            switch(type) {
                case "column_position":
                    const col_position_data = [];
                    data_list.data.forEach(({ orientation, data: series_list, max_position, min_position }) => {
                        const colored_data = assignColorToEachSeries(series_list);
                        colored_data.forEach(row => { row.turboThreshold = 100000; });
                        const col_data = { 
                            ...element,
                            data: colored_data,
                            orientation,
                            max_position: data_list.max_position,
                            min_position: data_list.min_position,
                            type
                        };
                        col_position_data.push(col_data);
                    });
                    setColpos(col_position_data)
                    break;
                case "displacement":
                    const displacement_data = [];
                    data_list.forEach((element, index) => {
                        const { data: series_list, annotations } = element;
                
                        series_list[0].type = "area";
                        const colored_data = assignColorToEachSeries(series_list);
                        colored_data.forEach(row => { row.turboThreshold = 100000; });
                
                        annotations.forEach((line) => {
                            line.width = 0;
                            line.label.style = { color: "gray" };
                        });
                
                        const col_data = {
                            ...element,
                            data: colored_data,
                            annotations,
                            type
                        };
                
                        displacement_data.push(col_data);
                    });
                    setDisplacement(displacement_data);
                    break;
                case "velocity_alerts":
                    const { velocity_alerts, timestamps_per_node } = data_list;
                    const velocity_data = [];
                    const processed_data = assignColorToEachSeries(timestamps_per_node);
                    velocity_alerts.forEach(row => {
                        const { orientation, data: series_list } = row;
                        const alerts = series_list;
                        const colored_data = [...processed_data];
                        Object.keys(alerts).forEach((alert) => {
                            const radius = alert === "L2" ? 7 : 10;
                            const color = alert === "L2" ? "#FFFF00" : "#FF0000";
                            const series = {
                                data: alerts[alert],
                                type: "scatter",
                                zIndex: 5,
                                name: alert,
                                marker: {
                                    symbol: "triangle",
                                    radius,
                                    fillColor: color,
                                    lineColor: "#000000",
                                    lineWidth: 2
                                }
                            };
                            colored_data.push(series);
                        });
                
                        const col_data = {
                            data: colored_data,
                            type,
                            orientation
                        };
                
                        velocity_data.push(col_data);
                    });
                    setVelocityPlot(velocity_data)
                    break;
                case "comms_health":
                    break;
            }
        });
    }, [props]);

    useEffect(()=> {
        if (graphContainer.length != 0) {
            let selected_graph_data = graphContainer.find(o => o.graph_view == props.view);
            setData(selected_graph_data)
        }
    }, [props, graphContainer]);

    useEffect(()=> {
        let temp = [];
        colpos.forEach(element => {
            temp.push(prepareColumnPositionChartOption(element));
        });

        displacement.forEach(element => {
            temp.push(prepareDisplacementChartOption(element));
        });

        velocityPlot.forEach(element => {
            temp.push(prepareVelocityAlertsOption(element));
        })

        setGraphContainer(temp);
    }, [colpos, displacement, velocityPlot]);

    const assignColorToEachSeries = (data_array) => {
        const size = data_array.length;
        const rainbow_colors = chroma.scale(["#f00", "#0f0", "#00f"]).mode("hsl")
        .domain([0, size - 1]);
        const data = [...data_array];
        for (let i = 0; i < size; i += 1) {
            if (data_array[i].name !== "Cumulative") data[i].color = rainbow_colors(i).name();
        }
        return data;
    }

    return(
        <View>
            {
                data != null && 
                <HighchartsWebView
                    style={{ height: 800 }}
                    config={data} />
            }
        </View>
    )
}  

export default SubsurfaceGraph;