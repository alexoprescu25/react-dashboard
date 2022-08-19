import React from 'react';

import '../styles/todolist.css';

import AddItem from './AddItem';

function ToDoList() {
    return (
        <>
         <div id='ToDoList'>
            <div className='container'>
                <AddItem />
            </div>
         </div>
        </>
    )
}

export default ToDoList;