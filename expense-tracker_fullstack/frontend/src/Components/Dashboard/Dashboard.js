import React from 'react'
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';

function Dashboard() {
  return (
    <DashboardStyled>
        <InnerLayout>
            <h2>Dashboard</h2>
        </InnerLayout>
    </DashboardStyled>
  )
}

const DashboardStyled = styled.div`
`;

export default Dashboard