import React, { useState, useEffect } from "react"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/globalContext";
import styled from "styled-components";
import { CenteredModal } from "../../styles/Layouts";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import image from '../../img/work.svg';
import { twitter_logo } from '../../utils/Icons';

function Login({ goHome }) {
   const [emailLogin, setEmailLogin] = useState('');
   const [passwordLogin, setPasswordLogin] = useState('');
   const BASE_URL = "http://localhost:5000/api/v1/";

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [username, setUsername] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');

   const [errorType, setErrorType] = useState('');
   const [errorMessage, setErrorMessage] = useState('');

   const { saveToken, saveUser } = useGlobalContext();

   const navigate = useNavigate();

   const [imageUrl, setImageUrl] = useState(image);

   const texts = [
      'Unleashing Data Insights for Profitable Decision-making',
      'Effective Budget Management using Latest News',
      'Informed Investing via Twitter at Your Fingertips',
      'Unlocking the Potential of Stocks and Crypto',
      'Empowering Smart Investments through Sentiment Analysis'
   ];
   
   const Typewriter = ({ texts }) => {
      const [currentTextIndex, setCurrentTextIndex] = useState(0);
      const [currentText, setCurrentText] = useState('');
      const [isDeleting, setIsDeleting] = useState(false);
      const [typingSpeed, setTypingSpeed] = useState(80);
      const [deletingSpeed, setDeletingSpeed] = useState(30);
      const [showCursor, setShowCursor] = useState(true);
   
      useEffect(() => {
         const type = () => {
         const currentWord = texts[currentTextIndex];
         if (isDeleting) {
            setCurrentText(currentWord.substring(0, currentText.length - 1));
            setTypingSpeed(deletingSpeed);
         } else {
            setCurrentText(currentWord.substring(0, currentText.length + 1));
            setTypingSpeed(typingSpeed);
         }
   
         if (!isDeleting && currentText === currentWord) {
            setIsDeleting(true);
            setTypingSpeed(1000);
         } else if (isDeleting && currentText === '') {
            setIsDeleting(false);
            setCurrentTextIndex((currentTextIndex + 1) % texts.length);
            setTypingSpeed(100);
         }
      };
   
         const timer = setTimeout(type, typingSpeed);
         return () => clearTimeout(timer);
      }, [currentText, currentTextIndex, isDeleting, deletingSpeed, texts, typingSpeed]);
   
      useEffect(() => {
         const cursorTimer = setInterval(() => {
         setShowCursor((prevShowCursor) => !prevShowCursor);
      }, 500);

         return () => clearInterval(cursorTimer);
      }, []);
   
      return (
         <div className="typewriter">
            <div className="title">
               {currentText}
               {showCursor && <span className="cursor">|</span>}
            </div>
         </div>
      );
   };

   async function login(e) {
      e.preventDefault();
      var email = emailLogin;
      var password = passwordLogin;

      await axios.post(BASE_URL + "sign-in/", { email, password }).then(
         (result) => {
            console.log(result);
            var success = result.data.success;
            if (success) {
               saveToken(result.data.token);
               saveUser(result.data);
               navigate('/dashboard');
            } else {
               if (result.data.type) {
                  setErrorType(result.data.type);
                  setErrorMessage(result.data.message);
               }
            }
         }
      ).catch((error) => {
         console.log(error);
      })
   }

   const handleInputChange = (e) => {
      const { id, value } = e.target;
      if (id === "username") {
         setUsername(value);
   } else if (id === "email") {
         setEmail(value);
   } else if (id === "password") {
         setPassword(value);
   } else if (id === "confirmPassword") {
         setConfirmPassword(value);
   }
}

async function register(e) {
   e.preventDefault()

   await axios.post(BASE_URL + "create-user", { username, email, password, confirmPassword })
         .then((result) => {
            var success = result.data.success;

            if (success) {
               saveToken(result.data.token);
               saveUser(result.data);
               window.location.href = '/dashboard';
            } else {
               if (result.data.type) {
                     setErrorType(result.data.type);
                     setErrorMessage(result.data.message);
               }
            }
         })
         .catch((err) => {
            console.log(err.response.data.message)
         })
}

   return (
      <AppStyled>
         <Container style={{height: '100%'}}>
            <Row style={{height: '100%', alignItems: 'center', paddingBottom: '10vh'}}>
               <Col lg={2} style={{ display: 'flex', flexDirection: 'column' }}>
                  <Typewriter texts={texts} />
                  <div className="secondary-title">
                     Twinvest {twitter_logo}
                  </div> 
                  <img src={image} alt="Stats" className="stats-image" /> 
               </Col>  
               <Col lg={3} style={{height: '70vh'}}>
                  <div className="main">
                     <input type="checkbox" id="chk" aria-hidden="true"/>
                     <div className="signup">
                        <form>
                           <label htmlFor="chk" aria-hidden="true">Sign up</label>
                           <br></br><br></br>
                           <div className="input-with-error">
                              <input className="input-line" type="text" required={true} value={username} id="username" onChange={(e) => handleInputChange(e)} placeholder="Username" />
                              <p style={{ display: errorType === 'username' ? 'flex' : 'none' , justifyContent: 'center'  }}> {errorMessage} </p>
                           </div>
                           <div className="input-with-error">
                              <input className="input-line" type="email" required={true} value={email} id="email" onChange={(e) => handleInputChange(e)} placeholder="Email" />
                              <p style={{ display: errorType === 'email' ? 'flex' : 'none' , justifyContent: 'center'  }}> {errorMessage} </p>
                           </div>
                           <div className="input-with-error">
                              <input className="input-line" type="password" required={true} value={password} id="password" onChange={(e) => handleInputChange(e)} placeholder="Password" />
                              <p style={{ display: errorType === 'password' ? 'flex' : 'none' , justifyContent: 'center'  }}> {errorMessage} </p>
                           </div>
                           <div className="input-with-error">
                              <input className="input-line" type="password" required={true} value={confirmPassword} id="confirmPassword" onChange={(e) => handleInputChange(e)} placeholder="Confirm Password" />
                              <p style={{ display: errorType === 'confirmPassword' ? 'flex' : 'none' , justifyContent: 'center'  }}> {errorMessage} </p>
                           </div>
                           <input className="submit-button" type="submit" onClick={(e) => register(e)} />
                        </form>
                     </div>
                  
                     <div className="login">
                        <form>
                           <label htmlFor="chk" aria-hidden="true">Login</label>
                           <div className="input-with-error">
                              <input className="input-line" type="email" required={true} onChange={(e) => { setEmailLogin(e.target.value) }} placeholder="Email" />
                              <p style={{ display: errorType === 'email' || errorType === 'user' ? 'flex' : 'none', justifyContent: 'center' }}> {errorMessage}</p>
                           </div>
                           <div className="input-with-error">
                              <input className="input-line" type="password" required={true} onChange={(e) => { setPasswordLogin(e.target.value) }} placeholder="Password" />
                              <p style={{ display: errorType === 'password' ? 'flex' : 'none' , justifyContent: 'center' }}> {errorMessage} </p>
                           </div>
                           <input className="submit-button" type="submit" onClick={(e) => login(e)} />
                           <input className="submit-button" type="submit" value="Reset Password"/>
                        </form>
                     </div>
                  </div>
               </Col>
            </Row>
         </Container>
      </AppStyled>
   );
}


const AppStyled = styled.div`
	display: flex;
	justify-content: flex-end;
	font-family: 'Jost', sans-serif;
   height: 100vh;
   width: 100%;
   background: linear-gradient(rgb(84 66 98), rgb(62 32 94), rgb(43 27 79));
   .standard-form {
      padding-top: 30px;
   }
   input, textarea, select{
      font-family: 'Nunito', sans-serif;
      font-size: inherit;
      outline: none;
      border: none;
      padding: .5rem 1rem;
      border-radius: 5px;
      border: 2px solid #fff;
      resize: none;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
   }

   .stats-image {
      position: absolute;
      left: 10pc;
      top: 6.5pc;
      width: 50pc; 
      height: auto;
   }

   .title {
      font-family: 'Jost', sans-serif;
      font-size: 40px;
      font-weight: bold;
      margin-top: 20px;
      margin-left: 20px;
      color: white;
      position: absolute;
      top: 20px;
      left: 20px;
    }
    
    .cursor {
      animation: blink 1s infinite;
    }
    
    @keyframes blink {
      0%, 100% {
        opacity: 1;
      }
      50% {
      opacity: 0;
      }
   }
   
   .secondary-title {
      font-family: 'Jost', sans-serif;
      font-size: 70px;
      font-weight: bold;
      margin-top: 3pc;
      margin-left: 1.5pc;
      color: white;
   }

   .main{
      width: 420px;
      height: 70vh;
      background: red;
      overflow: hidden;
      background: url("https://doc-08-2c-docs.googleusercontent.com/docs/securesc/68c90smiglihng9534mvqmq1946dmis5/fo0picsp1nhiucmc0l25s29respgpr4j/1631524275000/03522360960922298374/03522360960922298374/1Sx0jhdpEpnNIydS4rnN4kHSJtU1EyWka?e=view&authuser=0&nonce=gcrocepgbb17m&user=03522360960922298374&hash=tfhgbs86ka6divo3llbvp93mg4csvb38") no-repeat center/ cover;
      border-radius: 10px;
      box-shadow: 5px 20px 50px #000;
      margin-right: 12pc; /* Adaugă această linie pentru marginea din dreapta */
      margin-top: 4pc; 
   }

   #chk{
      display: none;
   }
      
   #chk:checked ~ .login{
      transform: translateY(-600px);
   }
   #chk:checked ~ .login label{
      transform: scale(1);	
   }
   #chk:checked ~ .signup label{
      transform: scale(.8);
   }

   .signup{
      position: relative;
      width:100%;
      height: 100%;
   }
   label{
      color: #fff;
      font-size: 2.3em;
      justify-content: center;
      display: flex;
      margin: 60px;
      font-weight: bold;
      cursor: pointer;
      transition: .5s ease-in-out;
   }
   input{
      background: #e0dede;
      width: 60%;
      height: 30px;
      justify-content: center;
      display: flex;
      margin: 5px auto;
      padding: 10px;
      border: none;
      outline: none;
      border-radius: 5px;
   }
   .submit-button{
      width: 60%;
      height: 50px;
      margin: 8px auto;
      justify-content: center;
      display: block;
      color: #fff;
      background: #9574b9;
      font-size: 1.3em;
      font-weight: bold;
      margin-top: 40px;
      outline: none;
      border: none;
      border-radius: 5px;
      transition: .2s ease-in;
      cursor: pointer;
   }
   button:hover{
      background: #6d44b8;
   }
   .login{
      height: 70vh;
      background: #eee;
      border-radius: 60% / 10%;
      transform: translateY(-180px);
      transition: .8s ease-in-out;
   }
   .login label{
      color: #573b8a;
      transform: scale(.6);
   }
   

`

export default Login;