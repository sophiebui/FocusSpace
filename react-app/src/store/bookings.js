const LOAD_BOOKINGS = 'LOAD_BOOKING';
const ADD_BOOKING = 'ADD_BOOKING';

// ACTIONS
export const addOneBooking = (booking) => {
	return {
		type: ADD_BOOKING,
		booking
	};
};

export const loadBookings = (bookings) => {
    return {
        type: LOAD_BOOKINGS,
        bookings
    }
}

export const getBookings = (userId) => async (dispatch) => {
	const response = await fetch(`/api/bookings/${userId}`, {
		headers: {
			'Content-Type': 'application/json'
		}
	})

	const data = await response.json();
	if (response.ok) {
		dispatch(loadBookings(data.bookings));
		return response;
	}
};


// SELECTORS/THUNKS
export const addBooking = (newBooking) => async (dispatch) => {
	const response = await fetch(`/api/bookings/${newBooking.place_id}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(newBooking)
	});
    console.log(response)

	const data = await response.json();
	if (response.ok) {
		dispatch(addOneBooking(data));
	}
	return data;
};

// REDUCER
const bookingsReducer = (state = {}, action) => {
	switch (action.type) {
        case LOAD_BOOKINGS: {
			const newState = {};
			action.bookings.forEach((booking) => {
				newState[booking.id] = booking;
			});
			return newState;
		}
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
