import { useState } from 'react';
import { addBooking } from '../../store/bookings';
import { useDispatch, useSelector } from 'react-redux';
import './SearchBar.css';

function SearchBar({ place }) {
	const dispatch = useDispatch();
	// const user_id = useSelector((state) => state.session.user.id);
	const [ location, setLocation ] = useState('');
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
            location,
			// user_id,
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
        <form className='search-form' onSubmit={handleSubmit}>
            <h2>{success}</h2>
            <ul>{errors.map((error, idx) => <li key={idx}>{error}</li>)}</ul>
            <div className='search-input-div'>
                <label className='search-date-location' htmlFor='location'>
                    Location:
                </label>
                <input
                    type='location'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className='search-input'
                    id='location'
                />
            </div>
            <div className='search-input-div'>
                <label className='search-date-label' htmlFor='date'>
                    Date:
                </label>
                <input
                    type='date'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className='search-input'
                    id='date'
                />
            </div>
            <div className='search-input-div'>
                <label className='search-time-label' htmlFor='time'>
                    Time:
                </label>
                <input
                    type='time'
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className='search-input'
                    id='time'
                />
            </div>
            <div className='search-input-div'>
                <label className='serach-duration-label' htmlFor='duration'>
                    Duration
                </label>
                <input
                    type='number'
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className='search-input'
                    id='duration'
                />
            </div>
            <div className='search-input-div'>
                <label className='search-guests-label'htmlFor='guests'>
                    Number of Guests
                </label>
                <input
                    type='number'
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className='search-input'
                    id='guests'
                />
            </div>
            <button className='search-form-button'>Search</button>
        </form>
	);
}

export default SearchBar;
