import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOnePlace } from '../../store/places';
import DeletePlaceModal from '../DeletePlaceModal';
const PlaceId = () => {
    const dispatch = useDispatch();
    const { placeId } = useParams()
    const user = useSelector((state) => state.session.user.id);
    const place = useSelector(state => state.places[placeId])
    console.log('this is place', place?.user_id)
	useEffect(() => {
			dispatch(getOnePlace(placeId));
		},[ dispatch, placeId ])

    if (place) {
        const isOwner = user === place?.user_id;
        return (
        <div>
            <h1 className='place-name-heading'>
                {place.name}
            </h1>
            <p className='place-description'>
                {place.description}
            </p>
            {isOwner && (
                <>
                <DeletePlaceModal place={place}/>
                </>
            )}
        </div>
    )
} else return 'This listing does not exist'
}

export default PlaceId;
