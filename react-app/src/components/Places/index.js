import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlaces } from '../../store/places';
const Places = () => {
    const dispatch = useDispatch();
    const places = useSelector(state => Object.values(state.places))

	useEffect(() => {
			dispatch(getPlaces());
		},[ dispatch ])

    return (
        <div>
            {places?.map((place) => (
                <div>
                    <div>
                        {place.name}
                    </div>
                    <div>
                        {place.address}
                    </div>
                </div>
            ))}
        </div>
    )
};

export default Places;
