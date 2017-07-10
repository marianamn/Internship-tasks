import * as actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

const getAlbumsInGenreReducer = (state = initialState.albumsInGenre, action) => {
    switch (action.type) {
        case actionTypes.GET_ALBUMS_IN_GENRE:
            return action.albumsInGenre;
        default:
            return state;
    }
};

export default getAlbumsInGenreReducer;