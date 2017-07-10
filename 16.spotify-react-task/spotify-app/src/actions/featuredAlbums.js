import * as actionTypes from './actionTypes';
import { getFeaturedAlbums } from '../services/getAlbums';

export const addFeaturedAlbums = featuredAlbums => {
    return {
        type: actionTypes.GET_FEATURED_ALBUMS,
        featuredAlbums
    };
};

export function featuredAlbumsFetchData() {
    let token = localStorage.getItem('spotify_token');
    let country = localStorage.getItem('country');

    return (dispatch) => {
        getFeaturedAlbums(token, country)
            .then(result => {
                let featured = result.playlists.items;
                //console.log(featured);

                dispatch(addFeaturedAlbums(featured.map(album => {
                    return {
                        id: album.id,
                        albumName: album.name,
                        imagesUrl: album.images.length !== 0 ? album.images[0].url : 'http://orig13.deviantart.net/dff8/f/2011/271/6/9/play_the_video_by_vennerconcept-d46bnt4.png',
                        owner: album.owner.id,
                        tracksCount: album.tracks.total
                    }
                })));
            })
            .catch((error) => {
                console.log(error);
            });
    }
}