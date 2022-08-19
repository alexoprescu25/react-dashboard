import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faGear, faHouse, faChartPie, faUser, faUserCheck, faDoorOpen } from '@fortawesome/free-solid-svg-icons';

import AuthContext from '../auth/AuthContext';

function Header() {

    const { token, setToken } = useContext(AuthContext);

    function handleSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.style.left = '0';
    }

    const headerLinks = [
        { name: 'Home', path: '/', icon: faHouse },
        { name: 'Dashboard', path: '/', icon: faGear },
        { name: 'App', path: '/', icon: faChartPie }
    ]

    function handleLogOut() {
        localStorage.removeItem('token');
        setToken(null);
    }

    return (
        <>
        <header>
            <nav>
                { token ?
                <> 
                    <button><FontAwesomeIcon icon={faBars} onClick={ handleSidebar } /></button>
                    { headerLinks.map((item) => (
                        <Link to={ item.path } key={ headerLinks.indexOf(item) }><FontAwesomeIcon icon={ item.icon } /> { item.name } </Link>
                    )) }
                    <Link to="/" onClick={ handleLogOut }><FontAwesomeIcon icon={ faDoorOpen } />Log Out</Link>
                </> : null
                }
            </nav>
        </header>
        </>
    )
}

export default Header;