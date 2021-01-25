import React, {useState, useEffect} from 'react';
import './LineGraph.css';
import {Line} from 'react-chartjs-2'
import numeral from 'numeral';

const options = {
    legend: {
        display: false,
    },
    elements: {
        points: {
            radius: 0
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
            label: function(tooltipItem, data){
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes:[
            {
                type: 'time',
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll"
                },
            },
        ],
        yAxes: [
            {
                gridlines: {
                    display: false,
                },
                ticks: {
                    callback: function(value, index, values){
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
}

function LineGraph({CasesType='cases'}) {

    const [data, setdata] = useState({});

    const BuildChartData = (data, CasesType='cases')=>{
        let ChartData = [];
        let lastdatapoint;
        for(let date in data.cases){
            if(lastdatapoint){
                let newdatapoint ={
                    x: date,
                    y: data[CasesType][date] - lastdatapoint,
                };
                ChartData.push(newdatapoint);
            }
            lastdatapoint = data[CasesType][date];
        }
        return ChartData;
    }

    useEffect(()=>{
        const FetchData = async()=>{
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then((response)=> {
                return response.json();
            })
            .then((data)=>{
            let chartdata  = BuildChartData(data, "cases");
            setdata(chartdata);
            });
        }
        FetchData();
    },[]);

    
    return (
        <div className='line-graph-container'>
            <div className='line-graph-title'><strong>WorldWide New Cases</strong></div>
            <div>
                {data?.length > 0 && (
                    <Line
                    options ={options}
                    data = {{
                        datasets: [{
                            backgroundColor: "rgba(204,16,52,0.5)",
                            borderColor: "#CC1034",
                            data: data,
                        }]
                    }}
                    />
                )}
            </div>
        </div>
    )
}

export default LineGraph;
