import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../Button/Button';
import InterestItem from '../Interest/Interest';
import { plus } from '../../utils/Icons';
import { useGlobalContext } from '../../context/globalContext';
import './MarketPredictions.style.scss';
import "../Dashboard/Dashboard.style.scss";

function Settings() {
   const { interests, incomes, expenses, addInterest, getInterests, deleteInterest, error, setError } = useGlobalContext()
   const [inputState, setInputState] = useState({interest: ''})
   const { interest } = inputState;

   useEffect(() => {
      getInterests()
	}, [])

   return (
      <>
      <MarketPredictions >
         <div className="container">
            <div className="row">
               <h1> Let us predict the future! 🔮 </h1>
            </div>
            <br></br>
            <div className="row content-row"> 
               <h2> Choose a financial instrument 📈</h2>
            </div>
            {error && <p className='error'>{error} </p> }
               <br></br>
               <div style={{display:'flex'}}>
                  <div className="selects input-control-interests">
                     <input list="interests" required value={interest} name="interest" id="interest" style={{'width':'500px'}} size="4" placeholder="Select an item" />
                     <datalist id="interests">
                        <option value="Bitcoin" />
                        <option value="Ethereum" />
                        <option value="Dodgecoin" />
                        <option value="Apple" />
                        <option value="Tesla" />
                        <option value="Microsoft" />
                        <option value="Coinbase" />
                        <option value="Litecoin" />
                        <option value="Cardano" />
                     </datalist>
                  </div>
                  <div className="submit-btn" style={{marginLeft: '15px'}}>
                     <Button
                        name={'Predict price'}
                        bPad={'.8rem 1.6rem'}
                        bRad={'30px'}
                        bg={'var(--primary-color'}
                        color={'#fff'}
                     />
                  </div>
               </div>
         </div>
      </MarketPredictions>
      </>
   )
}

const MarketPredictions = styled.form`
   display: flex;
   flex-direction: column;
`;

export default Settings
