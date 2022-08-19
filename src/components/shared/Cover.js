import React from 'react';

import '../styles/cover.css';

export default function Cover({title, text}) {
    return (
        <>
            <div id='Cover'>
                <div className='container'>
                    <h1> { title } </h1>
                    <p> { text } </p>
                </div>
            </div>
        </>
    )
}