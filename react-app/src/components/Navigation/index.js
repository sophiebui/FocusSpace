import React from 'react';
import LogoutButton from '../auth/LogoutButton';
import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormModal'
import './Navigation.css'
import logo from '../../assets/logo-light.PNG'
import { useSelector } from 'react-redux';
const NavBar = () => {
    const user = useSelector((state) => state.session.user);

  let sessionLinks;
  if (user) {
    sessionLinks = (
    //   <ProfileButton user={sessionUser} />
    <LogoutButton />
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
                <li className='logo'>
                    <img src={logo} alt='FocusPlace logo' />
                </li>
                <li>
                    {sessionLinks}
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
