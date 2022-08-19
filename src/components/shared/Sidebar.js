import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingColumns, faGlobe, faXmark, faList, faPlus } from '@fortawesome/free-solid-svg-icons';

import '../styles/aside.css';

function Sidebar() {

    function handleCloseEvent() {
        const sidebar = document.getElementById('sidebar');
        sidebar.style.left = '-100%';
    }

    const sidebarLinks = [
        { name: 'Banking', path: '/', icon: faBuildingColumns },
        { name: 'Websites', path: '/websites', icon: faGlobe },
        { name: 'To Do List', path: '/todolist', icon: faList },
        { name: 'Create User', path: '/register', icon: faPlus }
    ]

    return (
        <>
        <aside id="sidebar">
            <button className='close-button' onClick={ handleCloseEvent }><FontAwesomeIcon icon={faXmark} /></button>
            <div className='container'>
                { sidebarLinks.map((item) => (
                    <Link to={ item.path }><FontAwesomeIcon icon={ item.icon } /> { item.name } </Link>
                )) }
            </div>
        </aside>
        </>
    )
}

export default Sidebar;