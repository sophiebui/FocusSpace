import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookings } from '../../store/bookings';
import { useParams } from 'react-router-dom';
import EditBookingForm from '../EditBookingForm';
import './Bookings.css'

const Bookings = () => {
    const dispatch = useDispatch();
    const { userId } = useParams()
    const bookings = useSelector(state => Object.values(state.bookings))
    const currUser = useSelector((state) => state.session.user.id);
    const isOwner = +userId === currUser;

	useEffect(() => {
        dispatch(getBookings(userId));

    },[ dispatch, userId])

    if (isOwner) {
        return (
            <div className='page-container'>
                {bookings?.map((booking) => (
                    <div key={booking.id} className='bookings-container'>
                        <div key={booking.place.images.id}  className='booking-image-container'>
                            <img src={booking.place.images[0].url}
                            className='booking-image'
                            onError={event => {
                                event.target.src = "https://res.cloudinary.com/dxubahnmi/image/upload/v1644967329/FocusSpace/1-default.jpg"
                                event.onerror = null
                            }} />
                        </div>
                        <div className='bookings-detail'>
                            <div key={booking.place.name}>
                                Name of Place: {booking.place.name}
                            </div>
                            <div key={booking.place.address}>
                                Address: {booking.place.address}
                            </div>
                            <div key={booking.date}>
                                Date: {booking.date}
                            </div>
                            <div key={booking.time}>
                            Time:  {booking.time}
                            </div>
                            <div key={booking.duration}>
                            Duration: {booking.duration}
                            </div>
                            <div key={booking.guests}>
                            # of Guests: {booking.guests}
                            </div>
                        </div>
                            <div>
                                <EditBookingForm booking={booking}/>
                            </div>
                    </div>
                ))}
            </div>
        )
    } else {
        return (
            <h1>You are not authorized to view this page</h1>
        )
    }
};

export default Bookings;
