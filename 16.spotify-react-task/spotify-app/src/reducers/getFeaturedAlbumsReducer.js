import * as actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

const getFeaturedAlbumsReducer = (state = initialState.featuredAlbums, action) => {
    switch (action.type) {
        case actionTypes.GET_FEATURED_ALBUMS:
            return action.featuredAlbums;
        default:
            return state;
    }
};

export default getFeaturedAlbumsReducer;