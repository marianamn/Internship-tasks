import * as actionTypes from './actionTypes';
import { getUserPlaylists } from '../services/getUserData';

export const addUserPlaylists = userPlaylists => {
    return {
        type: actionTypes.GET_USER_PLAYLISTS,
        userPlaylists
    };
};

export function userPlaylistsFetchData() {
    let token = localStorage.getItem('spotify_token');
    let user = localStorage.getItem('user');

    return (dispatch) => {
        getUserPlaylists(token, user)
            .then(result => {
                let albums = result.items;
                //console.log(albums);

                dispatch(addUserPlaylists(albums.map(album => {
                    return {
                        id: album.id,
                        albumName: album.name,
                        imagesUrl: album.images.length !== 0 ? album.images[0].url : 'http://orig13.deviantart.net/dff8/f/2011/271/6/9/play_the_video_by_vennerconcept-d46bnt4.png'
                    }
                })));
            })
            .catch(error => console.log(error));
    }
}