import * as actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

const userAlbumsReducer = (state = initialState.userAlbums, action) => {
    switch (action.type) {
        case actionTypes.GET_USER_SAVED_ALBUMS:
            return action.userAlbums;
        default:
            return state;
    }
};

export default userAlbumsReducer;