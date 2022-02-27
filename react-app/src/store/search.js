const LOAD_SEARCH = 'LOAD_SEARCH';

const loadSearch = (results) => {
    return {
        type: LOAD_SEARCH,
        results
    };
}

    export const getSearchResults = (query) => async (dispatch) => {
        const queryString = Object.keys(query)
            .map(key => `${key}=${query[key]}`)
            .join('&');

        const response = await fetch(`/api/search/${queryString}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(query)
        });

        const results = await response.json();

        if (response.ok) {
            dispatch(loadSearch(results))
        }
        return results
    }

    const searchReducer = (state = {}, action) => {
        switch (action.type) {
            case LOAD_SEARCH: {
                const newState = {};
                action.results.places.forEach((place) => {
                    newState[place.id] = place;
                });
                return newState;
            }
            default:
                return state;
        }
    };

    export default searchReducer;
