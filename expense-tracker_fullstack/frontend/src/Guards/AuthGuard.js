import React, { useEffect } from 'react'
import { useHistory, useLocation } from "react-router-dom"
import { useGlobalContext } from '../context/globalContext';

const AuthGuard = ({ children }) => {
    const {getToken} = useGlobalContext();
    let page = window.location.pathname;
    if (page === '/home') {
        if (getToken()) {
            return children;
        } 
    
        alert("You have to be logged in to access this page!");
        window.location.href = '/';
    
        return false;
    } else {
        return children;
    }
}

export default AuthGuard;