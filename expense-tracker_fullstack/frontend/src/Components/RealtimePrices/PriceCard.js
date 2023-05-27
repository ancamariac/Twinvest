import React from 'react'
import styled from 'styled-components';
import { dateFormat } from '../../utils/dateFormat';
import { calender } from '../../utils/Icons';

import { useState, useEffect } from 'react';
import axios from 'axios';

function PriceCard({
   title,
   ticker,
   date,
   trend
}) {

   const [realtimePrice, setRealtimePrice] = useState(null);

   useEffect(() => {
      const fetchStockPrice = async () => {

         const options = {
            method: 'GET',
            url: `https://realstonks.p.rapidapi.com/${ticker}`,
            headers: {
               'X-RapidAPI-Key': 'fe7735952emsh96bdd1cf7c30ec1p1f16d0jsn7f422f6ce455',
               'X-RapidAPI-Host': 'realstonks.p.rapidapi.com'
            }
         };

         try {
            const response = await axios.request(options);
            // Setăm procentul de evoluție în state
            setRealtimePrice(response.data.change_percentage); 
         } catch (error) {
            console.error(error);
         }
      };

      fetchStockPrice(); // Apelăm funcția de fetch când componenta se montează

      return () => {
         setRealtimePrice(null);
      };
   }, [title, ticker]);


   return (
      <PriceCardStyled>
         <div className="content">
            <h5>{title}</h5>
            <div className="inner-content">
               <div className="text">
                  <p>{calender} {dateFormat(date)}</p>
                  {realtimePrice !== null && (
                     <p>Price: {realtimePrice > 0 ? `+${realtimePrice}%` : `${realtimePrice}%`}</p>
                  )}
               </div>
            </div>
         </div>
         <div className="trend"> 
            {trend}                
         </div>
      </PriceCardStyled>
   )
}

const PriceCardStyled = styled.div`
   background: #FCF6F9;
   border: 2px solid #04064f;
   border-radius: 25px;
   padding: 1.5rem;
   margin-bottom: 1.5rem;
   display: flex;
   align-items: center;
   gap: 1rem;
   width: 22%;
   color: #222260;
   margin-left: 7pc;

   .trend {
      font-size: 50px; 
      margin-right: 1.5rem; 
   }

   .content{
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: .3rem;
      h5{
         font-size: 1.3rem;
         padding-left: 1rem;
         position: relative;
         &::before{
               content: '';
               position: absolute;
               left: 0;
               top: 50%;
               transform: translateY(-50%);
               width: .8rem;
               height: .8rem;
               border-radius: 50%;
               background: ${props => props.indicator};
         }
      }

      .inner-content{
         display: flex;
         justify-content: space-between;
         align-items: center;
         .text{
            display: flex;
            align-items: center;
            gap: 1.5rem;
            margin-left: 1pc;
            p{
               display: flex;
               align-items: center;
               gap: 0.5rem;
               color: var(--primary-color);
               opacity: 0.8;
            }
         }
      }
   }
`;

export default PriceCard