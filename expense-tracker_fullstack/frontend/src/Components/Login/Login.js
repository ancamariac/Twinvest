import React, { useContext, useState, useEffect } from "react"
import axios from "axios";
import { Link, useNavigate} from "react-router-dom";
import { useGlobalContext } from "../../context/globalContext";
import styled from "styled-components";
import { CenteredModal } from "../../styles/Layouts";


function Login({goHome}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    const {saveToken, saveUser} = useGlobalContext();

    async function login(e) {
        e.preventDefault();

        await axios.post("http://localhost:5000/api/v1/sign-in/", {email, password}).then(
            (result) => {
                var success = result.data.success;
                if (success) {
                    saveToken(result.data.token);
                    saveUser(result.data);
                    navigate('/home');
                } else {
                    alert(result.data.message);
                }
            }
        ).catch((error) => {
            console.log(error);
        }) 
    }

    return(
        <AppStyled>
            <CenteredModal>
                <h1> Login </h1>
                <form class="standard-form">
                    <input class="input-line" type="email" onChange={(e) => {setEmail(e.target.value)}} placeholder="Email"/>
                    <input class="input-line" type="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="Password"/>
                    <input class="submit-button" type="submit" onClick={(e) => login(e)}/>
                </form>
                <br></br>
                <div class="change-modal-text">
                    You don't have an account yet? Go to
                    <Link class="link" to="/register">Register</Link>
                </div>

            </CenteredModal>
        </AppStyled>     
    );

}

const AppStyled = styled.div`
    height: 100vh;
    width: 100%;
    background: linear-gradient(180deg, #78c7a7 40%, #a67cbc 90%);
    .standard-form {
        padding-top: 30px;
    }   
`

export default Login;