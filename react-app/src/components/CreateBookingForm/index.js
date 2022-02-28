import { useState } from 'react';
import { addBooking } from '../../store/bookings';
import { useDispatch, useSelector } from 'react-redux';
import './CreateBookingForm.css';
import { useAlert } from 'react-alert'


function CreateBookingForm({ place }) {
	const dispatch = useDispatch();
    const alert = useAlert();
	const user_id = useSelector((state) => state.session?.user?.id);
	const [ date, setDate ] = useState('');
	const [ time, setTime ] = useState('');
	const [ duration, setDuration ] = useState('');
	const [ guests, setGuests ] = useState('');
	const [ errors, setErrors ] = useState([]);


	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);
		const newBooking = {
			user_id,
			place_id: place.id,
			date,
            time,
            duration,
			guests
		};

		return dispatch(addBooking(newBooking))
            .then((response) => {
                if (response.errors) {
                    setErrors(response.errors);
                    return;
                }
                alert.show(<div style={{ textTransform: 'initial' }}> New Booking Created </div>)
            });

        };

	return (
		<div className='create-booking-form-container'>
			<form className='form' onSubmit={handleSubmit}>
                {errors.length > 0 ?
                <ul className='errors-list'>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                        ))}
                </ul>
                : null}
				<h1 className='add-booking-header'>Create a New Booking</h1>
				<div className='date-time-div'>
					<label className='date-time-label' htmlFor='date'>
						Date:
					</label>
					<input
						type='date'
						value={date}
						onChange={(e) => setDate(e.target.value)}
						required
						className='input add-booking'
						id='date'
					/>
				</div>
				<div className='date-time-div'>
					<label className='date-time-label' htmlFor='time'>
                        Time:
					</label>
					<input
						type='time'
						value={time}
						onChange={(e) => setTime(e.target.value)}
						className='input add-booking'
						id='time'
					/>
				</div>
				<div className='booking-input-container'>
					<input
						type='number'
						value={duration}
						onChange={(e) => setDuration(e.target.value)}
						className='input add-booking'
						id='duration'
					/>
					<label className={duration && 'booking-filled'} htmlFor='duration'>
                        Duration
					</label>
				</div>
				<div className='booking-input-container'>
					<input
						type='number'
						value={guests}
						onChange={(e) => setGuests(e.target.value)}
						className='input add-booking'
						id='guests'
					/>
					<label className={guests && 'booking-filled'} htmlFor='guests'>
						Number of Guests
					</label>
				</div>
				<div className='form-button-container'>
					<button className='create-booking-form-button'>Add Booking</button>
				</div>
			</form>
		</div>
	);
}

export default CreateBookingForm;
