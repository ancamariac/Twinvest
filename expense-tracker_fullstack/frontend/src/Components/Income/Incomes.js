import React, { useEffect } from 'react'
import { useGlobalContext } from '../../context/globalContext';
import IncomeForm from './IncomeForm';
import Item from '../Transaction/Transaction';

function Incomes() {

	const { incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext()

	useEffect(() => {
		getIncomes()
	}, [])

	return (
		<div className="container">
			<div className="row">
				<h1>Incomes</h1>
			</div>
			<div className="row content-row">
				<div className="top-income">
					<h2 className="total-income">Total income: <span>{totalIncome()} {"Lei"}</span></h2>
				</div>
				<div className="income-content">
					<div className="form-container">
						<IncomeForm />
					</div>
					<div className="incomes">
						{incomes.map((income) => {
							const { _id, title, amount, date, category, description, type } = income;
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
								deleteItem={deleteIncome}
							/>
						})}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Incomes