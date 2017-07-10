import * as actionTypes from './actionTypes';
import { getNewReleases } from '../services/getAlbums';

export const addNewReleasesAlbums = newReleases => {
    return {
        type: actionTypes.GET_NEW_RELEASES,
        newReleases
    };
};

export function newReleasesAlbumsFetchData() {
    let token = localStorage.getItem('spotify_token');
    let country = localStorage.getItem('country');

    return (dispatch) => {
        getNewReleases(token, country)
            .then(result => {
                let albums = result.albums.items;
                //console.log(albums);

                dispatch(addNewReleasesAlbums(albums.map(album => {
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