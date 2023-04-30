import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Tweet from '../Tweet/Tweet'
import axios from 'axios'
import { useGlobalContext } from '../../context/globalContext';

const BASE_URL = "http://localhost:5000/api/v1/";

function MarketNews() {

   const [tweets, setTweets] = useState('');
   const { getToken } = useGlobalContext()

   useEffect(() => {
      async function getTweets() {
         const token = getToken(); 

         const response = await axios.get(`${BASE_URL}get-tweets`, {
            headers: {
               'Authorization': `Basic ${token}`
            }
         })
         setTweets(response.data)
      }
      // Update the document title using the browser API
      getTweets()
   }, []);


   return (
      <>
         <div className="container">
            <div className="row">
               <h1> Check the latest tweets! 🐦 </h1>
            </div>
            <div className="row content-row">   
               {tweets.length > 0 && (
                  <TweetStyled>
                     {tweets.map((tweet, index) => (
                        <Tweet key={index} {...tweet} />
                     ))}
                  </TweetStyled>
               )}
            </div>  
         </div>
      </>
   )
}

const TweetStyled = styled.div`
   display: block;
   margin-bottom: 10px;
`;

export default MarketNews