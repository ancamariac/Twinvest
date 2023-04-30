import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import Item from '../Transaction/Transaction';

const BASE_URL = "http://localhost:5000/api/v1/";

function GoogleNews() {

   const { getToken, news, getNews } = useGlobalContext()

   useEffect(() => {
      getNews()
   }, []);

   console.log('news', news)
   return (
      <>
         <div className="container">
            <div className="row">
               <h1> Stay informed with Google News! 📰 </h1>
            </div>
            <div className="row content-row">   
               {news.length > 0 && (
                  <GoogleNewsStyled>
                     {news.map((item) => ( 
                        <Item
			
                     />
                     ))}
                  </GoogleNewsStyled>
               )}
            </div>  
         </div>
      </>
   )
}

const GoogleNewsStyled = styled.div`
   display: block;
   margin-bottom: 10px;
`;

export default GoogleNews