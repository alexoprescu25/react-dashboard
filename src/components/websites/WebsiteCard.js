import React, { useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faLink, faXmark } from '@fortawesome/free-solid-svg-icons';

import { doc, deleteDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';

import Modal from 'react-modal';

Modal.setAppElement('#root');

function WebsiteCard({ posts }) {

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          padding: '40px',
          boxShadow: 'rgb(255 255 255 / 30%) 0px 5rem 14rem 0px, rgb(0 0 0 / 60%) 0px 0.8rem 2.3rem, rgb(0 0 0 / 45%) 0px 0.2rem 0.3rem',
          transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
        },
      };

    const images = {
        'erealty-media': 'https://i.ibb.co/tBJq2Hc/erealtymedia.png',
        'idx-broker': 'https://i.ibb.co/gzXWdC5/Screenshot-2022-07-28-095523.png',
        'client-solutin': 'https://i.ibb.co/CmZ20b8/header-logo.png'
    }
    
    const [modalIsOpen, setIsOpen] = useState(false);
    const [id, setId] = useState(null);

    function openModal(e, param) {
        setIsOpen(true);
        setId(param);
    }

    function closeModal() {
        setIsOpen(false);
    }

    async function handleDelete() {
        const websiteDoc = doc(db, 'websites', id);
        await deleteDoc(websiteDoc);
        setIsOpen(false);
    }

    function getDate(item) {
        const date = new Date(item);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    
        return date.toLocaleDateString("en-US", options);
    }

    return (
        <div id="WebsiteCard">
            <Modal
                isOpen={ modalIsOpen }
                onRequestClose={ closeModal }
                style={customStyles}
                id="delete-modal"
            >
                <FontAwesomeIcon icon={faXmark} />
                <h2>Do you really want to delete this invoice?</h2>
                <p>You won't be able to revert after deletion</p>
                <div className='modal-buttons'>
                    <button onClick={ handleDelete }>Delete</button>
                    <button onClick={ closeModal }>Close</button>
                </div>
            </Modal>
            { posts ? 
                <table>
                    <thead>
                        <tr>
                            <td>Title</td>
                            <td>Project Type</td>
                            <td>Status</td>
                            <td>Date</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        
                            { posts.map((item) => (
                                <tr key={ item.id }>
                                    <td><Link to={ '/websitedetails/' + item.id } className='item-title'> { item.title } </Link> <a href={ item['link'] } target='_blank'><FontAwesomeIcon icon={faLink} /></a></td>
                                    <td><img src={ images[item['project-type']] } className='item-image' /></td>
                                    <td> { item.status === 'active' ? <p className='active-item'>Active</p> : <p className='inactive-item'>Inactive</p> } </td>
                                    <td> { getDate(item.date) } </td>
                                    <td>
                                        <Link to={'/editwebsite/' + item.id}>
                                            <Tooltip title="Edit" placement="top-start" onClick={ openModal } id={ item.id }>
                                                <IconButton className='edit-button'>
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Link>
                                        <Tooltip title="Delete" placement="top-start" onClick={ e => openModal(e, item.id) }>
                                            <IconButton>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    </td>
                                </tr>
                            )) }
                    </tbody>
                </table> 
            : null }
        </div>
    )
}

export default WebsiteCard;