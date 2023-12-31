import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
   *{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      list-style: none;
   }

   .submit-button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      width: 100%;
      background: rgba(50, 34, 96, 0.6);
      border: none;
      height: 5vh;
      border-radius: 10px;
      color: white;
      font-size: 16px;
      opacity: 0.9;
      cursor: pointer;
      
   }
   .change-modal-text {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
   }
   .submit-button:hover {
      opacity: 1;
   }
   .input-line {
      width:100%;
      font-size: 30x;
      padding: 4px;
      height: 40px !important;
   }

   .input-with-error {
      margin-bottom: 15px;

      p {
         color: var(--color-error);
         padding: 5px;
      }
   }

   :root{
      --primary-color: #222260;
      --primary-color2: 'color: rgba(34, 34, 96, .6)';
      --primary-color3: 'color: rgba(34, 34, 96, .4)';
      --color-green: #00ad68;
      --color-grey: #aaa;
      --color-accent: #F56692;
      --color-delete: #FF0000;
      --color-error: #FF3333;
   }

   body{
      font-family: 'Nunito', sans-serif;
      font-size: clamp(1rem, 1.5vw, 1.2rem);
      overflow: hidden;
      color: rgba(34, 34, 96, .6);
   }

   h1, h2, h3, h4, h5, h6{
      color: var(--primary-color);
   }

   .error{
      color: red;
      animation: shake 0.5s ease-in-out;
      @keyframes shake {
         0%{
               transform: translateX(0);
         }
         25%{
               transform: translateX(10px);
         }
         50%{
               transform: translateX(-10px);
         }
         75%{
               transform: translateX(10px);
         }
         100%{
               transform: translateX(0);
         }
      }
   }

   .link {
      text-decoration: none;
      width: fit-content;
      margin-left: 5px;
      opacity: 0.9;
   }
   
   .link:hover {
      opacity: 1;
   }

   ::-webkit-scrollbar {
      width: 8px;
   }
   ::-webkit-scrollbar-track {
      border-radius: 5px;
      background: initial;
   }
   ::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background: linear-gradient(rgb(120, 199, 167) 40%, rgb(166, 124, 188) 90%);
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
   }

   /* Class added for a shine effect on hover */
   .shine-effect {
      overflow: hidden;
   }
   .shine-effect:before {
      content: '';
      position: absolute;
      top: 0;
      left: -320px;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.3);
      transform: skewX(-30deg);
      transition: 0.3s;
   } 
   
   .shine-effect:hover:before {
      left: 300px;
      background: rgba(255, 255, 255, 0.2);
   }
   .flip {
      animation: flip 2s infinite linear;
   }

   @keyframes flip{
      from {
         transform: rotateY(360deg);
      }
      to {
         transform: rotateY(0deg);
      }
   }

   .app-logo {
      position: relative;
      overflow: hidden;
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
      top: 0;
      width: 80%;
      display: flex;
      justify-content: center;
      cursor: pointer;
      align-items: center;
      border-radius: 20px 20px 100px 100px;
      background: var(--primary-color);
      padding: 5px 15px 5px 15px;
      .app-logo-title {
         color: white;
         margin-left: 10px;
         margin-right: 10px;
      }
      .app-logo-icon {
         color: white;
      }
`;