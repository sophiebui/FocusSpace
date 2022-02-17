import React from 'react';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormModal'
import './Navigation.css'
import logo from '../../assets/logo-light.PNG'
import ProfileButton from './ProfileButton';

const NavBar = () => {
    const user = useSelector((state) => state.session.user);
    let sessionLinks;
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
        </>
        );
    }
    return (
        <nav>
        <ul className='navbar'>
            <li >
                <img src={logo} alt='FocusPlace logo' class='logo' />
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
