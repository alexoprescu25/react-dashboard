import React from 'react';

import '../styles/select.css';

export default function SelectComponent({ value, id, defaultValue, onChange, optionArray, label }) {
    return (
        <div className='select-box'>
            <label htmlFor={ id }> { label } </label>
            <select
                onChange={ onChange }
                value={ value }
                id={ id }
            >
                <option defaultValue> { defaultValue } </option>
                { optionArray ? optionArray.map((item) => (
                    <option value={ item.value } key={ optionArray.indexOf(item) }> { item.name } </option>
                )) : null }
            </select>
        </div>
    )
}