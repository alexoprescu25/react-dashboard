import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';

import '../styles/websites.css';

function WebsiteDetails() {

    const images = {
        'erealty-media': 'https://i.ibb.co/tBJq2Hc/erealtymedia.png',
        'idx-broker': 'https://i.ibb.co/gzXWdC5/Screenshot-2022-07-28-095523.png',
        'client-solutin': 'https://i.ibb.co/CmZ20b8/header-logo.png'
    }

    const { websiteId } = useParams();
    const [website, setWebsite] = useState(null);

    const docRef = doc(db, 'websites', websiteId);

    useEffect(() => {
        const getWebsite = async () => {
            const data = await getDoc(docRef);
            setWebsite(data.data()); 
        }

        getWebsite();
    }, []);

    function copyText(event, item) {
        navigator.clipboard.writeText(item);
    }

    const websiteInfo = [
        { name: 'Beta Link', path: 'beta-link', link: true },
        { name: 'Design Path', path: 'design-path', link: false },
        { name: 'Preview', path: 'design-preview', link: true },
        { name: 'LocalHost', path: 'localhost', link: true },
        { name: 'Specifications', path: 'specs', link: true },
        { name: 'VS Folder', path: 'vs-folder', link: false }
    ]

    return (
        <>
        <div id='WebsiteDetails'>
            <Link to="/websites" className='back-button'><FontAwesomeIcon icon={faArrowLeft} /> Back</Link>
            <div className='container'>
                { website ? 
                    <div className='website-details'>
                        <div className='top-details'>
                            <div>
                                <h1> { website.title } </h1>
                                <p> { website.date } </p>
                            </div>
                            <img src={ images[website['project-type']] } className='item-image' />
                        </div>

                        { websiteInfo.map((item) => (
                            <div className='website-info' key={ websiteInfo.indexOf(item) }>
                                <p> { item.name } </p>
                                <p> 
                                    { item.link ? 
                                        <a href={ website[item.path] } target='_blank'> { website[item.path] } </a>
                                      : <span className='website-info-p'> { website[item.path] } </span>
                                    }
                                    
                                    <Tooltip title="Copy" placement="top-start" onClick={event => copyText(event, website[item.path]) }>
                                        <IconButton>
                                            <ContentCopyIcon />
                                        </IconButton>
                                    </Tooltip>
                                </p>
                            </div>
                        )) }
                        
                    </div> 
                : <CircularProgress /> }
            </div>
        </div>    
        </>
    )
}

export default WebsiteDetails; 