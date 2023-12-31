import React, { useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/globalContext";
import { CenteredModal } from "../../styles/Layouts";
import styled from "styled-components";

const BASE_URL = "http://localhost:5000/api/v1/";

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errorType, setErrorType] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { saveToken, saveUser } = useGlobalContext();

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

    return (
        <AppStyled>
            <CenteredModal>
                <div className="register">
                    <h1> Register </h1>
                    <form className="standard-form">
                        <div className="input-with-error">
                            <input className="input-line" type="text" required={true} value={username} id="username" onChange={(e) => handleInputChange(e)} placeholder="Username" />
                            <p style={{ display: errorType === 'username' ? 'flex' : 'none' }}> {errorMessage} </p>
                        </div>
                        <div className="input-with-error">
                            <input className="input-line" type="email" required={true} value={email} id="email" onChange={(e) => handleInputChange(e)} placeholder="Email" />
                            <p style={{ display: errorType === 'email' ? 'flex' : 'none' }}> {errorMessage} </p>
                        </div>
                        <div className="input-with-error">
                            <input className="input-line" type="password" required={true} value={password} id="password" onChange={(e) => handleInputChange(e)} placeholder="Password" />
                            <p style={{ display: errorType === 'password' ? 'flex' : 'none' }}> {errorMessage} </p>
                        </div>
                        <div className="input-with-error">
                            <input className="input-line" type="password" required={true} value={confirmPassword} id="confirmPassword" onChange={(e) => handleInputChange(e)} placeholder="Password" />
                            <p style={{ display: errorType === 'confirmPassword' ? 'flex' : 'none' }}> {errorMessage} </p>
                        </div>
                        <input className="submit-button" type="submit" onClick={(e) => register(e)} />
                    </form>
                    
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
    }
    
`

export default Register;