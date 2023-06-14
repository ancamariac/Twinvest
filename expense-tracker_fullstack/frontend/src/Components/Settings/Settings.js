import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../Button/Button';
import InterestItem from '../Interest/Interest';
import { plus } from '../../utils/Icons';
import { useGlobalContext } from '../../context/globalContext';
import './Interests.style.scss';
import "../Dashboard/Dashboard.style.scss";
import {NotificationManager} from 'react-notifications';
import axios from 'axios'

function Settings() {
   const { interests, addInterest, getInterests, deleteInterest, error, setError, changePassword, modifyExpenseLimit, modifyIncomeObjective, getToken} = useGlobalContext()
   const [inputState, setInputState] = useState({interest: ''})
   const { interest } = inputState;

   const BASE_URL = "http://localhost:5000/api/v1/";

   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');

   const getExpenseLimit = async () => {
      const token = getToken();
      const response = await axios.get(`${BASE_URL}getExpenseLimit`, {
         headers: {
            'Authorization': `Basic ${token}`
         }
      })
      .catch((err) => {
         setError(err.response.data.message)
         console.log(err)
      })
      console.log(response.data);
      setExpenseLimit(response.data);
   }

   const getIncomeObjective = async () => {
      const token = getToken();
      const response = await axios.get(`${BASE_URL}getIncomeObjective`, {
         headers: {
            'Authorization': `Basic ${token}`
         }
      })
      .catch((err) => {
         setError(err.response.data.message)
         console.log(err)
      })
      console.log(response.data);
      setIncomeObjective(response.data);
   }

   const [expenseLimit, setExpenseLimit] = useState(0)
   const [incomeObjective, setIncomeObjective] = useState(0)

   const handleInput = name => e => {
      setInputState({ ...inputState, [name]: e.target.value })
      setError('')
   }

   const handleSubmit = e => {
      e.preventDefault()
      addInterest(inputState)
      getInterests()
      setInputState({interest: ''})
   }

   const handleInputChange = (e) => {
      const { id, value } = e.target;
      if (id === "password") {
         setPassword(value);
      } else if (id === "confirmPassword") {
         setConfirmPassword(value);
      } else if (id === "incomeObjective") {
         setIncomeObjective(value);
         initIncomeObjectiveValue(value);
      } else if (id === "expenseLimit") {
         setExpenseLimit(value);
         initExpenseLimitValue(value);
      }
  }

   async function changeUserPassword(e) {
      e.preventDefault()
      console.log(password, confirmPassword);
      if (password === confirmPassword) {
         changePassword(password);
      } else {
         NotificationManager.error("Error", "Passwords don't match!");
      }
   }

   async function initExpenseLimitValue(e) {
      e.preventDefault()
      var checkNumber = new RegExp('^[1-9]\d*|0$ ');
      if (checkNumber.test(expenseLimit) === true) {
         modifyExpenseLimit(expenseLimit);
      } else {
         NotificationManager.error("Error", "Please choose a valid number, that doesn't start with 0!");
      }
   }

   async function initIncomeObjectiveValue(e) {
      e.preventDefault()
      var checkNumber = new RegExp('^[1-9]\d*|0$ ');
      if (checkNumber.test(incomeObjective) === true) {
         modifyIncomeObjective(incomeObjective);
      } else {
         NotificationManager.error("Error", "Please choose a valid number, that doesn't start with 0!");
      }
   }

   useEffect(() => {
      getInterests();
      getIncomeObjective();
      getExpenseLimit();
	}, [])

   return (
      <>
      <SettingsStyled onSubmit={handleSubmit}>
         <div className="container">
            <div className="row">
               <h1> Choose your preferences 🎨 </h1>
            </div>
            <br></br>
            <div className="row content-row"> 
               <form className="change-password-form">
                  <h2 className='margin-bottom-15'> Change your password </h2>
                  <label for="password" id="password"  name="password">
                     Enter your new password:
                  </label>
                  <input minLength={8}  onChange={(e) => handleInputChange(e)}  className='margin-bottom-15' type="password"  value={password} id="password" name="password"  ></input>
                  <label for="confirmPassword">
                     Confirm password:
                  </label>
                  <input minLength={8}  onChange={(e) => handleInputChange(e)}  value={confirmPassword} id="confirmPassword" name="confirmPassword"  className='margin-bottom-15' type="password" ></input>
                  <div className="submit-btn">
                     <button className="submit-button" onClick={(e) => changeUserPassword(e)} >
                        Submit
                     </button>
                  </div>
               </form>
               <br></br>
               <h2> Pick your interests ✍️</h2>
               {error && <p className='error'>{error} </p> }
               <br></br>
               <div style={{display:'flex'}}>
                  <div className="selects input-control-interests">
                     <input 
                        list="interests" 
                        required value={interest} 
                        name="interest" 
                        id="interest" 
                        onChange={handleInput('interest')} 
                        style={{'width':'500px'}} 
                        size="4" 
                        placeholder="Type an interest" 
                     />
                     <datalist id="interests">
                        <option value="Bitcoin" />
                        <option value="Ethereum" />
                        <option value="Dodgecoin" />
                        <option value="Tether" />
                        <option value="BNB" />
                        <option value="Cardano" />
                        <option value="Polygon" />
                        <option value="Solana" />
                        <option value="Polkadot" />
                        <option value="Apple" />
                        <option value="Tesla" />
                        <option value="Microsoft" />
                        <option value="Amazon" />
                        <option value="NVIDIA" />
                        <option value="Meta" />
                        <option value="Disney" />
                        <option value="Shopify" />
                        <option value="Netflix" />
                        <option value="Meta" />
                        <option value="Roblox" />
                        <option value="Coinbase" />
                        <option value="Intel" />
                        <option value="AMD" />
                        <option id="noMatchesOption" value="No matches" />
                     </datalist>
                  </div>
                  <div className="submit-btn" style={{marginLeft: '15px'}}>
                     <Button
                        name={'Add Interest'}
                        icon={plus}
                        bPad={'.8rem 1.6rem'}
                        bRad={'30px'}
                        bg={'var(--primary-color'}
                        color={'#fff'}
                     />
                  </div>
               </div>
            </div>
            <br></br>
         </div>
      <div className='interests'>
         {interests.map((interestItem) => {
            const tag = interestItem;
            return <InterestItem
               key={tag}
               data={tag}
               deleteTag={() => deleteInterest(interestItem)}
            />
         })}
      </div>

      <div className="container">
         <div className="row content-row smart-goals-section">
            <h2 className='smart-goals-title'> Set your smart goals!  </h2>
               {/* <div className="stats-con">
               <div className="history-con">
                  <h2 className="salary-title">Min <span>Income</span>Max</h2>
                  <div className="salary-item">
                     <p>
                        {Math.min(...incomes.map(item => item.amount))} {"Lei"}
                     </p>
                     <p>
                        {Math.max(...incomes.map(item => item.amount))} {"Lei"}
                     </p>
                  </div>
                  <h2 className="salary-title">Min <span>Expense</span>Max</h2>
                  <div className="salary-item">
                     <p>
                        {Math.min(...expenses.map(item => item.amount))} {"Lei"}
                     </p>
                     <p>
                        {Math.max(...expenses.map(item => item.amount))} {"Lei"}
                     </p>
                  </div>
               </div>
            </div> */}
            <div className="left-side">
               <div className="expense-limit-wrapper">
                  <div className="expense-limit">
                     <form>
                        <label className="expense-limit-label" for="expenseLimit"> Expense Limit: </label>
                        <input type="number" id="expenseLimit" onChange={(e) => handleInputChange(e)} name="expenseLimit" value={expenseLimit}></input>
                        <div className="submit-btn">
                           <button className="submit-button" onClick={(e) => initExpenseLimitValue(e)} >
                              Set Expense Limit
                           </button>
                        </div>
                     </form>
                  </div>
                  <div className="expense-progress">
                     <div className="childTitle">
                        Reached 20% of your Expense Limit!
                     </div>
                     <div className = "childDiv" style = {{ width: `${20}%` }}>
                        <span> </span>
                     </div>
                  </div> 
               </div>
               
               <div className="income-objective-wrapper">
                  <div className="income-objective">
                     <form>
                        <label className="income-objective-label" for="incomeObjective"> Income Objective: </label>
                        <input type="number" id="incomeObjective" onChange={(e) => handleInputChange(e)} name="incomeObjective" value={incomeObjective}></input>
                        <div className="submit-btn">
                           <button className="submit-button" onClick={(e) => initIncomeObjectiveValue(e)} >
                              Set Income Objective
                           </button>
                        </div>
                     </form>
                  </div>
                  <div className = "objective-progress">
                     <div className="childTitle">
                        Reached 100% of your Income Objective!
                     </div>
                     <div className = "childDiv" style = {{ width: `${100}%` }}>
                        <span> </span>
                     </div>
                  </div> 
               </div>
            </div>
         </div>
      </div>
      </SettingsStyled>
      </>
   )
}

const SettingsStyled = styled.form`
   display: flex;
   flex-direction: column;
   justify-content: center;

   .left-side {
      background: #FCF6F9;
      border: 2px solid #FFFFFF;
      border-radius: 20px;
      padding: 10px;
      width: 70%;
      display: flex;
      flex-wrap: wrap;
      justify-content: left;
      align-items: center;

      .expense-limit, 
      .income-objective {
         width: 50%;
         form {
            display: flex;
            align-items: center;
         }

         .submit-btn {
            width: -webkit-fill-available;
         }

         display: flex;
         align-items: center;
         flex-wrap: wrap;
         
         input {
            margin-right: 15px;
            max-width: 150px;
         }
      }

   }

   .change-password-form {
      display: flex;
      flex-wrap: wrap;
      width: 400px;

      .submit-btn {
         width: 100%;
      }

      input {
         width: 100%;
      }

      .margin-bottom-15 {
         margin-bottom: 15px;
      }
   
   }

   .submit-button {
      outline: none;
      border: none;
      font-family: inherit;
      font-size: inherit;
      display: flex;
      align-items: center;
      gap: .5rem;
      cursor: pointer;
      transition: all .4s ease-in-out;
      padding: .8rem 1.6rem;
      border-radius: 30px;
      width: auto;
      background: var(--primary-color);
   }

   .smart-goals-title {
      width: 100%;
      margin-bottom: 15px;
   }

   .expense-limit-label,
   .income-objective-label {
      width: 350px;
   }

   .expense-limit-wrapper,
   .income-objective-wrapper {
      display: flex;
      justify-content: space-between;
      width: 100%;
      align-items: center;
      padding-top: 15px;
      padding-bottom: 15px;
   }

   .objective-progress, .expense-progress { 
      height: 1.5rem;
      width: 35%;
      background: lightgray;
      border-radius: 12px;
      margin: 1rem;
      margin-top: 30px;
      position: relative;
   }

   .childDiv {
      height: 100%;
      background-color: var(--color-green) !important;
      border-radius: 12px;
      text-align: left;
   }

   .expense-progress .childDiv {
      background-color: red!important;
   }

   .childTitle {
      position: absolute;
      top: -30px;
      left: 23%;
   }

   .smart-goals-section {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
   }
`;

export default Settings