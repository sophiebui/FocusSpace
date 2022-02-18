import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOnePlace } from '../../store/places';
import DeletePlaceModal from '../DeletePlaceModal';
import EditPlaceModal from '../EditPlaceModal';
import './PlaceId.css'


const PlaceId = () => {
    const dispatch = useDispatch();
    const { placeId } = useParams()
    const user = useSelector((state) => state.session.user.id);
    const place = useSelector(state => state.places[placeId])
    useEffect(() => {
			dispatch(getOnePlace(placeId));
		},[ dispatch, placeId ])

    if (place) {
        const isOwner = user === place?.user_id;
        return (
        <div>
            <div className='images-container'>
            {place?.images?.map((image) => (
                <div key={image.id} className='image-div'>
                    <img src={image.url} alt={place.name} className='place-images'></img>
                </div>
            ))}
            </div>

            <h1 className='place-name-heading'>
                {place.name}
            </h1>
            <p className='place-description'>
                {place.description}
            </p>
            {isOwner && (
                <>
                <EditPlaceModal place={place} />
                <DeletePlaceModal place={place} />
                </>
            )}
        </div>
    )
} else return null
}

export default PlaceId;
