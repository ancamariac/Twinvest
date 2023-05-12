import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../Button/Button';
import { useGlobalContext } from '../../context/globalContext';
import './MarketPredictions.style.scss';
import "../Dashboard/Dashboard.style.scss";
import PredictCard from './PredictCard'
import "../Settings/Interests.style.scss";
import { arrow_up, arrow_down, arrow_const } from '../../utils/Icons';

function Settings() {
   const { predictions, getPredictions, error, setError } = useGlobalContext()
   const [inputState, setInputState] = useState({prediction: ''})
   const { prediction } = inputState;

   const handleSubmit = e => {
      e.preventDefault()
      getPredictions()
      setInputState({prediction: ''})
   }

   const handleInput = name => e => {
      setInputState({ ...inputState, [name]: e.target.value })
      setError('')
   }

   useEffect(() => {
      getPredictions()
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
                        required value={prediction} 
                        name="interest" 
                        id="interest" 
                        style={{'width':'500px'}} 
                        onChange={handleInput('interest')}
                        placeholder='Select an item' 
                     />
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
      <div className='interests'>
         {predictions.map((predictItem) => {
            return <PredictCard
               title={predictItem.keyword} 
               date={predictItem.last_update}
               trend={
                  predictItem.trend === "rising" ? arrow_up : predictItem.trend === "falling" ? arrow_down : arrow_const 
               }
            />
         })}
      </div>
      </>
   )
}

const MarketPredictions = styled.form`
display: block;
margin-bottom: 10px;

.news-link {
   text-decoration: none; 
   color: inherit; 
   target: "_blank"
}
`;

export default Settings
