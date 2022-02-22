import { useEffect, useState } from 'react';
import banner from '../../assets/banner.jpg'
import SearchBar from '../SearchBar';
import './HomePage.css'

const HomePage = () => {
    const [scrolling, setScrolling] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);

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
        </div>
        )
    }


export default HomePage;
