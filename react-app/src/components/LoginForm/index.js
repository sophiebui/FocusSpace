import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';
import { useAlert } from 'react-alert'

const LoginForm = ({ setLoginModal }) => {
	const [ errors, setErrors ] = useState([]);
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const dispatch = useDispatch();
    const alert = useAlert();

    const demoLogin = (e) => {
        e.preventDefault()
        e.stopPropagation()
		const email = 'demo@aa.io';
		const password = 'password';
		return dispatch(login(email, password)).then( () =>{
            alert.show(<div style={{ textTransform: 'initial' }}>Login Successful</div>)
            setLoginModal(false)
        })
	};

	const onLogin = async (e) => {
		e.preventDefault();
		setErrors([]);
		return dispatch(login(email, password)).then(
            (response) => {
                if (response?.errors) {
                    setErrors(response.errors)
                    return
                }

                alert.show(<div style={{ textTransform: 'initial' }}>Login Successful</div>)
                setLoginModal(false);
            }
        );
    };


	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	return (
        <div className='form-container-login'>
            <form className='form' onSubmit={onLogin}>
                {errors.length > 0 ?
                <ul className='errors-list'>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                        ))}
                </ul>
                : null}
                <h1 className='form-title'>Welcome to FocusSpace</h1>
                <label htmlFor='email'> </label>
                <input
                    placeholder='Email'
                    name='email'
                    type='text'
                    value={email}
                    onChange={updateEmail}
                    className='nav-bar-input'
                />
                <label htmlFor='password' />
                <input
                    placeholder='Password'
                    name='password'
                    type='password'
                    value={password}
                    onChange={updatePassword}
                    className='nav-bar-input'
                />
                <button className='nav-bar-form-button' type='submit'> Login </button>
                <button className='nav-bar-form-button' onClick={demoLogin}>Demo</button>

            </form>
        </div>
	);
};

export default LoginForm;
