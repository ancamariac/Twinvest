import React from 'react'
import styled from 'styled-components';
import Button from '../Button/Button';
import { trash } from '../../utils/Icons';


function InterestItem({data, deleteTag}) {

   return (
      <InterestStyled>
         <div className="content">
            <div className="inner-content">
               <div className="text">
                  <p>{data}</p>
               </div>
               <div className="btn-con">
                  <Button
                     icon={trash}
                     bPad={'0.6rem'}
                     bRad={'50%'}
                     bg={'var(--primary-color'}
                     color={'#fff'}
                     iColor={'#fff'}
                     hColor={'var(--color-green)'}
                     onClick={() => deleteTag(data)}
                  />
               </div>
            </div>
         </div>
      </InterestStyled>
   )
}

const InterestStyled = styled.div`
   background: #FCF6F9;
   border: 2px solid #FFFFFF;
   box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
   border-radius: 60px; 
   padding: 0.1rem; 
   margin-bottom: 1rem;
   gap: 1rem;
   width: fit-content;
   color: #222260;

   .content{
      flex: 1;
      display: flex;
      gap: 0.5rem; 

      .inner-content{
         display: flex;
         justify-content: space-between;
         align-items: center;
         .text{
               display: flex;
               align-items: center;
               gap: 0.5rem;
               padding-left: 0.6rem;
               padding-right: 0.6rem;
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

export default InterestItem