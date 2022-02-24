const LOAD_PLACES = 'LOAD_PLACES';
const ADD_PLACE = 'ADD_PLACE';
const DELETE_PLACE = 'DELETE_PLACE';
const LOAD_SEARCH = "LOAD_SEARCH";
const DELETE_IMAGE = 'DELETE_IMAGE'

// ACTIONS
const loadPlaces = (places) => {
	return {
		type: LOAD_PLACES,
		places
	};
};

const addOnePlace = (place) => {
	return {
		type: ADD_PLACE,
		place
	};
};

const deletePlace = (place) => {
	return {
		type: DELETE_PLACE,
		place
	};
};

const loadSearch = (results) => {
    return {
        type: LOAD_SEARCH,
        results
    };
};

const deleteImage = (image) => {
	return {
		type: DELETE_IMAGE,
		image
	};
};


// SELECTORS/THUNKS
export const getPlaces = () => async (dispatch) => {
	const res = await fetch('/api/places/');
	const data = await res.json();

	if (res.ok) {
		dispatch(loadPlaces(data.places));
		return res;
	}
};

export const getOnePlace = (id) => async (dispatch) => {
    const response = await fetch(`/api/places/${id}`, {
        headers: {
            'Content-Type': 'application/json',
		}
	});

	const place = await response.json();
	if (response.ok) {
        dispatch(addOnePlace(place));
	}
	return place;
};

export const addPlace = (newPlace) => async (dispatch) => {
    const response = await fetch(`/api/places/`, {
        method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(newPlace)
	});
	const data = await response.json();
	if (response.ok) {
		dispatch(addOnePlace(data));
	}
	return data;
};

export const editPlace = place => async (dispatch) => {
    const response = await fetch(`/api/places/${place.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(place)
    })

    const data = await response.json();
    if (response.ok) {
        dispatch(addOnePlace(data));
    }
    return data;
}

export const removePlace = (payload) => async (dispatch) => {
	const response = await fetch(`/api/places/${payload.place_id}`, {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
		Accept: 'application/json',
		body: JSON.stringify(payload)
	});

	const data = await response.json();
	if (response.ok) {
		dispatch(deletePlace(data));
		return null;
	} else {
		return response;
	}
};

export const getSearchResults = (query) => async (dispatch) => {
    const response = await fetch(`/api/places/search/${query}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query)
    });
    const results = await response.json();

    if (response.ok) {
        dispatch(loadSearch(results))
    }
    return results
}


export const removeImage = (image) => async (dispatch) => {
	const response = await fetch(`/api/places/image/${image.id}`, {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
		Accept: 'application/json',
		body: JSON.stringify(image)
	});

	const data = await response.json();
	if (response.ok) {
		return null;
	} else {
		return response;
	}
};

// REDUCER
const placesReducer = (state = {}, action) => {
	switch (action.type) {
		case LOAD_PLACES: {
			const newState = {};
            console.log(newState)
			action.places.forEach((place) => {
				newState[place.id] = place;
			});
			return newState;
		}
		case ADD_PLACE: {
			const newPlace = { ...state };
			newPlace[action.place.id] = action.place;
			return newPlace;
		}
		case DELETE_PLACE: {
			const newState = Object.assign({}, state);
			delete newState[action.place.id];
			return newState;
		}

		default:
			return state;
	}
};

export default placesReducer;
