import React from 'react'
import {useState} from 'react'
import {Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js/auto'


import {Line} from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import { dateFormat } from '../../utils/dateFormat'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

function Chart() {
    const [displayinc, setDisplayInc] = useState(true);
    const {incomes, expenses} = useGlobalContext()

    function pressButton() {
        setDisplayInc(!displayinc);
        console.log(displayinc)
      }

    let incomes_sorted = incomes.sort(function(a,b){
        return new Date(a.date) - new Date(b.date);
    });

    let expenses_sorted = expenses.sort(function(a,b){
        return new Date(a.date) - new Date(b.date);
    });

    console.log('expenses_sorted', expenses_sorted)

    const data_incomes = {
        labels:         
            incomes_sorted.map((inc) =>{
            const {date} = inc
            return dateFormat(date)
        }),
        datasets: [
            {
                label: 'Income',
                data: [
                    ...incomes_sorted.map((income) => {
                        const {amount} = income
                        return amount
                    })
                ],
                backgroundColor: 'green',
                tension: .2
            }
        ]
    }

    const data_expenses = {
        labels:         
            expenses_sorted.map((inc) =>{
            const {date} = inc
            return dateFormat(date)
        }),
        datasets: [
            {
                label: 'Expenses',
                data: [
                    ...expenses_sorted.map((expense) => {
                        const {amount} = expense
                        return amount
                    })
                ],
                backgroundColor: 'red',
                tension: .2
            }
        ]
    }
    let res;
    if (displayinc) {
        res = <div style={{height:'100%'}}>
            <button onClick={() => pressButton()} >Expenses</button> 
            <ChartStyled>
                <Line data={data_incomes} options={options}/>
            </ChartStyled>  
        </div>
    } else {
        res = <div>
            <button onClick={() => pressButton()} >Incomes</button>
            <ChartStyled>
                <Line data={data_expenses} options={options}/>   
            </ChartStyled>
        </div>
    }
    return (res)
}

const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            min: 0
        }
    }
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`;

export default Chart