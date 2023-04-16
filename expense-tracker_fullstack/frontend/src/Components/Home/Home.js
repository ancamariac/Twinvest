import React, { useState } from 'react'
import styled from "styled-components";
import bg from '../../img/bg.png'
import { MainLayout } from "../../styles/Layouts";
import Navigation from "../Navigation/Navigation";
import Dashboard from '../Dashboard/Dashboard';
import Income from '../Income/Incomes';
import Expenses from '../Expenses/Expenses';
import MarketNews from '../MarketNews/MarketNews';

function Home() {
   const [active, setActive] = useState(1)

   const displayData = () => {
      switch (active) {
         case 1:
            return <Dashboard />
         case 2:
            return <MarketNews />
         case 3:
            return <Income />
         case 4:
            return <Expenses />
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
