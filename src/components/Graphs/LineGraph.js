import React, {useState, useEffect} from 'react';
import './LineGraph.css';
import {Line} from 'react-chartjs2';

function LineGraph() {

    const [data, setdata] = useState({});

    useEffect(()=>{
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')

    },[]);

    return (
        <div className='line-graph-container'>
            <div className='line-graph-title'><strong>WorldWide New Cases</strong></div>
        </div>
    )
}

export default LineGraph;
