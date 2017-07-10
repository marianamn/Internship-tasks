import { urls } from '../common/constants';
import { get, getHeader } from '../common/utils';

export function getArtistBaseInfo(token, id) {
    var headers = getHeader(token);
    var url = urls.artist_info_url + id;

    return get(url, headers);
}

export function getArtistAlbums(token, id) {
    var headers = getHeader(token);
     var url = urls.artist_info_url + id + '/albums?album_type=album&market=BG';

    return get(url, headers);
}
