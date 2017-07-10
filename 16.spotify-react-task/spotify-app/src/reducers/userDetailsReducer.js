import * as actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

const artistReducer = (state = initialState.userDetails, action) => {
    switch (action.type) {
        case actionTypes.GET_USER_DETAILS:
            return action.userDetails;
        case actionTypes.CLEAR_USER_DETAILS:
            return initialState.userDetails;
        default:
            return state;
    }
};

export default artistReducer;