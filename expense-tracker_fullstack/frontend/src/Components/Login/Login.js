import React, { useContext, useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function login(e) {
        e.preventDefault()
        try {
            await axios.post("http://localhost:5000/api/v1/sign-in/", {email, password}).then(
                (result) => {
                    console.log(result);
                }
            );
        } catch(error) {
            console.log(error);
        }
    }

    return(
        <div className="login">
            <h1> Login </h1>
            
            <form>
                <input type="email" onChange={(e) => {setEmail(e.target.value)}} placeholder="Email"/>
                <input type="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="Password"/>

                <input type="submit" onClick={(e) => login(e)}/>
            </form>

            <br></br>

            <Link to="/register">Register</Link>
        </div>
    );

}

export default Login;