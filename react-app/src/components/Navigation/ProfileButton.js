import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import OutsideClickHandler from 'react-outside-click-handler';

const ProfileButton = ({ setProfileButton, setSignupModal, setLoginModal }) => {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
    const userId = useSelector((state) => state.session.user?.id)

	const logout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout());
	};

	return (
		<>
		{sessionUser ? (
            <>
                <OutsideClickHandler
                    onOutsideClick={() => {
                        setProfileButton(false);
                    }}>
                    <ul className='profile-dropdown'>
                        <li>
                            <NavLink to={`/bookings/${userId}`} className='profile-dropdown-link'><span className='profile-dropdown-span'>View Upcoming Bookings</span></NavLink>
                        </li>
                        <li>
                            <button onClick={logout} className='logout-button'>
                                Log Out
                            </button>
                        </li>
                    </ul>
                </OutsideClickHandler>
            </>
			) : (
            <>
                <OutsideClickHandler
                    onOutsideClick={() => {
                        setProfileButton(false);
                    }}>
                    <div className='profile-dropdown'>
                        <button
                            className='nav-button'
                            onClick={() => {
                                setLoginModal(true);
                                setSignupModal(false);
                                setProfileButton(false);
                            }}>
                            Log In
                        </button>
                        <button
                            className='nav-button'
                            onClick={() => {
                                setSignupModal(true);
                                setLoginModal(false);
                                setProfileButton(false);
                            }}>
                            Sign Up
                        </button>
                     </div>
                </OutsideClickHandler>
            </>
			)}
		</>
	);
};

export default ProfileButton;
