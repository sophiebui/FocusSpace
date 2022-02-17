const LOAD_PLACES = 'LOAD_PLACES';
const ADD_PLACE = 'ADD_PLACE'

// ACTIONS
export const loadPlaces = places => {
    return {
        type: LOAD_PLACES,
        places,
    }
};

export const addOnePlace = places => {
    return {
        type: ADD_PLACE,
        places,
    }
};

// SELECTORS/THUNKS
export const getPlaces = () => async (dispatch) => {
    const res = await fetch('/api/places/');
    const data = await res.json();
    console.log('this is data', data)
    if (res.ok) {
        dispatch(loadPlaces(data.places));
        return res;
    }
}

export const getOnePlace = (id) => async (dispatch) => {
    const response = await fetch(`/api/places/${id}`, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    const place = await response.json();
    if (response.ok) {
        dispatch(addOnePlace(place));
    }
    return place;
}


// REDUCER
const placesReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_PLACES: {
            const newState = {};
            action.places.forEach((place) => {
                newState[place.id] = place;
            });
            return newState
        }
        case ADD_PLACE: {
            const newPlace = { ...state };
            console.log('newPlace', newPlace)
            console.log(action)
            newPlace[action.places.id] = action.places
            return newPlace
        }
        default: return state;
    }
}

export default placesReducer
