import { useEffect, useState } from 'react';
import banner from '../../assets/banner.jpg'
import SearchBar from '../SearchBar';
import './HomePage.css'
import { useAlert } from 'react-alert'

const HomePage = () => {
    const [scrolling, setScrolling] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);
    const alert = useAlert();

    useEffect(() => {
        const onScroll = e => {
          setScrollTop(e.target.documentElement.scrollTop);
          setScrolling(e.target.documentElement.scrollTop > scrollTop);
        };
        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
      }, [scrollTop]);

    return (
        <div className='black-bkgd-div'>
            {!scrolling ? <SearchBar /> : null }
            <img src={banner} alt='empty conference room' className='banner'/>
            <button
      onClick={() => {
        alert.show('Oh look, an alert!')
      }}
    >
      Show Alert
    </button>
        </div>
        )
    }


export default HomePage;
