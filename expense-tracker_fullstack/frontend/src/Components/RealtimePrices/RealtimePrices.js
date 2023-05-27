import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import "../Dashboard/Dashboard.style.scss";
import PriceCard from './PriceCard'
import "../Settings/Interests.style.scss";
import { calender } from '../../utils/Icons';

function RealtimePrices() {
   const { interestsPrices, getInterestsPrices, error, setError } = useGlobalContext()
   const [inputState, setInputState] = useState({interest: ''})
   const { interest } = inputState;

   const handleSubmit = e => {
      e.preventDefault()
      getInterestsPrices()
      setInputState({interest: ''})
   }

   const handleInput = name => e => {
      setInputState({ ...inputState, [name]: e.target.value })
      setError('')
   }

   useEffect(() => {
      getInterestsPrices()
	}, [])

   return (
      <>
      <RealtimePricesStyled onSubmit={handleSubmit}>
         <div className="container">
            <div className="row">
               <h1> This is the actual price of  🔮 </h1>
            </div>
            <br></br>
         
         </div>
      </RealtimePricesStyled>
      <div className='interests'>
         {interestsPrices.map((interest) => {
            return <PriceCard
               title={interest.keyword}
               ticker={interest.ticker} 
            />
         })}
      </div>
      </>
   )
}

const RealtimePricesStyled = styled.form`
display: block;
margin-bottom: 10px;

.news-link {
   text-decoration: none; 
   color: inherit; 
   target: "_blank"
}
`;

export default RealtimePrices
