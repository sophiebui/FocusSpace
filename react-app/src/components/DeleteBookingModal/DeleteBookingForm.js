import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { removeBooking } from "../../store/bookings";
import { useHistory } from 'react-router-dom';

function DeleteBookingForm({ booking, setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [ , setErrors] = useState([]);
    const currUserId = useSelector(state => state.session.user.id);
    const currUserBookingId = useSelector(state => state?.bookings[booking.id]?.user_id);

    const submitDelete = (e) => {
        setErrors([]);
        const payload = {
            booking_id: booking.id,
            curr_user_id: currUserId,
            booking_user_id: currUserBookingId
        }

        return dispatch(removeBooking(payload))
            .then(
                response => {
                    if (response?.errors) {
                        setErrors(response.errors)
                        return
                    }
                    history.push(`/bookings/${currUserId}`)
                }
            )
    }

    return (
        <div className='delete'>
        <h2>Are you sure you want to remove this booking?</h2>
        <h3>This action cannot be undone.</h3>
        <button type="button" onClick={(e) => submitDelete()} className='delete-submit-button'>Yes</button>
        <button type="button" onClick={(e) => setShowModal(false)} className='delete-cancel-button'>No</button>
    </div>)
}

export default DeleteBookingForm
