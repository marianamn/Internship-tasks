import * as actionTypes from './actionTypes';
import { getArtistBaseInfo, getArtistAlbums } from '../services/getArtist';

export const addArtist = artist => {
    return {
        type: actionTypes.GET_ARTIST,
        artist
    };
};

export const clearArtist = () => {
    return {
        type: actionTypes.CLEAR_ARTIST
    };
};

export function artistFetchData(id) {
    let token = localStorage.getItem('spotify_token');

    return (dispatch) => {
        let artistBaseInfo = getArtistBaseInfo(token, id);
        let artistAlbums = getArtistAlbums(token, id);

        Promise.all([artistBaseInfo, artistAlbums])
            .then(([baseInfo, albums]) => {
                let artistInfo = {
                    name: baseInfo.name,
                    followers: baseInfo.followers.total,
                    imageUrl: baseInfo.images.length !== 0 ? baseInfo.images[0].url : 'http://orig13.deviantart.net/dff8/f/2011/271/6/9/play_the_video_by_vennerconcept-d46bnt4.png',
                    albums: albums.items.map(album => {
                        return {
                            id: album.id,
                            albumName: album.name,
                            imagesUrl: album.images[1].url
                        }
                    })
                };

                dispatch(addArtist(artistInfo));
            });
    }
}