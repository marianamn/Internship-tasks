import * as actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

const followedArtistsReducer = (state = initialState.followedArtists, action) => {
    switch (action.type) {
        case actionTypes.GET_USER_FOLLOWED_ARTISTS:
            return action.followedArtists;
        default:
            return state;
    }
};

export default followedArtistsReducer;