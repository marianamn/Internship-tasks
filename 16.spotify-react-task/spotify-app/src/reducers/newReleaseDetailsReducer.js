import * as actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

const newReleaseDetailsReducer = (state = initialState.newReleaseDetails, action) => {
    switch (action.type) {
        case actionTypes.GET_NEW_RELEASE_DETAILS:
            return action.newReleaseDetails;
        case actionTypes.CLEAR_NEW_RELEASE_DETAILS:
            return initialState.newReleaseDetails;
        default:
            return state;
    }
};

export default newReleaseDetailsReducer;