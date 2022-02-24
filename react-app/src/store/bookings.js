const LOAD_BOOKINGS = 'LOAD_BOOKING';
const ADD_BOOKING = 'ADD_BOOKING';
const DELETE_BOOKING = 'DELETE BOOKING';

// ACTIONS
const addOneBooking = (booking) => {
	return {
		type: ADD_BOOKING,
		booking
	};
};

const loadBookings = (bookings) => {
    return {
        type: LOAD_BOOKINGS,
        bookings
    }
}

const deleteBooking = (booking) => {
	return {
		type: DELETE_BOOKING,
		booking
	};
};


// SELECTORS/THUNKS
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

export const addBooking = (newBooking) => async (dispatch) => {
	const response = await fetch(`/api/bookings/${newBooking.place_id}`, {
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

export const editBooking = booking => async (dispatch) => {
    const response = await fetch(`/api/bookings/${booking.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    })
    const data = await response.json();
    if (response.ok) {
        dispatch(addOneBooking(data));
    }
    return data;
}


export const removeBooking = (payload) => async (dispatch) => {
	const response = await fetch(`/api/bookings/${payload.booking_id}`, {
        method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
		Accept: 'application/json',
		body: JSON.stringify(payload)
	});

	const data = await response.json();
	if (response.ok) {
		dispatch(deleteBooking(data));
		return null;
	} else {
		return response;
	}
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
        case DELETE_BOOKING: {
			const newState = Object.assign({}, state);
			delete newState[action.booking.id];
			return newState;
		}
		default:
			return state;
	}
};

export default bookingsReducer;
