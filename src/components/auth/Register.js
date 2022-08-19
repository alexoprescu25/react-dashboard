import React from 'react';
import { useState } from "react";
import {
  createUserWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../../firebase";

import InputComponent from "../reusable/InputComponent";
import Cover from '../shared/Cover';

import '../styles/auth.css';

function Register() {

  const errorMessages = {
    'registerEmail': 'Please enter your email!',
    'registerPassword': 'Please enter your password!'
  }

  const [formData, setFormData] = useState({
    'registerEmail': '',
    'registerPassword': ''
  })

  const [formError, setFormError] = useState({
    'registerEmail': '',
    'registerPassword': ''
  });

  const [progress, setProgress] = useState(false);
  const [isDirty, setDirty] = useState(false);

  async function Register(e) {
    e.preventDefault();

    const isInvalid = validateFormData();

    if(!isInvalid) {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          formData['registerEmail'],
          formData['registerPassword']
        );
      } catch (error) {
        console.log(error.message);
      }
    }

    setProgress(false);
  }

  function validateFormData() {
    const inputs = ['registerEmail', 'registerPassword'];
    let isInvalid = false;
    const newError = {...formError};

    for(const input of inputs) {
      if(!formData[input]) {
        newError[input] = errorMessages[input];
        isInvalid = true;
        setDirty(true);
      }
    }

    setFormError(newError);
    return isInvalid;
  }

  function handleInputChange(e) {
    setDirty(false);

    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value
    });

    const newError = {
      ...formError,
      [e.currentTarget.id]: ''
    }

    setFormError(newError);
  }

  const formInputs = [
    { type: 'text', id: 'registerEmail', label: 'Email' },
    { type: 'password', id: 'registerPassword', label: 'Password' }
  ]

  return (
    <div id="Register">
      <Cover 
        title='Create New User'
        text='Change account information and settings'
      />
        <div className="container">
            <form onSubmit={ Register }>
              <h1>Create New User</h1>
              { formInputs.map((item) => (
                  <React.Fragment key={ formInputs.indexOf(item) }>
                    <InputComponent 
                      type={ item.type }
                      placeholder={ item.label + '...' }
                      onChange={ handleInputChange }
                      id={ item.id }
                      value={ formData[item.id] }
                      label={ item.label }
                      className={ formError[item.id] ? 'input-error' : null }
                    />
                    { formError[item.id] ? <p className="p-error"> { formError[item.id] } </p> : null }
                  </React.Fragment>
                )) }
                <button type="submit" disabled={ isDirty }> { !progress ? 'Create New User' : <div className="spinner"></div> } </button>
            </form>
        </div>
    </div>
  );
}

export default Register;