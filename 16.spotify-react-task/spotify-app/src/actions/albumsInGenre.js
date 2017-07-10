import * as actionTypes from './actionTypes';
import { getAlbumsInGenre } from '../services/getAlbums';

export const addAlbumsInGenre = albumsInGenre => {
    return {
        type: actionTypes.GET_ALBUMS_IN_GENRE,
        albumsInGenre
    };
};

export function albumsInGenreFetchData(genre) {
    let token = localStorage.getItem('spotify_token');

    return (dispatch) => {
        getAlbumsInGenre(token, genre)
            .then(result => {
                let albums = result.playlists.items;
                //console.log(albums);

                dispatch(addAlbumsInGenre(albums.map(album => {
                    return {
                        id: album.id,
                        albumName: album.name,
                        imagesUrl: album.images.length !== 0 ? album.images[0].url : 'http://orig13.deviantart.net/dff8/f/2011/271/6/9/play_the_video_by_vennerconcept-d46bnt4.png',
                        owner: album.owner.id
                    }
                })));
            })
            .catch(error => console.log(error));
    }
}