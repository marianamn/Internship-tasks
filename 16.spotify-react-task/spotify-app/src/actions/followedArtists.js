import * as actionTypes from './actionTypes';
import { getUserFollowedArtists } from '../services/getUserData';

export const addUserFollowedArtists = followedArtists => {
    return {
        type: actionTypes.GET_USER_FOLLOWED_ARTISTS,
        followedArtists
    };
};

export function followedArtistsFetchData() {
    let token = localStorage.getItem('spotify_token');

    return (dispatch) => {
        getUserFollowedArtists(token)
            .then(result => {
                let artists = result.artists.items;
                
                dispatch(addUserFollowedArtists(artists.map(artist => {
                    return {
                        id: artist.id,
                        albumName: artist.name,
                        imagesUrl: artist.images.length !== 0 ? artist.images[0].url : 'http://orig13.deviantart.net/dff8/f/2011/271/6/9/play_the_video_by_vennerconcept-d46bnt4.png',
                    }
                })));
            })
            .catch(error => console.log(error));
    }
}