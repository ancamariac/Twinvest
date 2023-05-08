import React from 'react'
import styled from 'styled-components';
import { dateFormat } from '../../utils/dateFormat';
import { calender, tag, robot } from '../../utils/Icons';

function PredictCard({
   title,
   keyword,
   date,
   label,
   indicatorColor
}) {

   return (
      <PredictCardStyled indicator={indicatorColor}>
         <div className="content">
            <h5>{title}</h5>
            <div className="inner-content">
               <div className="text">
                  <p>{tag} {keyword}</p>
                  <p>{calender} {dateFormat(date)}</p>
                  <p>{robot} {label}</p>
               </div>
               <div className="btn-con">                 
               </div>
            </div>
         </div>
      </PredictCardStyled>
   )
}

const PredictCardStyled = styled.div`
   background: #FCF6F9;
   border: 2px solid #04064f;
   border-radius: 25px;
   padding: 1.5rem;
   margin-bottom: 1.5rem;
   display: flex;
   align-items: center;
   gap: 1rem;
   width: 35%;
   color: #222260;
   margin-left: 7pc;

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

export default PredictCard