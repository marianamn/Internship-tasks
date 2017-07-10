import * as actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

const getAlbumDetailsReducer = (state = initialState.albumDetails, action) => {
    switch (action.type) {
        case actionTypes.GET_ALBUM_DETAILS:
            return action.albumDetails;
        case actionTypes.CLEAR_ALBUM_DETAILS:
            return initialState.albumDetails;
        default:
            return state;
    }
};

export default getAlbumDetailsReducer;