import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import AuthContext from './AuthContext';

function PrivateRoute({ children }) {
    let { token } = useContext(AuthContext);
    if (!token) {
        token = localStorage.getItem('token');
    }
    
    if (!token) {
        return <Navigate to="/login" replace />
    }
    return children;
}

export default PrivateRoute;