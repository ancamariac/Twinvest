import React, { useState } from "react"
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
                <form className="standard-form">
                    <input className="input-line" type="email" onChange={(e) => {setEmail(e.target.value)}} placeholder="Email"/>
                    <input className="input-line" type="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="Password"/>
                    <input className="submit-button" type="submit" onClick={(e) => login(e)}/>
                </form>
                <br></br>
                <div className="change-modal-text">
                    You don't have an account yet? Go to
                    <Link className="link" to="/register">Register</Link>
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
    input, textarea, select{
        font-family: 'Nunito', sans-serif;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }

    }
`

export default Login;