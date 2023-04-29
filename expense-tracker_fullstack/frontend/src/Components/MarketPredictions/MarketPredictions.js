import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../Button/Button';
import { useGlobalContext } from '../../context/globalContext';
import './MarketPredictions.style.scss';
import "../Dashboard/Dashboard.style.scss";

function Settings() {
   const { interests, getInterests, error, setError } = useGlobalContext()
   const [inputState, setInputState] = useState({interest: ''})
   const { interest } = inputState;

   const interestOptions = interests.map((item, index) => (
      <option key={index} value={item} />
   ));

   const handleSubmit = e => {
      e.preventDefault()
      getInterests()
      setInputState({interest: ''})
   }

   const handleInput = name => e => {
      setInputState({ ...inputState, [name]: e.target.value })
      setError('')
   }

   useEffect(() => {
      getInterests()
	}, [])

   return (
      <>
      <MarketPredictions onSubmit={handleSubmit}>
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
                     <input 
                        list="interests" 
                        required value={interest} 
                        name="interest" 
                        id="interest" 
                        style={{'width':'500px'}} 
                        onChange={handleInput('interest')}
                        placeholder='Select an item' 
                     />
                     <datalist id="interests">
                        {interestOptions}
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
