import * as actionTypes from './actionTypes';
import { getAlbumDetails } from '../services/getAlbums';

export const addAlbumDetails = albumDetails => {
    return {
        type: actionTypes.GET_ALBUM_DETAILS,
        albumDetails
    };
};

export const clearAlbumDetails = () => {
    return {
        type: actionTypes.CLEAR_ALBUM_DETAILS
    };
};

export function albumDetailsFetchData(id, owner) {
    let token = localStorage.getItem('spotify_token');

    return (dispatch) => {
        getAlbumDetails(token, id, owner)
            .then(result => {
                dispatch(addAlbumDetails({
                    tracks: result.tracks.items.map((track) => {
                        return {
                            trackId: track.track.id,
                            trackName: track.track.name,
                            trackDuration_ms: track.track.duration_ms,
                            trackArtists: track.track.album.artists
                        }
                    }),
                    coverDetails: {
                        tracksCount: result.tracks.total,
                        description: result.description,
                        name: result.name,
                        imageUrl: result.images.length !== 0 ? result.images[0].url : 'http://orig13.deviantart.net/dff8/f/2011/271/6/9/play_the_video_by_vennerconcept-d46bnt4.png',
                        owner: result.owner.id
                    }
                }));
            })
            .catch(error => {
                console.log(error.response.status);
                window.location.assign('/login');
            });
    }
}