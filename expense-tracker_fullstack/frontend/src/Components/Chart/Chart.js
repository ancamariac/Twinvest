import React from 'react'
import moment from 'moment'
import { useState } from 'react'
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
   const { incomes, expenses } = useGlobalContext()

   function pressButton() {
      setDisplayInc(!displayinc);
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
   let res;
   if (displayinc) {
      res = <div style={{ height: '100%' }}>
         <button onClick={() => pressButton()} >Expenses</button>
         <ChartStyled>
            <Line data={data_incomes} options={options} />
         </ChartStyled>
      </div>
   } else {
      res = <div style={{ height: '100%' }}>
         <button onClick={() => pressButton()} >Incomes</button>
         <ChartStyled>
            <Line data={data_expenses} options={options} />
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