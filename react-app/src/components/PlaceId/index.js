import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOnePlace } from '../../store/places';
const PlaceId = () => {
    const dispatch = useDispatch();
    const { placeId } = useParams()
    const places = useSelector(state => Object.values(state.places))

	useEffect(() => {
			dispatch(getOnePlace(placeId));
		},[ dispatch ])

    return (
        <div>
            {places?.map((place) => (
                <div>
                    <div key={place.id}>
                        {place.name}
                    </div>
                    <div key={place.id}>
                        {place.address}
                    </div>
                </div>
            ))}
        </div>
    )
};

export default PlaceId;
