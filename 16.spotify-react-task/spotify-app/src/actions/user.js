import * as actionTypes from './actionTypes';
import { getCurrentUserDetails } from '../services/getUserData'

export const addUser = user => {
    return {
        type: actionTypes.ADD_USER,
        user
    };
};

export function userFetchData(token){
    return (dispatch) => {
        getCurrentUserDetails(token)
        .then(user => {

             dispatch(addUser({
                 userName: user.id,
                 images: user.images,
                 country: user.country
             }));

             localStorage.setItem('user', user.id);
             localStorage.setItem('country', user.country);
        })
        .catch(error => console.log(error));
    }
}