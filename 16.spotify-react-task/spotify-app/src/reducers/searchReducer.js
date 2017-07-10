import * as actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

const searchInAlbumsReducer = (state = initialState.searchItems, action) => {
    switch (action.type) {
        case actionTypes.SEARCH:
            return action.searchItems;
        case actionTypes.CLEAR_SEARCH:
            return initialState.searchItems;
        default:
            return state;
    }
};

export default searchInAlbumsReducer;