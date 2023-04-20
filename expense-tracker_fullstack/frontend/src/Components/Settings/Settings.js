import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';
import { useGlobalContext } from '../../context/globalContext';

function Settings() {
   const { addInterest, error, setError, deleteInterest } = useGlobalContext()
   const [inputState, setInputState] = useState({interest: ''})
   return (
      <div className="container">
         <div className="row">
            <h1> Choose your preferences! 🎨 </h1>
         </div>
         <br></br>
         <div className="row content-row"> 
            <h2> Pick your interests ✍️</h2>
            <br></br>
            <div className="selects input-control-interests">
               <select style={{'width':'500px'}}>
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
            <br></br>
            <div className="submit-btn">
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
   )
}

const SettingsStyled = styled.form`
   display: flex;
   flex-direction: column;
`;

export default Settings

// cum trebuie sa modific stilul ca sa adaug spatiu intre fiecare div fara sa pun br