import React from 'react';
import { useState, useContext, useEffect } from "react";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';

import '../styles/auth.css';
import '../styles/spinner.css';

import InputComponent from "../reusable/InputComponent";

function Login() {

  const errorMessages = {
    'loginEmail': 'Please enter your email!',
    'loginPassword': 'Please enter your password!'
  }

  const [formData, setFormData] = useState({
    'loginEmail': '',
    'loginPassword': ''
  });

  const [formError, setFormError] = useState({
    'loginEmail': '',
    'loginPassword': ''
  });

  const { setToken } = useContext(AuthContext);
  const [progress, setProgress] = useState(false);
  const [isDirty, setDirty] = useState(false);

  const navigate = useNavigate();

  async function Login(e) {
    e.preventDefault();

    setProgress(true);

    const isInvalid = validateFormData();

    if(!isInvalid) {
      try {
        const user = await signInWithEmailAndPassword(
          auth,
          formData['loginEmail'],
          formData['loginPassword']
        );
        setToken(user.user.accessToken);
        localStorage.setItem('token', user.user.accessToken);

        navigate('/');

      } catch (error) {
        console.log(error.message);
      }
    }

    setProgress(false);
  }

  function validateFormData() {
    const inputs = ['loginEmail', 'loginPassword'];
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

  useEffect(() => {
    document.querySelector('body').setAttribute('id', 'LoginBody');
  }, []);

  const formInputs = [
    { type: 'text', id: 'loginEmail', label: 'Email' },
    { type: 'password', id: 'loginPassword', label: 'Password' }
  ]

  return (
    <div id="Login">
        <div className="container">
            <form onSubmit={ Login }>
                <h1>Welcome Back</h1>
                <p>Login to manage your account</p>
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
                <button type="submit" disabled={ isDirty }> { !progress ? 'Log In' : <div className="spinner"></div> } </button>
            </form>
            <div className="login-cover">
                <img src='https://i.ibb.co/09MY6YX/img18.jpg' alt='cover' />
            </div>
        </div>
    </div>
  );
}

export default Login;