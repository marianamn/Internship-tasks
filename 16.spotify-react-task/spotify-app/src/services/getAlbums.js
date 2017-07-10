import { urls } from '../common/constants';
import { get, getHeader } from '../common/utils';

export function getFeaturedAlbums(token, country) {
    var headers = getHeader(token);
    var url = urls.featured_albums_url + '?country=' + country + '&offset=0&limit=12';

    return get(url, headers);
}

export function getAlbumDetails(token, id, owner) {
    var headers = getHeader(token);
    var url = urls.album_details_url + owner + '/playlists/' + id;

    return get(url, headers);
}

export function getAlbum(token, id) {
    var headers = getHeader(token);
    var url = urls.album_url + id;

    return get(url, headers);
}

export function getAlbumsByGenres(token) {
    var headers = getHeader(token);
    var url = urls.genres_url;

    return get(url, headers);
}

export function getAlbumsInGenre(token, genre) {
    var headers = getHeader(token);
    var url = urls.genre_albums_url + genre + '/playlists?country=BG&offset=0&limit=12';

    return get(url, headers);
}

export function getNewReleases(token, country) {
    var headers = getHeader(token);
    var url = urls.new_releases_url + '?country=' + country + '&offset=0&limit=12';

    return get(url, headers);
}

export function getNewReleaseDetails(token, id) {
    var headers = getHeader(token);
    var url = urls.new_release_details + id

   return get(url, headers);
}