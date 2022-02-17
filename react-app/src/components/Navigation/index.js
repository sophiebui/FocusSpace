import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormModal'
import './Navigation.css'
import logo from '../../assets/logo-light.PNG'
import { login } from '../../store/session';
// import ProfileButton from './ProfileButton';

const NavBar = () => {
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    let sessionLinks;

    const demoLogin = () => {
        const email = 'demo@aa.io';
        const password = 'password';
        return dispatch(login(email, password));
      }

    if (user) {
        sessionLinks = (
        <>
            <LogoutButton />
        </>
        );
    } else {
        sessionLinks = (
        <>
            <LoginFormModal />
            <SignupFormModal />
            <button className='nav-button' onClick={demoLogin}>Demo</button>
        </>
        );
    }
    return (
        <nav>
        <ul className='navbar'>
            <li >
                <img src={logo} alt='FocusPlace logo' className='logo' />
            </li>
            {/* <li>        <ProfileButton user={user} /></li> */}
            <li>
                {sessionLinks}
            </li>
        </ul>
        </nav>
    );
    }

    export default NavBar;
