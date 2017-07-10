import * as actionTypes from './actionTypes';
import { getAlbumsByGenres } from '../services/getAlbums';

export const addAlbumsByGenres = albumsByGenres => {
    return {
        type: actionTypes.GET_ALBUMS_BY_GENRES,
        albumsByGenres
    };
};

export function albumsByGenresFetchData() {
    let token = localStorage.getItem('spotify_token');

    return (dispatch) => {
        getAlbumsByGenres(token)
            .then(result => {
                let categories = result.categories.items.slice(1);
                //console.log(categories);
                dispatch(addAlbumsByGenres(categories.map(album => {
                    return {
                        id: album.id,
                        albumName: album.name,
                        imagesUrl: album.icons.length !==0 ? album.icons[0].url : 'http://orig13.deviantart.net/dff8/f/2011/271/6/9/play_the_video_by_vennerconcept-d46bnt4.png'
                    }
                })));
            })
            .catch(error => console.log(error));
    }
}