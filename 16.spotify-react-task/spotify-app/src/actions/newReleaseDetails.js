import * as actionTypes from './actionTypes';
import { getNewReleaseDetails } from '../services/getAlbums';

export const addNewReleaseDetails = newReleaseDetails => {
    return {
        type: actionTypes.GET_NEW_RELEASE_DETAILS,
        newReleaseDetails
    };
};

export const clearNewReleaseDetails = () => {
    return {
        type: actionTypes.CLEAR_NEW_RELEASE_DETAILS
    };
};

export function newReleaseDerailsAlbumsFetchData(id) {
    let token = localStorage.getItem('spotify_token');

    return (dispatch) => {
        getNewReleaseDetails(token, id)
            .then(result => {

                dispatch(addNewReleaseDetails({
                    tracks: result.tracks.items.map((track) => {
                        return {
                            trackId: track.id,
                            trackName: track.name,
                            trackDuration_ms: track.duration_ms,
                            trackArtists: track.artists
                        }
                    }),
                    coverDetails: {
                        tracksCount: result.tracks.items.length,
                        description: result.description || '',
                        name: result.name,
                        imageUrl: result.images.length !== 0 ? result.images[0].url : 'http://orig13.deviantart.net/dff8/f/2011/271/6/9/play_the_video_by_vennerconcept-d46bnt4.png',
                        artists: result.artists,
                    },
                    copyrights: result.copyrights
                }));
            })
            .catch(error => console.log(error));
    }
}