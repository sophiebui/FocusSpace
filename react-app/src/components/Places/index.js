import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlaces } from '../../store/places';
import CreatePlaceModal from '../CreatePlaceModal';

const Places = () => {
    const dispatch = useDispatch();
    const places = useSelector(state => Object.values(state.places))

	useEffect(() => {
			dispatch(getPlaces());
		},[ dispatch ])

    return (
        <div>
           <div>
           <CreatePlaceModal />
               </div>
            {places?.map((place) => (
                <div key={place.id}>
                    <div key={place.id}>
                        {place.name}
                    </div>
                    <div key={place.address}>
                        {place.address}
                    </div>
                </div>
            ))}
        </div>
    )
};

export default Places;
