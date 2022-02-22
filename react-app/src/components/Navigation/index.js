import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { login } from '../../store/session';
import logoLight from '../../assets/logo-light.PNG';
import logoDark from '../../assets/logo-no-bkgd.PNG';
import bars from '../../assets/bars-solid.svg';
import userLogo from '../../assets/user.svg';
import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';
import ProfileButton from './ProfileButton';
import './Navigation.css';

const NavBar = () => {
	const dispatch = useDispatch();
    const [ profileButton, setProfileButton ] = useState(false);
	const [ loginModal, setLoginModal ] = useState(false);
	const [ signupModal, setSignupModal ] = useState(false);
    const location = useLocation()
    console.log(location.pathname)

	const demoLogin = () => {
		const email = 'demo@aa.io';
		const password = 'password';
		return dispatch(login(email, password));
	};


    return (
        <>
            <nav>
                <ul className={`${location.pathname === '/' ? 'dark-navbar' : 'light-navbar' }`}>
                    <li>
                        <NavLink to='/'>
                            <img src={`${location.pathname ==='/' ? logoDark : logoLight}`} alt='FocusPlace logo' className='logo' />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/places' className={'navbar-explore-link'}>Explore</NavLink>
                    </li>
                    <li className='navbar-profile-button-div' onClick={() => setProfileButton(!profileButton)}>
                        <img src={bars} alt='menu bars' className='menu-bar-icon menu-bars-icon' />
                        <img src={userLogo} alt='user-logo' className='menu-bar-icon menu-user-icon' />
                    </li>
                    {loginModal && (
                        <Modal onClose={() => setLoginModal(false)}>
                            <LoginForm setLoginModal={setLoginModal} demoLogin={demoLogin} />
                        </Modal>
                    )}
                    {signupModal && (
                        <Modal onClose={() => setSignupModal(false)}>
                            <SignupForm setSignupModal={setSignupModal} />
                        </Modal>
                    )}
                    {profileButton ? (
                        <ProfileButton
                            setProfileButton={setProfileButton}
                            setSignupModal={setSignupModal}
                            setLoginModal={setLoginModal}
                            />
                        )
                        : null }
                </ul>
            </nav>
        </>
    )
}


export default NavBar;
