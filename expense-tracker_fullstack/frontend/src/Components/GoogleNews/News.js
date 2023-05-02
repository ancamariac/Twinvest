import React from 'react'
import styled from 'styled-components';
import { dateFormat } from '../../utils/dateFormat';
import { calender, tag, telegram, robot } from '../../utils/Icons';
import Button from '../Button/Button';
import googleLogo from '../../img/search.png';

function News({
   id,
   title,
   keyword,
   date,
   label,
   source,
   link,
   deleteItem,
   indicatorColor
}) {

   return (
      <NewsStyled indicator={indicatorColor}>
         <div className="content">
            <h5>{React.cloneElement(title, { className: "news-link", target: "_blank" })}</h5>
            <div className="inner-content">
               <div className="text">
                  <p>{tag} {keyword}</p>
                  <p>{calender} {dateFormat(date)}</p>
                  <p>{telegram} {source}</p>
                  <p>{robot} {label}</p>
               </div>
               <div className="btn-con">                 
                  <Button
                     icon={<img src={googleLogo} alt="Google Logo" className="google-logo" />}
                     bPad={'1rem'}
                     bRad={'50%'}
                     bg={'transparent'}
                     color={'#222260'}
                     iColor={'#222260'}
                     hColor={'var(--color-green)'}
                     onClick={() => window.open(link, "_blank")}
                  />
               
               </div>
            </div>
         </div>
      </NewsStyled>
   )
}

const NewsStyled = styled.div`
   background: #FCF6F9;
   border: 2px solid #04064f;
   border-radius: 25px;
   padding: 1.5rem;
   margin-bottom: 1.5rem;
   display: flex;
   align-items: center;
   gap: 1rem;
   width: 70%;
   color: #222260;
   margin-left: 13pc;

   .google-logo {
      width: 40px;
   }

   .content{
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: .3rem;
      h5{
         font-size: 1.3rem;
         padding-left: 2rem;
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
               margin-left: 2pc;
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

export default News