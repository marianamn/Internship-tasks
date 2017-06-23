import { credentials } from '../common/const';
import { baseUrl } from '../common/const';
import { itemsPerPage } from '../common/const';

export function getRepos() {
    var q = '?q=language:javascript&sort=stars&order=desc';

    //'https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&' + credentials;
    return fetch(baseUrl + '/search/repositories' + q + credentials)
        .then(response => response.json())
        .then(function (result) {
            return result.items.slice(0, 5);
        })
        .catch(error => error);
}

export function getIssues(params) {
    var paging = '?page=' + (params.page || 1) + '&per_page=' + itemsPerPage;
    var filter = '+state:' + params.filterBy;
    var q = '&q=repo:' + params.name + '+type:issues';
    var sortValues = params.sortValue.split(' ');
    var sort = '&sort=' + sortValues[0] + '&order=' + sortValues[1];

    // https://api.github.com/search/issues?page=1&per_page=25&q=repo:freeCodeCamp%2FfreeCodeCamp+type:issues+state:&sort=
    // &client_id=4baf5db08718ca02f3d8&client_secret=9b6cae2642a5a9887a22e2cbdc8db141458773e8
    return fetch(baseUrl + '/search/issues' + paging + q + filter + sort + credentials)
        .then(response => response.json())
        .then(function (result) {
            return result.items;
        })
        .catch(error => error);
}

export function getWatchers(repoName) {
    // 'https://api.github.com/repos/' + repoName + '?'+ credentials;
    return fetch(baseUrl + '/repos/' + repoName + '?' + credentials)
        .then(response => response.json())
        .then(function (result) {
            return result;
        })
        .catch(error => error);
}

export function getTotalIssues(repoName) {
    let q = 'repo:' + repoName + '/' + repoName + '/users/connorcodes/';
    //https://api.github.com/search/issues?q=repo:freeCodeCamp/freeCodeCamp/users/connorcodes/subscriptions

    return fetch(baseUrl + '/search/issues?q=' + q + '?' + credentials)
        .then(response => response.json())
        .then(function (result) {
            return result;
        })
        .catch(error => error);
}