import React, {useState, useMemo} from 'react'
import styled from "styled-components";
import bg from '../../img/bg.png'
import { MainLayout } from "../../styles/Layouts";
import Orb from '../Orb/Orb'
import Navigation from "../Navigation/Navigation";
import Dashboard from '../Dashboard/Dashboard';
import Income from '../Income/Income';
import Expenses from '../Expenses/Expenses';
import { useGlobalContext } from '../../context/globalContext';
 
function Home() {
  const [active, setActive] = useState(1)

  const global = useGlobalContext;
  console.log(global);

  const displayData = () => {
    switch(active){
      case 1:
        return <Dashboard />
      case 2:
        return <Dashboard />
      case 3:
        return <Income />
      case 4: 
        return <Expenses />
      default: 
        return <Dashboard />
    }
  }

  const orbMemo = useMemo(() => {
    return <Orb />
  },[])

  return (
    <AppStyled bg={bg} className="Home">
      {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive}/>
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
  background: linear-gradient(180deg, #78c7a7 40%, #a67cbc 90%);
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
  }
`;

export default Home;
