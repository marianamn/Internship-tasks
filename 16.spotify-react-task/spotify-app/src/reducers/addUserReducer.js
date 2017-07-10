import * as actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

const addUserReducer = (state = initialState.user, action) => {
    switch (action.type) {
        case actionTypes.ADD_USER:
            return action.user;
        default:
            return state;
    }
};

export default addUserReducer;