const LOAD_PLACES = 'LOAD_PLACES';

// ACTIONS
export const loadPlaces = places => {
    return {
        type: LOAD_PLACES,
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
        default: return state;
    }
}

export default placesReducer
