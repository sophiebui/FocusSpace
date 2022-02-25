import { useState } from 'react';
import { editBooking } from '../../store/bookings';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert'
import '../Bookings/Bookings.css';
import dateFormat from 'dateformat';
import DeleteBookingModal from '../DeleteBookingModal';

function EditBookingForm({ booking }) {
	const dispatch = useDispatch();
    const alert = useAlert();
	const userId = useSelector((state) => state.session.user.id);
	const [ date, setDate ] = useState(dateFormat(booking.date, 'yyyy-mm-dd'));
	const [ time, setTime ] = useState(booking.time);
	const [ duration, setDuration ] = useState(booking.duration);
	const [ guests, setGuests ] = useState(booking.guests);
	const [ errors, setErrors ] = useState([]);


	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);
		const newBooking = {
			id: booking.id,
			user_id: userId,
			place_id: booking.place_id,
			date,
			time: time.substring(0, 5),
			duration,
			guests
		};

		return dispatch(editBooking(newBooking))
        .then(
            (response) => {
                if (response.errors) {
                    setErrors(response.errors)
                    return
                }
                alert.show(<div style={{ textTransform: 'initial' }}> Changes Complete </div>)
            }
        );
    };

	return (
		<div className="edit-booking-form-container">
			<form className="form edit-booking-form" onSubmit={handleSubmit}>
                {errors.length > 0 ?
                <ul className='errors-list'>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                        ))}
                </ul>
                : null}
				<h1 className="edit-booking-header">Edit Booking</h1>
				<div className="">
					<label className="" htmlFor="date">
						Date:
					</label>
					<input
						type="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
						required
						className="input edit-booking"
						id="date"
					/>
				</div>
				<div className="">
					<label className="" htmlFor="time">
						Time:
					</label>
					<input
						type="time"
						value={time}
						onChange={(e) => setTime(e.target.value)}
						className="input edit-booking"
						id="time"
					/>
				</div>
				<div className="input-container">
					<input
						type="number"
						value={duration}
						onChange={(e) => setDuration(e.target.value)}
						className="input edit-booking"
						id="duration"
					/>
					<label className={duration && 'filled'} htmlFor="duration">
						Duration
					</label>
				</div>
				<div className="input-container">
					<input
						type="number"
						value={guests}
						onChange={(e) => setGuests(e.target.value)}
						className="input edit-booking"
						id="guests"
					/>
					<label className={guests && 'filled'} htmlFor="guests">
						Number of Guests
					</label>
				</div>
				<div className="form-button-container">
					<button className="form-button">Edit Booking</button>
				</div>
				<DeleteBookingModal booking={booking} />
			</form>
		</div>
	);
}

export default EditBookingForm;
