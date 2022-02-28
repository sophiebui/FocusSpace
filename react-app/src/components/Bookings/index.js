import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookings } from '../../store/bookings';
import { useParams } from 'react-router-dom';
import EditBookingForm from '../EditBookingForm';
import './Bookings.css'
import moment from 'moment';

const Bookings = () => {
    const dispatch = useDispatch();
    const { userId } = useParams()
    const bookings = useSelector(state => Object.values(state.bookings))
    const currUser = useSelector((state) => state.session.user.id);
    const [isLoaded, setIsloaded] = useState(false)
    const isOwner = +userId === currUser;

	useEffect(() => {
        dispatch(getBookings(userId)).then(() =>{
            setIsloaded(true)
        })
    },[ dispatch, userId])

    if (!isLoaded) {
        return null
    }

    if (isOwner) {
        if (bookings.length > 0) {
            return (
                <div className='page-container'>
                    <div className='bookings'>
                    {bookings?.map((booking) => (
                        <div key={booking.id} className='bookings-container'>
                            <div key={booking.place.images.id}  className='booking-image-container'>
                                <img src={booking.place.images[0].url}
                                alt= {booking.place.name}
                                className='booking-image'
                                onError={event => {
                                    event.target.src = "https://res.cloudinary.com/dxubahnmi/image/upload/v1644967329/FocusSpace/1-default.jpg"
                                    event.onerror = null
                                }} />
                            </div>
                            <div className='bookings-detail'>
                                <div key={booking.place.name}>
                                    {booking.place.name}
                                </div>
                                <div key={booking.place.address}>
                                <span className='booking-label'> Address: </span> {booking.place.address}
                                </div>
                                <div key={booking.date}>
                                <span className='booking-label'>  Date: </span>{booking.date.slice(0, 16)}
                                </div>
                                <div key={booking.time}>
                            <span className='booking-label'>Time:</span>  {booking.time.slice(0, 5)}
                                </div>
                                <div key={booking.duration}>
                                <span className='booking-label'>Duration: </span> {booking.duration}
                                </div>
                                <div key={booking.guests}>
                                <span className='booking-label'># of Guests: </span>{booking.guests}
                                </div>
                            </div>
                                <div>
                                    <EditBookingForm booking={booking}/>
                                </div>
                        </div>
                    ))}
                </div>
                </div>
            )
    } else {
        return (
            <h1 className='bookings-page-error'> You do not own any bookings </h1>
        )
    }
 } else {
    return (
        <h1 className='bookings-page-error'>You are not authorized to view this page</h1>
    )
}; }

export default Bookings;
