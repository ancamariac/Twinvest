import React, { useEffect } from 'react'
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import News from './News';

function GoogleNews() {

   const {news, getNews } = useGlobalContext()

   useEffect(() => {
      getNews()
   }, []);

   return (
      <>
         <div className="container">
            <div className="row">
               <h1> Stay informed with Google News! 📰 </h1>
            </div>
            <br></br>
            <div className="row content-row">   
               {news.length > 0 && (
                  <GoogleNewsStyled>
                     {news.map((item, index) => ( 
                        <News
                        key={index}
								id={index}
								title={<a href={item.link} className="news-link" >{item.title}</a>}
								label={item.label}
								keyword={item.keyword}
                        source={item.source}
								date={item.date}
								indicatorColor={
                           item.label === "negative" ? "red" : item.label === "positive" ? "var(--color-green)" : "blue"
                        }
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

   .news-link {
      text-decoration: none; 
      color: inherit; 
      target: "_blank"
   }   
`;

export default GoogleNews