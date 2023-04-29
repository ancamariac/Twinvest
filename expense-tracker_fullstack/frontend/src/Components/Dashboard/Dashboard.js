import LineChart from '../Chart/LineChart'
import PieChart from '../Chart/PieChart'
import React, { useEffect } from 'react'
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import "./Dashboard.style.scss";

function Dashboard() {

   const { totalExpenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()

   useEffect(() => {
      getIncomes()
      getExpenses()
   }, [])

   return (
      <div className="container">
         <div className="row">
            <h1> All transactions </h1>
         </div>
         <div className="row content-row">
            <div className="stats-con">
               <div className="chart-con">
                  <LineChart /> 
                  <div className="piechart-con">
                     <PieChart />                
                  </div>               
               </div>
               
               <div className="history-con">
                  <History />
                  <div className="chart-con">
                     <div className="amount-con">
                        <div className="income">
                           <h2>Total Income</h2>
                           <p>
                              {totalIncome()} {"Lei"} 
                           </p>
                        </div>
                        <div className="expense">
                           <h2>Total Expense</h2>
                           <p>
                              {totalExpenses()} {"Lei"} 
                           </p>
                        </div>
                        <div className="balance">
                           <h2>Total Balance</h2>
                           <p>
                              {totalBalance()} {"Lei"} 
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}


export default Dashboard