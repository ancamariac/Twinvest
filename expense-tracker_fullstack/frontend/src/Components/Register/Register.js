import React, { useContext, useState, setState} from "react"
import axios from "axios";
import { Link, redirect } from "react-router-dom";
import { useGlobalContext } from "../../context/globalContext";
import { CenteredModal } from "../../styles/Layouts";
import styled from "styled-components";

const BASE_URL = "http://localhost:5000/api/v1/";

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const {saveToken, saveUser} = useGlobalContext();

    async function register(e) {
        e.preventDefault()
        
        await axios.post(BASE_URL + "create-user", {username, email, password, confirmPassword})
        .then((result) => {
            var success = result.data.success;

            if (success) {
                saveToken(result.data.token);
                saveUser(result.data);
                window.location.href = '/home';
            } else {
                alert(result.data.message);
            }
        })
        .catch((err) =>{
            console.log(err.response.data.message)
        })
    }

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        console.log(id, value);
        if(id === "username"){
            setUsername(value);
        } else if(id === "email"){
            setEmail(value);
        } else if(id === "password"){
            setPassword(value);
        } else if(id === "confirmPassword"){
            setConfirmPassword(value);
        }
    }

    return(
        <AppStyled>

            <CenteredModal>

                <div className="register">
                    <h1> Register </h1>

                    <form class="standard-form">
                        <input class="input-line" type="text" value={username} id="username" onChange = {(e) => handleInputChange(e)} placeholder="Username"/>
                        <input class="input-line" type="email"  value={email} id="email" onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
                        <input class="input-line" type="password"  value={password} id="password" onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
                        <input class="input-line" type="password"  value={confirmPassword} id="confirmPassword" onChange = {(e) => handleInputChange(e)}  placeholder="Password"/>

                        <input  class="submit-button" type="submit" onClick={(e) => register(e)} />
                    </form>

                    <br>
                    </br>
                    <div class="change-modal-text">
                        Already have an account?  <Link class="link" to="/">Login</Link>
                    </div>

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

export default Register;