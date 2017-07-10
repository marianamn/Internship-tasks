import * as actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

const getAlbumsByGenresReducer = (state = initialState.albumsByGenres, action) => {
    switch (action.type) {
        case actionTypes.GET_ALBUMS_BY_GENRES:
            return action.albumsByGenres;
        default:
            return state;
    }
};

export default getAlbumsByGenresReducer;