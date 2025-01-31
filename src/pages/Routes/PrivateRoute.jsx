import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    
    const auth = localStorage.getItem('auth');
    let isAuthenticated = false;

    try {
        isAuthenticated = auth ? JSON.parse(auth) : false;
    } catch (error) {
        console.error('Error parsing auth data:', error.message);
        isAuthenticated = false;
    }

    // If authenticated, render child routes; otherwise, redirect to login
    return isAuthenticated ? <Outlet /> : <Navigate to="/Login" />;
};

export default PrivateRoute;
