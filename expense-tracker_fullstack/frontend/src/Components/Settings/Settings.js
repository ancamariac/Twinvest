import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';
import { useGlobalContext } from '../../context/globalContext';

function Settings() {
   const { addInterest, getInterests, deleteInterest } = useGlobalContext()
   const [inputState, setInputState] = useState({interest: ''})
   const { interest } = inputState;

   const handleInput = name => e => {
      setInputState({ ...inputState, [name]: e.target.value })
   }

   const handleSubmit = e => {
      addInterest('64189cd8b9d5082c1d3d1189', inputState)
      getInterests()
      setInputState({interest: ''})
   }

   useEffect(() => {
      getInterests()
	}, [])

   return (
      <SettingsStyled onSubmit={handleSubmit}>
         <div className="container">
            <div className="row">
               <h1> Choose your preferences! 🎨 </h1>
            </div>
            <br></br>
            <div className="row content-row"> 
               <h2> Pick your interests ✍️</h2>
               <br></br>
               <div style={{display:'flex'}}>
               <div className="selects input-control-interests">
                  <select value={interest} name="interest" id="interest" onChange={handleInput('interest')} style={{'width':'500px'}}>
                     <option value="" disabled>Select an interest</option>
                     <option value="#banks">Banks</option>
                     <option value="#cryptocurrency">Cryptocurrency</option>
                     <option value="#stockmarket">Stock Market</option>
                     <option value="#investing">Investing</option>
                     <option value="#fintech">Fintech</option>
                     <option value="#startup">Startup</option>
                     <option value="#entrepreneurship">Entrepreneurship</option>
                  </select>
               </div> 
               <div className="submit-btn" style={{marginLeft: '15px'}}>
                  <Button
                     name={'Add Interest'}
                     icon={plus}
                     bPad={'.8rem 1.6rem'}
                     bRad={'30px'}
                     bg={'var(--color-accent'}
                     color={'#fff'}
                  />
               </div>
               </div>
            </div>        
         </div>
      </SettingsStyled>
   )
}

const SettingsStyled = styled.form`
   display: flex;
   flex-direction: column;
`;

export default Settings
