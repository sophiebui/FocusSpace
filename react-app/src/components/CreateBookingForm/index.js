import { useState } from 'react';
import { addBooking } from '../../store/bookings';
import { useDispatch, useSelector } from 'react-redux';
import './CreateBookingForm.css';

function CreateBookingForm({ place, setShowModal }) {
	const dispatch = useDispatch();
	const user_id = useSelector((state) => state.session.user.id);
	const [ date, setDate ] = useState('');
	const [ time, setTime ] = useState('');
	const [ duration, setDuration ] = useState('');
	const [ guests, setGuests ] = useState('');
	const [ errors, setErrors ] = useState([]);
	const [ success, setSuccess ] = useState('');


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
                setSuccess('Success!');
                setTimeout(() => {
                    setSuccess(false)
                }, 1500);
            });

        };

	return (
		<div className='create-booking-form-container'>
			<form className='form' onSubmit={handleSubmit}>
                {success ? <h2>{success}</h2> : null }
                {errors.length > 0 ?
                <ul className='errors-list'>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                        ))}
                </ul>
                : null}
				<h1 className='add-booking-header'>Create a New Booking</h1>
				<div className=''>
					<label className='' htmlFor='date'>
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
				<div className=''>
					<label className='' htmlFor='time'>
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
				<div className='input-container'>
					<input
						type='number'
						value={duration}
						onChange={(e) => setDuration(e.target.value)}
						className='input add-booking'
						id='duration'
					/>
					<label className={duration && 'filled'} htmlFor='duration'>
                        Duration
					</label>
				</div>
				<div className='input-container'>
					<input
						type='number'
						value={guests}
						onChange={(e) => setGuests(e.target.value)}
						className='input add-booking'
						id='guests'
					/>
					<label className={guests && 'filled'} htmlFor='guests'>
						Number of Guests
					</label>
				</div>
				<div className='form-button-container'>
					<button className='form-button'>Add Booking</button>
				</div>
			</form>
		</div>
	);
}

export default CreateBookingForm;
