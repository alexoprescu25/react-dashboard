import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Home';
import Header from './shared/Header';
import Sidebar from './shared/Sidebar';
import Websites from './websites/Websites';
import WebsiteDetails from './websites/WebsiteDetails';
import WebsitesList from './websites/WebsitesList';
import EditWebsite from './websites/EditWebsite';
import Register from './auth/Register';
import Login from './auth/Login';
import ToDoList from './todolist/ToDoList';
import PrivateRoute from './auth/PrivateRoute';
import AuthContext from './auth/AuthContext';

import './styles/main.css';

function App() {

    const [token, setToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            setToken(token);
        }
    }, []);

    const routes = [
        { path: '/', component: <Home /> },
        { path: '/websites', component: <WebsitesList /> },
        { path: '/websitedetails/:websiteId', component: <WebsiteDetails /> },
        { path: '/add-website', component: <Websites /> },
        { path: '/editwebsite/:websiteId', component: <EditWebsite /> },
        { path: '/register', component: <Register /> },
        { path: '/todolist', component: <ToDoList /> }
    ]
    
    return (
        <>
        <AuthContext.Provider value={ { token, setToken } }>
            <BrowserRouter>
                <Header />
                <Sidebar />
                <Routes>
                    { routes.map((item) => (
                        <Route exact path={ item.path } key={ routes.indexOf(item) } element={ 
                            <PrivateRoute>
                                { item.component }
                            </PrivateRoute>
                         } />
                    )) }
                    <Route exact path='/login' element={ <Login /> } />
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
        </>
    )
}

export default App;