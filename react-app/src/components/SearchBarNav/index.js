import { useState } from 'react';
import searchIcon from '../../assets/search.svg';
import './SearchBarNav.css';
import SearchBar from '../SearchBar';

function SearchBarNav() {
const [ openSearch, setOpenSearch ] = useState(false)


return (
    <>
        {openSearch ? <SearchBar /> :  (
            <div className='search-nav-div'  onClick={(e) => setOpenSearch(true)} >
                <span className='search-nav-title'>
                    Search
                </span>
                <button className='search-nav-button'>
                    <img src={searchIcon} alt='search icon' className='search-nav-icon' />
                </button>
            </div>
        )}
    </>
);
}

export default SearchBarNav;
