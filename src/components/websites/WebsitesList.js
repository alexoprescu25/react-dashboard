import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowRotateRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { db } from '../../firebase';
import { getDocs, collection } from 'firebase/firestore';

import Loader from '../shared/Loader';
import WebsiteCard from './WebsiteCard';
import Pagination from './Pagination';

function WebsitesList() {

    const [websites, setWebsites] = useState([]);
    const websitesCollection = collection(db, "websites");
    const [rows, setRows] = useState('');
    const [filter, setFilter] = useState('');
    const [active, setActive] = useState(0);
    const [inactive, setInactive] = useState(0)

    const filteredData = websites.filter((item) => {
        return item.title.toLowerCase().includes(filter.toLowerCase());
    })

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(6);

    const indexOfLastPost = currentPage * postsPerPage;
    const inedxOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredData.slice(inedxOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const getWebsites = async () => {
        const data = await getDocs(websitesCollection);
        setWebsites(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }

    useEffect(() => {
        getWebsites();
        activeWebsites();
    }, [])

    function handleRows(e) {
        setRows(e.currentTarget.value);
    }

    function handleRowsChange() {
        setPostsPerPage(rows);
    }
 
    function handleSearch(e) {
        setFilter(e.currentTarget.value);
    }

    function activeWebsites(type) {
        let count = 0;

        for(const item of websites) {
            if(item.status === type) {
                count += 1;
            } 
        }

        return count;
    }

    return (
        <>
        { websites.length ?
            <div id='WebsitesList'>
                <div className='container'>
                    <div className='card-buttons'>
                        <button><p> { websites.length} </p> All</button>
                        <button><p> { activeWebsites('active') } </p> Active</button>
                        <button><p> { activeWebsites('inactive') } </p> Inactive</button>
                    </div>
                    <div className='list'>
                        <div>
                            <p>Rows Per Page</p>
                            <input 
                                type='number'
                                placeholder='Rows'
                                onChange={ handleRows }
                                value={ rows }
                            />
                            <button onClick={ handleRowsChange }>
                                <FontAwesomeIcon icon={faArrowRotateRight} />
                            </button>
                        </div>
                        <div className='search-container'>
                            <input 
                                type="text"
                                id='search'
                                name='search'
                                placeholder='Search...'
                                onChange={ handleSearch }
                            />
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </div>
                        <Link to="/add-website" className='add-button'><FontAwesomeIcon icon={faPlus} />Add Website</Link>
                    </div>
                    <WebsiteCard  posts={ currentPosts } />
                    <Pagination 
                        postsPerPage={ postsPerPage }
                        totalPosts={ websites.length }
                        paginate={ paginate }
                    />
                </div>
            </div>
            : <Loader />  }
        </>
    )
}

export default WebsitesList;