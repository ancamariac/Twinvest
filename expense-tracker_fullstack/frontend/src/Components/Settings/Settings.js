import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../Button/Button';
import InterestItem from '../Interest/Interest';
import { plus } from '../../utils/Icons';
import { useGlobalContext } from '../../context/globalContext';
import './Interests.style.scss';

function Settings() {
   const { interests, addInterest, getInterests, deleteInterest, error, setError } = useGlobalContext()
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
               <h1> Choose your preferences! 🎨 </h1>
            </div>
            <br></br>
            <div className="row content-row"> 
               <h2> Pick your interests ✍️</h2>
               <br></br>
               {error && <p className='error'>{error} </p> }
               <br></br>
               <div style={{display:'flex'}}>
                  <div className="selects input-control-interests">
                     <select required value={interest} name="interest" id="interest" onChange={handleInput('interest')} style={{'width':'500px'}}>
                        <option value="" disabled>Select an interest</option>
                        <option value="banks">Banks</option>
                        <option value="cryptocurrency">Cryptocurrency</option>
                        <option value="stockmarket">Stock Market</option>
                        <option value="investing">Investing</option>
                        <option value="fintech">Fintech</option>
                        <option value="startup">Startup</option>
                        <option value="entrepreneurship">Entrepreneurship</option>
                        <option value="ETHEREUM">ETHEREUM</option>
                        <option value="BITCOIN">BITCOIN</option>
                        <option value="DODGECOIN">DODGECOIN</option>
                     </select>
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
      </>
   )
}

const SettingsStyled = styled.form`
   display: flex;
   flex-direction: column;
`;

export default Settings
