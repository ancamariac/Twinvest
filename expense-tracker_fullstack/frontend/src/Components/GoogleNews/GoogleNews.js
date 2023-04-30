import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Tweet from '../Tweet/Tweet'
import axios from 'axios'
import { useGlobalContext } from '../../context/globalContext';

const BASE_URL = "http://localhost:5000/api/v1/";

function GoogleNews() {

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
               <h1> Stay informed with Google News! 📰 </h1>
            </div>
            <div className="row content-row">   
               
            </div>  
         </div>
      </>
   )
}


export default GoogleNews