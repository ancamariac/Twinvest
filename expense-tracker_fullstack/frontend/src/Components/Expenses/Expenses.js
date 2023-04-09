import React, { useEffect } from 'react'
import { useGlobalContext } from '../../context/globalContext';
import Item from '../Transaction/Transaction';
import ExpenseForm from './ExpenseForm';
import './Expenses.style.scss';

function Expenses() {
   const { expenses, getExpenses, deleteExpense, totalExpenses } = useGlobalContext()

   useEffect(() => {
      getExpenses()
   }, [])
   return (
      <div className="container">
         <div className="row">
            <h1> Expenses </h1>
         </div>
         <div className="row content-row">
            <div class="top-expense">
               <h2 className="total-income">Total Expense: <span>${totalExpenses()}</span></h2>
            </div>
            <div className="income-content">
               <div className="form-container">
                  <ExpenseForm />
               </div>
               <div className="incomes">
                  {expenses.map((income) => {
                     const { _id, title, amount, date, category, description, type } = income;
                     console.log(income)
                     return <Item
                        key={_id}
                        id={_id}
                        title={title}
                        description={description}
                        amount={amount}
                        date={date}
                        type={type}
                        category={category}
                        indicatorColor="var(--color-green)"
                        deleteItem={deleteExpense}
                     />
                  })}
               </div>
            </div>
         </div>.
      </div>
   )
}

export default Expenses