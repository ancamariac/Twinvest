import React from 'react'
import moment from 'moment'
import { useState, useEffect, setState } from 'react'
import {
   Chart as ChartJs,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend,
   ArcElement,
} from 'chart.js/auto'

import { Line } from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'

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
   const { incomes, expenses } = useGlobalContext()

   const [stateSelected, setStateSelected] = useState('expenses');

   function pressButton(param) {
      if (param === 'expenses') {
         setStateSelected('expenses')
         setState(data_expenses);
      } else {
         setStateSelected('incomes')
         setState(data_incomes);
      }
   }

   let incomes_sorted = incomes.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
   });

   let expenses_sorted = expenses.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
   });

   const incomeByMonth = {};
   for (let income of incomes_sorted) {
      const monthYear = moment(income.date).format('MMMM');
      incomeByMonth[monthYear] = (incomeByMonth[monthYear] || 0) + income.amount;
   }

   const expenseByMonth = {};
   for (let expense of expenses_sorted) {
      const monthYear = moment(expense.date).format('MMMM');
      expenseByMonth[monthYear] = (expenseByMonth[monthYear] || 0) + expense.amount;
   }

   const data_incomes = {
      labels: Object.keys(incomeByMonth),
      datasets: [
         {
            label: 'Income',
            data: Object.values(incomeByMonth),
            backgroundColor: 'green',
            tension: .2
         }
      ]
   }

   const data_expenses = {
      labels: Object.keys(expenseByMonth),
      datasets: [
         {
            label: 'Expenses',
            data: Object.values(expenseByMonth),
            backgroundColor: 'red',
            tension: .2
         }
      ]
   }

   const [state, setState] = useState({
      labels: Object.keys(expenseByMonth),
      datasets: [
         {
            label: 'Expenses',
            data: Object.values(expenseByMonth),
            backgroundColor: 'red',
            tension: .2
         }
      ]
   })

   let res;
   res = 
   <div style={{ height: '100%', position: 'relative'}}>
      <SelectStateStyled>
         <div className="state margin-right">
            <div className="state-title">
               Expenses
            </div>
            <input checked={stateSelected === 'expenses'} onClick={() => pressButton('expenses')} type="radio" id="selectData_expenses" name="selectData" value="expenses" ></input>
         </div>
         <div className="state">
            <div className="state-title">
               Incomes
            </div>
            <input checked={stateSelected === 'incomes'} onClick={() => pressButton('incomes')} type="radio" id="selectData_incomes" name="selectData" value="incomes"></input>
         </div>
      </SelectStateStyled>
      <ChartStyled>
         <Line data={state} options={options} />
      </ChartStyled>
   </div>
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
   padding-top: 20px;
`;

const SelectStateStyled = styled.div`
   position: absolute;
   right: 0;
   top: 0;
   display: flex;
   background: rgba(34, 34, 96, 0.6);
   color: white;
   border-radius: 0 20px 0 20px;
   padding: 3px 10px 3px 10px;
   display: flex;
   justify-content: space-between;
   width: auto;
   .state {
      display: flex;
      .state-title {
         margin-right: 3px;
         font-size: 13px;
      }
      input {
         cursor: pointer;
      }
   }
   .margin-right {
      margin-right: 10px;
   }
`

export default Chart