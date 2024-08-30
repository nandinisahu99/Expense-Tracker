import React from 'react'
import styled from 'styled-components'
import {Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement} from 'chart.js'
import {Line} from 'react-chartjs-2'
import { useGlobalContext } from '../context/ContextApi'
import { dateFormat } from '../utils/DateFromate'

ChartJs.register(
    CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement
)

export default function Chart() {
    const {income,Expenses}=useGlobalContext();

    const data={
        labels: income.map((obj)=>dateFormat(obj.date)),
        datasets:[
            {
                label:'Income',
                data:[
                    ...income.map((obj)=>obj.amount)
                ],
                backgroundColor: 'blue',
                tension: .2  //for line graph curve
            },
            {
                label: 'Expenses',
                data: [
                    ...Expenses.map((obj)=>obj.amount)
                ],
                backgroundColor: 'red',
                tension: .2
            }
        ]
    }

  return (
    <ChartStyle>
        <Line data={data}/>
    </ChartStyle>
  )
}

const ChartStyle=styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`;