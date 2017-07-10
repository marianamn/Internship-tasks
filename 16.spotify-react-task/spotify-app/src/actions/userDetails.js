import * as actionTypes from './actionTypes';
import { getUserPlaylists, getUserDetails } from '../services/getUserData'

export const addUserDetails = userDetails => {
    return {
        type: actionTypes.GET_USER_DETAILS,
        userDetails
    };
};

export const clearUserDetails = () => {
    return {
        type: actionTypes.CLEAR_USER_DETAILS
    };
};

export function userDetailsFetchData(user) {
    let token = localStorage.getItem('spotify_token');

    return (dispatch) => {
        let userBaseInfo = getUserDetails(token, user);
        let userPlaylists = getUserPlaylists(token, user);

        Promise.all([userBaseInfo, userPlaylists])
            .then(([baseInfo, playlists]) => {

                let userInfo = {
                    owner: baseInfo.id,
                    imageUrl: baseInfo.images.length !== 0 ? baseInfo.images[0].url : 'http://webmii.com/images/user%20white.png',
                    playlists: playlists.items.map(album => {
                        return {
                            id: album.id,
                            albumName: album.name,
                            imagesUrl: album.images ? (album.images.length !==0 ? album.images[0].url : 'http://orig13.deviantart.net/dff8/f/2011/271/6/9/play_the_video_by_vennerconcept-d46bnt4.png') : 'http://orig13.deviantart.net/dff8/f/2011/271/6/9/play_the_video_by_vennerconcept-d46bnt4.png'
                        }
                    })
                };

                console.log(userInfo);

                dispatch(addUserDetails(userInfo));
            });
    }
}