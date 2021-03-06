import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { useAlert } from 'react-alert'

const SignupForm = ({ setSignupModal }) => {
	const [ errors, setErrors ] = useState([]);
	const [ username, setUsername ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ repeatPassword, setRepeatPassword ] = useState('');
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
    const alert = useAlert()

	  const onSignUp = async (e) => {
	    e.preventDefault();
	    setErrors([])
	    return dispatch(signUp(username, email, password, repeatPassword))
        .then((response) => {
                if (response?.errors) {
                    setErrors(response.errors)
                    return
                }
                alert.show(<div style={{ textTransform: 'initial' }}>You are officially signed up!</div>)
                setSignupModal(false);
            }
        );
    };

	const updateUsername = (e) => {
		setUsername(e.target.value);
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	const updateRepeatPassword = (e) => {
		setRepeatPassword(e.target.value);
	};

	if (user) {
		return <Redirect to="/" />;
	}

	return (
		<div className="form-container-signup">
			<form className="form" onSubmit={onSignUp}>
                {errors.length > 0 ?
                    <ul className='errors-list'>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                            ))}
                    </ul>
                : null}
				<h1 className="form-title">Sign Up</h1>

				<label />
				<input
					placeholder="Username"
					type="text"
					name="username"
					onChange={updateUsername}
					value={username}
					className="nav-bar-input"
				/>
				<label />
				<input
					placeholder="Email"
					type="text"
					name="email"
					onChange={updateEmail}
					value={email}
					className="nav-bar-input"
				/>
				<label />
				<input
					placeholder="Password"
					type="password"
					name="password"
					onChange={updatePassword}
					value={password}
					className="nav-bar-input"
				/>
				<label />
				<input
					placeholder="Verify Password"
					type="password"
					name="repeat_password"
					onChange={updateRepeatPassword}
					value={repeatPassword}
					className="nav-bar-input"
				/>
				<button className="form-button" type="submit">
					Sign Up
				</button>
			</form>
		</div>
	);
};

export default SignupForm;
