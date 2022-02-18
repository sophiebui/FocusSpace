const ADD_BOOKING = 'ADD_BOOKING';

// ACTIONS
export const addOneBooking = (booking) => {
	return {
		type: ADD_BOOKING,
		booking
	};
};

// SELECTORS/THUNKS
export const addBooking = (newBooking) => async (dispatch) => {
	const response = await fetch(`/api/bookings/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(newBooking)
	});

	const data = await response.json();
	if (response.ok) {
		dispatch(addOneBooking(data));
	}
	return data;
};

// REDUCER
const bookingsReducer = (state = {}, action) => {
	switch (action.type) {
		case ADD_BOOKING: {
			const newBooking = { ...state };
			newBooking[action.booking.id] = action.booking;
			return newBooking;
		}
		default:
			return state;
	}
};

export default bookingsReducer;
