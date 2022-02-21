import banner from '../../assets/banner.jpg'
import SearchBar from '../SearchBar';
import './HomePage.css'
const HomePage = () => {

    return (
        <div className='black-bkgd-div'>
            <SearchBar />
            <img src={banner} alt='empty conference room' className='banner'/>
        </div>
        )
    }


export default HomePage;
