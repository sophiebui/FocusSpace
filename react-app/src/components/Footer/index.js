import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import NavCreatePlaceModal from '../NavCreateBookingModal';
import './Footer.css'

const Footer = () => {
    const userId = useSelector((state) => state.session?.user?.id)
    return (
        <div className='footer-container'>
            <div className='footer-main-content'>
                <div className='about-container'>
                    <p className='about-title'>Site Links</p>
                        <div className='links-container'>
                            <p className='link-container'><NavLink to='/' className='about-links'> Home </NavLink></p>
                            <p className='link-container'><NavLink to='/places' className='about-links'> Explore </NavLink></p>
                            <p className='link-container'><NavCreatePlaceModal /></p>
                            <p className='link-container'><NavLink to={`/bookings/${userId}`} className='about-links'> Your Bookings </NavLink></p>
                        </div>
                </div>
                <div className='about-container'>
                    <p className='about-title'>Technologies Used</p>
                        <div className='links-container'>
                            <p className='link-container'><a href='https://www.python.org/' className='about-links' target='_blank' rel="noreferrer"> Python </a></p>
                            <p className='link-container'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript' className='about-links' target='_blank' rel="noreferrer"> JavaScript </a></p>
                            <p className='link-container'><a href ='https://nodejs.org/en/' className='about-links' target='_blank' rel="noreferrer"> Node.js </a></p>
                            <p className='link-container'><a href ='https://flask.palletsprojects.com/en/2.0.x/' className='about-links' target='_blank' rel="noreferrer"> Flask </a></p>
                            <p className='link-container'><a href ='https://reactjs.org/' className='about-links' target='_blank' rel="noreferrer"> React </a></p>
                            <p className='link-container'><a href ='https://redux.js.org/' className='about-links' target='_blank' rel="noreferrer"> Redux </a></p>
                            <p className='link-container'><a href ='https://www.sqlalchemy.org/' className='about-links' target='_blank' rel="noreferrer"> SQLAlchemy </a></p>
                            <p className='link-container'><a href ='https://www.postgresql.org/' className='about-links' target='_blank' rel="noreferrer"> PostgreSQL </a></p>
                            <p className='link-container'><a href ='https://www.docker.com/' className='about-links' target='_blank' rel="noreferrer"> Docker </a></p>
                        </div>
                </div>
                <div className='about-container'>
                    <p className='about-title'>About</p>
                        <div className='links-container'>
                            <p className='link-container'><a href='https://github.com/sophiebui' className='about-links' target='_blank' rel="noreferrer"> GitHub </a></p>
                            <p className='link-container'><a href ='https://www.linkedin.com/in/sophia-bui/' className='about-links' target='_blank' rel="noreferrer"> LinkedIn </a></p>
                        </div>
                </div>
            </div>
            <div className='footer-bottom-content'>
            Book & list your conference or study space here
            </div>
        </div>
    )
}

export default Footer;
