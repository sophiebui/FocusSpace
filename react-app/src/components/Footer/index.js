import { NavLink } from 'react-router-dom';
import './Footer.css'

const Footer = () => {
    return (
        <div className='footer-container'>
            <div className='footer-main-content'>
                <div className='about-container'>
                    <p className='about-title'>Site Links</p>
                    <p><NavLink to='/places' className='about-links'> Explore </NavLink></p>
                    <p><a href ='https://www.linkedin.com/in/sophia-bui/' className='about-links' target='_blank'> LinkedIn </a></p>
                </div>
                <div className='about-container'>
                    <p className='about-title'>About</p>
                    <p><a href='https://github.com/sophiebui' className='about-links' target='_blank'> GitHub </a></p>
                    <p><a href ='https://www.linkedin.com/in/sophia-bui/' className='about-links' target='_blank'> LinkedIn </a></p>
                </div>
                <div className='about-container'>
                    <p className='about-title'>About</p>
                    <p><a href='https://github.com/sophiebui' className='about-links' target='_blank'> GitHub </a></p>
                    <p><a href ='https://www.linkedin.com/in/sophia-bui/' className='about-links' target='_blank'> LinkedIn </a></p>
                </div>
            </div>
            <div className='footer-bottom-content'>
            Book & list your conference or study space here
            </div>
        </div>
    )
}

export default Footer;
