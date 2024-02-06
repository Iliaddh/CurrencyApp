import React, { useState } from 'react';
import { convertData } from '../../helpers/convertData';
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts"
import styles from "../modules/Chart.module.css"

function Chart({chart, setChart}) {
  const [type, setType] = useState("prices")
  console.log(convertData(chart, type))
  return (
    <div className={styles.container}>
        <span onClick={() => setChart(null)} className={styles.cross}>X</span>
        <div className={styles.chart}>
          <div className={styles.graph}>
            <ChartComponent data={convertData(chart, type)} type={type}></ChartComponent>
          </div>
        </div>
    </div>
  )
}

export default Chart;

const ChartComponent = ({data,type}) =>{
  return (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart width={400} height={400} data={data}>
                <Line type="monotone" dataKey={type} stroke="#3874ff"  strokeWidth="2px"></Line>
                <CartesianGrid stroke='#404042'></CartesianGrid>
                <YAxis dataKey={type} domain={["auto", "auto"]}></YAxis>
                <XAxis dataKey="date" hide></XAxis>
                <Legend></Legend>
                <Tooltip></Tooltip>
              </LineChart>
            </ResponsiveContainer>
  )
}