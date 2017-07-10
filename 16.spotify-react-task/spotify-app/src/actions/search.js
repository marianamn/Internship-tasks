import * as actionTypes from './actionTypes';
import { getSearchedData } from '../services/search';

export const addSearch = searchItems => {
    return {
        type: actionTypes.SEARCH,
        searchItems
    };
};

export const clearSearch = () => {
    return {
        type: actionTypes.CLEAR_SEARCH
    };
};

export function searchedDataFetchData(type, searchParam) {
    let token = localStorage.getItem('spotify_token');

    return (dispatch) => {
        getSearchedData(token, type, searchParam)
            .then(result => {
                let items = [];

                switch (type) {
                    case 'album': items = result.albums.items; break;
                    case 'playlist': items = result.playlists.items; break;
                    case 'artist': items = result.artists.items; break;
                    case 'track': items = result.tracks.items; break;
                    default: items = result;
                }

                dispatch(addSearch(items.map(item => {
                    return {
                        id: item.id,
                        albumName: item.name,
                        imagesUrl: item.images ? (item.images.length !== 0 ? item.images[0].url : 'http://webmii.com/images/user%20white.png') : '',
                        trackId: item.id,
                        trackName: item.name,
                        trackDuration_ms: item.duration_ms,
                        trackArtists: item.album ? item.album.artists : '',
                        owner: item.owner ? item.owner.id : ''
                    }
                })));
            })
            .catch(error => console.log(error));
    }
}