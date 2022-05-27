import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import HighchartsWebView from 'highcharts-react-native';
import moment from 'moment';

const SurficialGraph = (props) => {
    const [surficialData, setSurficialData] = useState([]);
    useEffect(()=> {
        let temp = [];
        props.data.forEach(element => {
            let name = element.marker_name;
            let data = [];
            element.data.forEach(data_element => {
                data.push({
                    x: data_element.x,
                    // x: moment(data_element.x).format("YYYY-MM-DD HH:mm:ss"),
                    y: data_element.y
                })
            });

            temp.push({
                name,
                data
            });
        });

        setSurficialData(temp)
    }, [])

    const configuration = {
        xAxis: {
            type: "datetime",
            dateTimeLabelFormats: {
                month: "%e. %b %Y",
                year: "%b"
            },
            title: {
                text: "<b>Date</b>"
            },
        },
        yAxis: {
            title: {
                text: "<b>Measurement (cm)</b>"
            }
        },
        plotOptions: {
            line: {
                marker: {
                    enabled: true
                },
                dashStyle: "ShortDash"
            },
        },
        series: surficialData,
      };

    return(
      <HighchartsWebView
        style={{ height: 300 }}
        config={configuration} />
    )

}

export default SurficialGraph;