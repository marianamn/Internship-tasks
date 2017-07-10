import { urls } from '../common/constants';
import { get, getHeader } from '../common/utils';

export function getCurrentUserDetails(token) {
    var headers = getHeader(token);
    var url = urls.current_user_details_url;

    return get(url, headers);
}

export function getUserDetails(token, user) {
    var headers = getHeader(token);
    var url = urls.user_details_url + user;

    return get(url, headers);
}

export function getUserPlaylists(token, user) {
    var headers = getHeader(token);
    var url = urls.user_playlists + user + '/playlists';

    return get(url, headers);
}

export function getUserFollowedArtists(token) {
    var headers = getHeader(token);
    var url = urls.followed_artists;

    return get(url, headers);
}

export function getUserSavedAlbums(token) {
    var headers = getHeader(token);
    var url = urls.user_saved_albums;

    return get(url, headers);
}