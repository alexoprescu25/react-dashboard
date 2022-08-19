import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; 
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import '../styles/websites.css';

import InputComponent from '../reusable/InputComponent';
import SelectComponent from '../reusable/SelectComponent';

import '../styles/spinner.css';

function EditWebsite() {

    const [globalSuccessMessage, setSuccessMessage] = useState('');
    const [progress, setProgress] = useState(false);

    const { websiteId } = useParams();

    const navigate = useNavigate();

    const [website, setWebsite] = useState(null);

    const docRef = doc(db, 'websites', websiteId);

    useEffect(() => {
        const getWebsite = async () => {
            const data = await getDoc(docRef);
            setWebsite(data.data()); 
        }

        getWebsite();
    }, []);

    function handleInputChange(e) {
        e.preventDefault();

        setWebsite({
            ...website,
            [e.currentTarget.id]: e.currentTarget.value
        })
    }

    function setItem(item) {
        setSuccessMessage(item);
        setTimeout(() => {
            setSuccessMessage('');
        }, 1500);
    }

    async function handleSave(e) {
        e.preventDefault();

        setProgress(true);

        const websiteDoc = doc(db, 'websites', websiteId);
        const newFields = website;
        await updateDoc(websiteDoc, newFields);

        setProgress(false);
        setItem('Website changed!');

        setTimeout(() => {
            navigate('/websites');
        }, 1000);
    }

    const formInputs = [
        { type: 'text', id: 'title', placeholder: 'Title' },
        { type: 'text', id: 'link', placeholder: 'Link' },
        { type: 'text', id: 'beta-link', placeholder: 'Beta Link' },
        { type: 'text', id: 'localhost', placeholder: 'LocalHost' },
        { type: 'text', id: 'vs-folder', placeholder: 'VS Folder' },
        { type: 'text', id: 'design-path', placeholder: 'Design Path' },
        { type: 'text', id: 'design-preview', placeholder: 'Design Preview' },
        { type: 'text', id: 'specs', placeholder: 'Specifications' },
        { type: 'date', id: 'date', placeholder: 'Date' }
    ]

    const typeArray = [
        { value: 'erealty-media', name: 'erealtyMedia' },
        { value: 'idx-broker', name: 'IDX Broker' },
        { value: 'client-solutin', name: 'Client Solution' }
    ]

    const statusArray = [
        { value: 'active', name: 'Active' },
        { value: 'inactive', name: 'Inactive' }
    ]

    const selectArray = [
        { id: 'project-type', label: 'Project Type', optionArray: typeArray },
        { id: 'status', label: 'Status', optionArray: statusArray }
    ]

    return (
        <>
            <div id='EditWebsite'>
                <Link to="/websites" className='back-button'><FontAwesomeIcon icon={faArrowLeft} /> Back</Link>
                <div className='container'>
                    { globalSuccessMessage ? 
                        <div className='success-message'>
                            <p> { globalSuccessMessage } </p>
                        </div> : null
                    }
                    { website ? 
                    <form>
                        <div>
                            { formInputs.map((item) => (
                                <InputComponent 
                                    type={ item.type }
                                    id={ item.id }
                                    name={ item.id }
                                    placeholder={ item.placeholder }
                                    onChange={ handleInputChange }
                                    value={ website[item.id] }
                                    label={ item.placeholder }
                                    key={ formInputs.indexOf(item) }
                                />
                            )) }
                            { selectArray.map((item) => (
                                <SelectComponent 
                                    onChange={ handleInputChange }
                                    value={ website[item.id] }
                                    optionArray={ item.optionArray }
                                    id={ item.id }
                                    defaultValue={ item.label }
                                    label={ item.label }
                                />
                            )) }
                        </div>
                        <button type='submit' onClick={ handleSave }> { !progress ? 'Save' : <div className="spinner"></div> } </button>
                    </form> : null }
                </div>
            </div>
        </>
    )
}

export default EditWebsite;