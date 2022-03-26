import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getPlaces } from '../../store/places';
import CreatePlaceModal from '../CreatePlaceModal';
import './Places.css'

const Places = () => {
    const dispatch = useDispatch();
    const places = useSelector(state => Object.values(state.places))

	useEffect(() => {
			dispatch(getPlaces());
		},[ dispatch ])

    return (
        <div className='places-page-container'>
           <div className='create-place-button-div'>
           <CreatePlaceModal />
               </div>
            <div className='places-content-container'>
            <div className='parent-places-container'>
            {places?.map((place) => (
                <div key={place.id} className='places-container'>
                    <div className='places-images-container'>
                        <div key={place.images[0]?.id} className='places-image-div'>
                           <NavLink to={`/places/${place.id}`}>
                                <img src={place.images[0]?.url}
                                alt={place.images[0]?.name}
                                className='places-images'
                                onError={event => {
                                    event.target.src = "https://res.cloudinary.com/dxubahnmi/image/upload/v1644967329/FocusSpace/1-default.jpg"
                                    event.onerror = null
                                }}/>
                            </NavLink>
                         </div>
                    </div>
                    <div key={place.id} className='places-title'>
                        {place.name}
                        <div key={place.city} className='places-address'>
                            {place.city} {place.state}
                        </div>
                    <div>
                        ${place.price} / hour
                    </div>
                    </div>
                </div>
            ))}
                </div>
            <div className='side-image-div'>
                <img src='https://res.cloudinary.com/dxubahnmi/image/upload/v1646373831/FocusSpace/side-image_t5yb7o.jpg' alt='board room' className='side-image' />
            </div>
            </div>
        </div>
    )
};

export default Places;
