import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = ({ setShowModal }) => {
	const [ errors, setErrors ] = useState([]);
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const onLogin = async (e) => {
		e.preventDefault();
		setErrors([]);
		return dispatch(login(email, password)).then((response) => {
			if (response?.errors) {
				setErrors(response.errors);
				return;
			} else if (!response?.errors) setShowModal(false);
		});
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	if (user) {
		return <Redirect to='/' />;
	}

	return (
        <div className='form-container'>
            <form className='form' onSubmit={onLogin}>
                {/* <div className='error-list'>{errors[0]}</div> */}
                <h1 className='form-title'>Welcome to FocusSpace</h1>
                <label htmlFor='email'> </label>
                <input
                    placeholder='Email'
                    name='email'
                    type='text'
                    value={email}
                    onChange={updateEmail}
                    className='input'
                />
                <label htmlFor='password' />
                <input
                    placeholder='Password'
                    name='password'
                    type='password'
                    value={password}
                    onChange={updatePassword}
                    className='input'
                />
                <button className='form-button' type='submit'>
                    Login
                </button>

            </form>
        </div>
	);
};

export default LoginForm;
