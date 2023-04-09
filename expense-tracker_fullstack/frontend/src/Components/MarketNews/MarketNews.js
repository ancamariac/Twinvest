import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import Tweet from '../Tweet/Tweet'
import axios from 'axios'

const BASE_URL = "http://localhost:5000/api/v1/";

function MarketNews() {

   const [tweets, setTweets] = useState('');

   useEffect(() => {
      async function getTweets() {
         const response = await axios.get(`${BASE_URL}get-tweets`)
         setTweets(response.data)
      }
      // Update the document title using the browser API
      getTweets()
   }, []);

   console.log(tweets[0])
   return (
      <>
         {(tweets !== '') &&
            <TweetStyled>
               <Tweet {...tweets[0]} />
               <Tweet {...tweets[1]} />
               <Tweet {...tweets[2]} />
               <Tweet {...tweets[3]} />
               <Tweet {...tweets[4]} />
               <Tweet {...tweets[5]} />
               <Tweet {...tweets[6]} />
            </TweetStyled>}

      </>
   )
}

const TweetStyled = styled.div`
   display: block;
   margin-bottom: 10px;
`;

export default MarketNews