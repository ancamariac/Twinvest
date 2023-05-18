import React, { useState } from 'react'
import styled from "styled-components";
import bg from '../../img/bg.png'
import { MainLayout } from "../../styles/Layouts";
import Navigation from "../Navigation/Navigation";
import Dashboard from '../Dashboard/Dashboard';
import Income from '../Income/Incomes';
import Expenses from '../Expenses/Expenses';
import MarketPredictions from '../MarketPredictions/MarketPredictions';
import Settings from '../Settings/Settings';
import TwitterNews from '../TwitterNews/TwitterNews';
import GoogleNews from '../GoogleNews/GoogleNews';
import RealtimePrices from '../RealtimePrices/RealtimePrices';

function Home() {
   const [active, setActive] = useState(-1)

   const displayData = () => {
      switch (active) {
         case 1:
            return <Dashboard />
         case 2:
            return <TwitterNews />
         case 3:
            return <GoogleNews />
         case 4:
            return <Income />
         case 5:
            return <Expenses />
         case 6:
            return <MarketPredictions />
         case 7:
            return <Settings />
         case 8:
            return <RealtimePrices />
         default:
            return <Dashboard />
      }
   }

   return (
      <AppStyled bg={bg} className="Home">
         <MainLayout>
            <Navigation active={active} setActive={setActive} />
            <main>
               {displayData()}
            </main>
         </MainLayout>
      </AppStyled>
   );
}

const AppStyled = styled.div`
   height: 100vh;
   width: 100%;
   background-image: url(${props => props.bg});
   position: relative;
   background: rgba(34, 34, 96, .6);
   main{
      flex: 1;
      background: rgba(252, 246, 249, 0.78);
      border: 3px solid #FFFFFF;
      backdrop-filter: blur(4.5px);
      border-radius: 32px;
      overflow-x: hidden;
      &::-webkit-scrollbar{
      width: 0;
      }

      .container {
         height: 100%;
         padding: 1rem;
      }

      .content-row {
         height: 95%;
         overflow-y: auto;
         padding-right: 10px;
      }

      overflow-y: auto;
      height: 100%;
   }
`;

export default Home;
