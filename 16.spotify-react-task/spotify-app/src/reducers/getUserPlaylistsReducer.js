import * as actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

const userPlaylistsReducer = (state = initialState.userPlaylists, action) => {
    switch (action.type) {
        case actionTypes.GET_USER_PLAYLISTS:
            return action.userPlaylists;
        default:
            return state;
    }
};

export default userPlaylistsReducer;