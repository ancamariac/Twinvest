import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../Button/Button';
import { useGlobalContext } from '../../context/globalContext';
import "../Dashboard/Dashboard.style.scss";
import PredictCard from './PredictCard'
import "../Settings/Interests.style.scss";
import { arrow_up, arrow_down, arrow_const, calender } from '../../utils/Icons';

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
            <br></br>
            <h2> Interpret different symbols and trends 📈</h2>
            <br></br>
            <div className="row content-row display-flex"> 
               <div className="column-half-width">
                  <h2>Upward Trend {arrow_up}</h2><h3> The stock's value will be on the rise, indicating potential profitability. It could be a good time to consider buying or holding the stock.</h3>
            .     <br></br>
                  <h2> Stable Trend {arrow_const}</h2><h3> The stock's value will remain relatively constant, indicating a lack of major fluctuations. It may be a time when the market is waiting for new developments before making any moves.</h3> 
               </div>
               <div className="column-space"></div>
               <div className="column-half-width">
                  <h2> Downward Trend {arrow_down}</h2><h3>The stock's value will be declining, which may signify potential losses. It's advisable to exercise caution or consider selling the stock if you already own it.</h3> 
                  <br></br>
                  <h2> Last update {calender}</h2><h3> This data aims to  provide information about the exact moment when the news was retrieved and a prediction was made using sentiment analysis. </h3> 
               </div>
            </div>
         </div>
      </MarketPredictions>
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
.display-flex {
   display: flex;
}
.column-half-width {
   width: 45%;
}
.column-space {
   width: 10%;
}
.interests {
   height: 44vh;
   overflow: auto;
}
`;

export default Settings