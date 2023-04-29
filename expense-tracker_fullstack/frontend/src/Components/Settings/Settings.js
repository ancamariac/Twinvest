import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../Button/Button';
import InterestItem from '../Interest/Interest';
import { plus } from '../../utils/Icons';
import { useGlobalContext } from '../../context/globalContext';
import './Interests.style.scss';
import "../Dashboard/Dashboard.style.scss";

function Settings() {
   const { interests, incomes, expenses, addInterest, getInterests, deleteInterest, error, setError } = useGlobalContext()
   const [inputState, setInputState] = useState({interest: ''})
   const { interest } = inputState;

   

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

   useEffect(() => {
      getInterests()
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
               <h2> Pick your interests ✍️</h2>
               <br></br>
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
                        <option value="USD Coin" />
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
                        <option value="Coca Cola" />
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
      </SettingsStyled>
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
      <div className="row content-row">
         <div className="stats-con">
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
         </div>
      </div>
      </div>
      </>
   )
}

const SettingsStyled = styled.form`
   display: flex;
   flex-direction: column;
`;

export default Settings
