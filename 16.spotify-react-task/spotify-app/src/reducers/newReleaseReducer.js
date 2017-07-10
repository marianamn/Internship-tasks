import * as actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

const newReleaseReducer = (state = initialState.newReleases, action) => {
    switch (action.type) {
        case actionTypes.GET_NEW_RELEASES:
            return action.newReleases;
        default:
            return state;
    }
};

export default newReleaseReducer;