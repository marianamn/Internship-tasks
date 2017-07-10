import { urls } from '../common/constants';
import { get, getHeader } from '../common/utils';

export function getSearchedData(token, type, searchParam) {
    var headers = getHeader(token);
    var url = urls.search_in_albums_url + '?q=' + searchParam + '&type=' + type + '&market=BG';

     return get(url, headers);
}