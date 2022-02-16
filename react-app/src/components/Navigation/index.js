
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormModal'
import './Navigation.css'
const NavBar = () => {
  return (
    <nav>
      <ul>
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
        <li>
          <NavLink to='/users' exact={true} >
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
