import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOnePlace } from '../../store/places';
import CreateBookingForm from '../CreateBookingForm';
import DeletePlaceModal from '../DeletePlaceModal';
import EditPlaceModal from '../EditPlaceModal';
import './PlaceId.css'

const PlaceId = ({placesLoaded}) => {
    const dispatch = useDispatch();
    const { placeId } = useParams()
    const user = useSelector((state) => state.session?.user?.id);
    const place = useSelector(state => state.places[placeId])

    useEffect(() => {
            dispatch(getOnePlace(placeId))
		},[ dispatch, placeId])

    if (!placesLoaded) {
        return null
    }

    if (placesLoaded) {
        const isOwner = user === place?.user_id;
        return (
        <div className='page-container'>
            <div className='images-container'>
            {place?.images?.map((image) => (
                <div key={image.id} className='image-div'>
                    <img src={image.url}
                    alt={place.name}
                    className='place-images'
                    onError={event => {
                        event.target.src = "https://res.cloudinary.com/dxubahnmi/image/upload/v1644967329/FocusSpace/1-default.jpg"
                        event.onerror = null
                    }} />
                </div>
            ))}
            </div>

            <h1 className='place-name-heading'>
                {place.name}
            </h1>
            <p className='place-description'>
                {place.description}
            </p>
            <p className='place-description'>
                {place.address} {place.city} {place.state} {place.zip_code}
            </p>
            <p className='place-description'>
                # of Guests allowed: {place.guests}
            </p>


            {(user && !isOwner) ?  (
                <div>
                    <CreateBookingForm place={place}/>
                </div>
                ) : (user && isOwner) ?(
                <div>
                    <EditPlaceModal place={place} id={placeId} />
                    <DeletePlaceModal place={place} />
                </div>
                ) : (
                <div>
                    Pleace log in to book this place
                </div>
                )
            }
        {!place ? (<>
            Erorr: Place does not exist
            </>) : null}
        </div>
    )
}
}

export default PlaceId;
