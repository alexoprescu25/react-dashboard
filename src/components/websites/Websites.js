import React, { useEffect, useRef, useState } from 'react';
import { Editor, EditorState } from 'draft-js';
import { useNavigate } from 'react-router-dom';

import '../styles/websites.css';

import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

import '../styles/spinner.css';

import InputComponent from '../reusable/InputComponent';
import SelectComponent from '../reusable/SelectComponent';

function Websites() {

    const [formData, setFormData] = useState({
        'title': '',
        'link': '',
        'beta-link': '',
        'localhost': '',
        'vs-folder': '',
        'design-path': '',
        'design-preview': '',
        'specs': '',
        'date': getCurrentDate(),
        'project-type': '',
        'status': ''
    });
    const [progress, setProgress] = useState(false);
    const [globalSuccessMessage, setSuccessMessage] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const navigate = useNavigate();

    const editor = useRef(null);

    function focusEditor() {
        editor.current.focus();
    }

    useEffect(() => {
        focusEditor();
    }, []);

    const websitesCollectionRef = collection(db, "websites");

    function setItem(item) {
        setSuccessMessage(item);
        setTimeout(() => {
            setSuccessMessage('');
        }, 1500);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setProgress(true);

        await addDoc(websitesCollectionRef, formData);

        setProgress(false);
        setItem('Website added!');
        
        setTimeout(() => {
            navigate('/websites');
        }, 1000);
    }

    function handleInputChange(e) {
        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value
        })
    }

    function getCurrentDate() {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        return today;
    }

    const formInputs = [
        { type: 'text', id: 'title', placeholder: 'Title' },
        { type: 'text', id: 'link', placeholder: 'Link' },
        { type: 'text', id: 'beta-link', placeholder: 'Beta Link' },
        { type: 'text', id: 'localhost', placeholder: 'LocalHost' },
        { type: 'text', id: 'vs-folder', placeholder: 'VS Folder' },
        { type: 'text', id: 'design-path', placeholder: 'Design Path' },
        { type: 'text', id: 'design-preview', placeholder: 'Design Preview' },
        { type: 'text', id: 'specs', placeholder: 'Specifications' }
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
        <div id='Websites'>
            { globalSuccessMessage ? 
                <div className='success-message'>
                    <p> { globalSuccessMessage } </p>
                </div> : null
            }
            <div className='container'>
                <div className='websites-form'>
                <h1>Create New Project</h1>
                    <form onSubmit={ handleSubmit }>
                        <div>
                            { formInputs.map((item) => (
                                <InputComponent 
                                    type={ item.type }
                                    id={ item.id }
                                    name={ item.id }
                                    placeholder={ item.placeholder }
                                    onChange={ handleInputChange }
                                    value={ formData[item.id] }
                                    label={ item.placeholder }
                                    key={ formInputs.indexOf(item) }
                                />
                            )) }
                            { selectArray.map((item) => (
                                <SelectComponent 
                                    onChange={ handleInputChange }
                                    value={ item.id }
                                    optionArray={ item.optionArray }
                                    id={ item.id }
                                    defaultValue={ item.label }
                                    label={ item.label }
                                />
                            )) }
                        </div>
                        <button type="submit"> { !progress ? 'Submit' : <div className="spinner"></div> } </button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Websites;