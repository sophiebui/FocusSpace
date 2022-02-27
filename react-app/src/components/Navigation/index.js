import { useState, useEffect} from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import logo from '../../assets/logo-no-bkgd.PNG';
import bars from '../../assets/bars-solid.svg';
import userLogo from '../../assets/user.svg';
import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';
import ProfileButton from './ProfileButton';
import SearchBarNav from '../SearchBarNav';
import './Navigation.css';
import NavbarCreatePlaceModal from '../NavbarCreatePlaceModal';

const NavBar = () => {
    const [ profileButton, setProfileButton ] = useState(false);
	const [ loginModal, setLoginModal ] = useState(false);
	const [ signupModal, setSignupModal ] = useState(false);
    const [scrolling, setScrolling] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);
    const location = useLocation()


    useEffect(() => {
        const onScroll = e => {
          setScrollTop(e.target.documentElement.scrollTop);
          setScrolling(e.target.documentElement.scrollTop > scrollTop);
        };
        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
      }, [scrollTop]);

    return (
        <>
            <nav>
                <ul className={`${location.pathname !== '/' ? 'regular-navbar' : (location.pathname === '/' && !scrolling ? 'dark-navbar' : 'light-navbar') }`}>
                    <li>
                        <NavLink to='/'>
                            <img src={logo} alt='FocusPlace logo' className={`${location.pathname ==='/' && !scrolling ? 'dark-logo' : 'light-logo'}`} />
                        </NavLink>
                    </li>
                    <li>
                       {location.pathname === '/' && !scrolling ?
                       <div className='navbar-links'>
                        <NavLink to='/places' className={'navbar-explore-link'}><p className='navbar-explore-link'>Explore</p></NavLink>
                        <NavbarCreatePlaceModal />
                                             </div>
                        : <SearchBarNav />
                    }
                    </li>
                    <li className='navbar-profile-button-div' onClick={() => setProfileButton(!profileButton)}>
                        <img src={bars} alt='menu bars' className='menu-bar-icon menu-bars-icon' />
                        <img src={userLogo} alt='user-logo' className='menu-bar-icon menu-user-icon' />
                    </li>
                    {loginModal && (
                        <Modal onClose={() => setLoginModal(false)}>
                            <LoginForm setLoginModal={setLoginModal} />
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
