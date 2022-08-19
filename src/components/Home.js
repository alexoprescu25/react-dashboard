import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

function Home() {

    useEffect(() => {
        document.querySelector('body').setAttribute('id', 'Home')
    }, []);

    return (
        <>
        <div className='container'>
            <div className='box'>
                <div className='icon'>
                    <FontAwesomeIcon icon={faGlobe} />
                </div>
                <h1>Websites</h1>
                <p>Choose thousands of Web design online course.</p>
                <Link to='/websites'>Read More</Link>
            </div>
        </div>
        </>
    )
}

export default Home;