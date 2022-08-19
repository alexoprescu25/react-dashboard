import React, { useState } from 'react';

import InputComponent from '../reusable/InputComponent';

function AddItem() {

    const [progress, setProgress] = useState(false);
    const [globalSuccessMessage, setSuccessMessage] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
    }

    function setItem(item) {
        setSuccessMessage(item);
        setTimeout(() => {
            setSuccessMessage('');
        }, 1500);
    }

    return (
        <>
        { globalSuccessMessage ? 
            <div className='success-message'>
                <p> { globalSuccessMessage } </p>
            </div> : null
        }
        <form onSubmit={ handleSubmit }>
            <InputComponent 
                type='text'
                id='item'
                label='Add Item'
                placeholder={ 'Add Item' }
            />
            <button type="submit"> { !progress ? 'Submit' : <div className="spinner"></div> } </button>
        </form>
        </>
    )
}

export default AddItem;