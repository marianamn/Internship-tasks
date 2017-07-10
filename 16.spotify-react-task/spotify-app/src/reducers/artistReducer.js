import * as actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

const artistReducer = (state = initialState.artist, action) => {
    switch (action.type) {
        case actionTypes.GET_ARTIST:
            return action.artist;
        case actionTypes.CLEAR_ARTIST:
            return initialState.artist;
        default:
            return state;
    }
};

export default artistReducer;