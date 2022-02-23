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
        <div className='page-container'>
           <div className='create-place-button-div'>
           <CreatePlaceModal />
               </div>
            {places?.map((place) => (
                <div key={place.id} className='places-container'>
                    <div className='places-images-container'>
                        <div key={place.images[0]?.id} className='places-image-div'>
                           <NavLink to={`/places/${place.id}`}> <img src={place.images[0]?.url} alt={place.images[0]?.name} className='places-images'/></NavLink>
                         </div>
                    </div>
                    <div key={place.id} className='places-title'>
                        {place.name}
                        <div key={place.address} className='places-address'>
                            {place.address}
                        </div>
                    <div>
                        ${place.price} / hour
                    </div>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default Places;
