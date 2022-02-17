
import React from 'react';
import { NavLink } from 'react-router-dom';
// import LogoutButton from '../auth/LogoutButton';
import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormModal'
import './Navigation.css'
import logo from '../../assets/logo-light.PNG'

const NavBar = () => {
  return (
    <nav>
      <ul className='navbar'>
        <li className='logo'><img src={logo} alt='FocusPlace logo' /></li>
        <li>
          <NavLink to='/' exact={true} >
            Home
          </NavLink>
        </li>
        <li>
          <LoginFormModal to='/login' exact={true} />
        </li>
        <li>
          <SignupFormModal to='/sign-up' exact={true} />
        </li>
        {/* <li>
          <LogoutButton />
        </li> */}
      </ul>
    </nav>
  );
}

export default NavBar;
