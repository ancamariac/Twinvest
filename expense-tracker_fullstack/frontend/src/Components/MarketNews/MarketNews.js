import React, { useEffect } from 'react'
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';
import TweetCard from "react-tweet-card";
import { Container } from "reactstrap";

function MarketNews() {

  const { incomes, getIncomes } = useGlobalContext()

  useEffect(() =>{
    getIncomes()
  }, [])
  
  return (
    <TweetStyled>
      <InnerLayout>
        <h1>Check the latest tweets 🐦</h1>
        <br></br>
        <div className="income-content">
          <div className="form-container">
            <Form/>
          </div>
          
        </div>
          
      </InnerLayout>
    </TweetStyled>
  )
}

const TweetStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
          flex: 1;
        }
    }
`;

export default MarketNews