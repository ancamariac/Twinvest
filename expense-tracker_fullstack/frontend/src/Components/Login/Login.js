import React, { useContext, useState, useEffect } from "react"
import axios from "axios";
import { Link, useNavigate} from "react-router-dom";
import { useGlobalContext } from "../../context/globalContext";


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