import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlaces, getSearchResults } from '../../store/places'
import searchIcon from '../../assets/search.svg';
import './SearchBar.css';

function SearchBar() {
	const dispatch = useDispatch();
    const places = useSelector(state => Object.values(state.places))
	const [ states, setStates ] = useState('AZ');
	const [ date, setDate ] = useState('');
	const [ time, setTime ] = useState('');
	const [ guests, setGuests ] = useState('');
	const [ errors, setErrors ] = useState([]);
	const [ success, setSuccess ] = useState('');

	useEffect(() => {
        dispatch(getPlaces());
    },[ dispatch ])

    const statesArr = []
    places.map((place) => {
        statesArr.push(place.state)
        return statesArr.sort()})

    const uniqueStates = [...new Set(statesArr)]

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);
		const query = {
			location: states,
			date,
			time,
			guests
		};
		return dispatch(getSearchResults(query))
        .then((response) => {
			if (response.errors) {
				setErrors(response.errors);
				return;
			}
			setSuccess('Success!');
			setTimeout(() => {
				setSuccess(false);
			}, 1500);
		});
	};

	return (
		<form className="search-form" onSubmit={handleSubmit}>
			<h2>{success}</h2>
			<ul className='errors-list'>{errors.map((error, idx) => <li key={idx}>{error}</li>)}</ul>
			<div className="search-input-div">
				<label className="search-date-location" htmlFor="location">
					Location:
				</label>
				<select
					value={states}
					onChange={(e) => setStates(e.target.value)}
					required
					className="search-input"
					id="states"
				>
                    {uniqueStates?.map((state) => (
                        <option key={state} value={state}>{state}</option>))}
                </select>
			</div>
			<div className="search-input-div">
				<label className="search-date-label" htmlFor="date">
					Date:
				</label>
				<input
					type="date"
					value={date}
					onChange={(e) => setDate(e.target.value)}
					required
					className="search-input"
					id="date"
				/>
			</div>
			<div className="search-input-div">
				<label className="search-time-label" htmlFor="time">
					Time:
				</label>
				<input
					type="time"
					value={time}
					onChange={(e) => setTime(e.target.value)}
					className="search-input"
					id="time"
				/>
			</div>
			<div className="search-input-div">
				<label className="search-guests-label" htmlFor="guests">
					Number of Guests
				</label>
				<input
					type="number"
					value={guests}
					onChange={(e) => setGuests(e.target.value)}
					className="search-input"
					id="guests"
				/>
			</div>
			<button className="search-form-button">
				<img src={searchIcon} alt="search icon" className='search-icon' />
			</button>
		</form>
	);
}

export default SearchBar;
