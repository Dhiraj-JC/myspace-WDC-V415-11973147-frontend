import React from 'react'
import {Navigate} from 'react-router-dom';
import jwt_decode from 'jwt-decode';

export default function ProtectedRoute({children}) {
 
    const token = localStorage.getItem('token');

    if(!token) {
        return <Navigate to='/login' />;
    }

    const decodedToken = jwt_decode(token);

    if(decodedToken.exp * 1000 <Date.now()) {
        localStorage.removeItem('token');
        return <Navigate to='/login' />;
    }


    return children;

}
