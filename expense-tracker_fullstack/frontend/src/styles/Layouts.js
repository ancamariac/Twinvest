import styled from "styled-components";

export const MainLayout = styled.div`
   padding: 2rem;
   height: 100%;
   display: flex;
   gap: 2rem;
`;

export const CenteredModal = styled.div`
   position: absolute;
   top: 30%;
   left: 50%;
   transform: translate(-50%, -50%);
   width: 50vh;
   height auto;
   background: rgba(252, 246, 249, 0.78);
   border: 3px solid rgb(255, 255, 255);
   backdrop-filter: blur(4.5px);
   border-radius: 32px;
   display: flex;
   flex-direction: column;
   padding: 20px;
   box-shadow: 10px 10px 5px #888888;
`