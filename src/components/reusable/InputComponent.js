import React from 'react';
import '../styles/input.css';

export default function InputComponent({type, name, id, placeholder, onChange, value, label, className}) {
    return (
        <>
        <div className='input-box'>
            <label htmlFor={ id }> { label } </label>
            <input 
                type={ type }
                name={ name }
                id={ id } 
                placeholder={ placeholder }
                onChange={ onChange }
                value={ value }
                className={ className }
            />
        </div>
        </>
    )
}