import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
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


   return (
      <>
         {(tweets !== '') &&
            <TweetStyled>
               <Tweet {...tweets[tweets.length - 1]} />
               <Tweet {...tweets[tweets.length - 2]} />
               <Tweet {...tweets[tweets.length - 3]} />
               <Tweet {...tweets[tweets.length - 4]} />
               <Tweet {...tweets[tweets.length - 5]} />
               <Tweet {...tweets[tweets.length - 6]} />
               <Tweet {...tweets[tweets.length - 7]} />
               <Tweet {...tweets[tweets.length - 8]} />              
            </TweetStyled>}

      </>
   )
}

const TweetStyled = styled.div`
   display: block;
   margin-bottom: 10px;
`;

export default MarketNews