import React from 'react'

import { Chart as ChartJs, Title, Tooltip, Legend } from 'chart.js';

import { Pie } from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'

ChartJs.register(Title, Tooltip, Legend);

function PieChart() {

   const { incomes, expenses } = useGlobalContext()

   const incomeByCategory = {};
   for (let income of incomes) {
      const category = income.category;
      incomeByCategory[category] = (incomeByCategory[category] || 0) + income.amount;
   }

   const expenseByCategory = {};
   for (let expense of expenses) {
      const category = expense.category;
      expenseByCategory[category] = (expenseByCategory[category] || 0) + expense.amount;
   }

   const data_incomes = {
      labels: Object.keys(incomeByCategory),
      datasets: [
         {
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#A0522D', '#32CD32'],
            data: Object.values(incomeByCategory),
         }
      ]
   }

   const data_expenses = {
      labels: Object.keys(expenseByCategory),
      datasets: [
         {
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#A0522D', '#32CD32'],
            data: Object.values(expenseByCategory),
         }
      ]
   }

   return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
         <PieChartStyled>
            <Pie data={data_incomes} options={optionsIncome} />
         </PieChartStyled>
         <PieChartStyled>
            <Pie data={data_expenses} options={optionsExpense} />
         </PieChartStyled>
      </div>
   )
}

const optionsIncome = {
   responsive: true,
   maintainAspectRatio: false,
   plugins: {
      legend: {
         position: 'left',
      },
      title: {
         display: true,
         text: 'Income by Category',
      },
   },
}

const optionsExpense = {
   responsive: true,
   maintainAspectRatio: false,
   plugins: {
      legend: {
         position: 'right',
      },
      title: {
         display: true,
         text: 'Expense by Category',
      },
   },
}

const PieChartStyled = styled.div`
   background: #FCF6F9;
   border: 2px solid #FFFFFF;
   box-shadow: 0px 1px 15px;
   padding: 1rem;
   border-radius: 20px;
   height: 100%;
   width: 100%;
   margin-right: 3rem;
`;

export default PieChart