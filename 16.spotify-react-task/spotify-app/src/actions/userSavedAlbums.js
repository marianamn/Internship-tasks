import * as actionTypes from './actionTypes';
import { getUserSavedAlbums } from '../services/getUserData';

export const addUserSavedAlbums = userAlbums => {
    return {
        type: actionTypes.GET_USER_SAVED_ALBUMS,
        userAlbums
    };
};

export function userAlbumsFetchData() {
    let token = localStorage.getItem('spotify_token');

    return (dispatch) => {
        getUserSavedAlbums(token)
            .then(result => {
                let albums = result.items;

                dispatch(addUserSavedAlbums(albums.map(album => {
                    return {
                        id: album.album.id,
                        albumName: album.album.name,
                        imagesUrl: album.album.images.length !== 0 ? album.album.images[0].url : 'http://orig13.deviantart.net/dff8/f/2011/271/6/9/play_the_video_by_vennerconcept-d46bnt4.png'
                    }
                })));
            })
            .catch(error => console.log(error));
    }
}