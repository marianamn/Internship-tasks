(function () {
    'use strict';

    angular
        .module('app')
        .service('githubService', githubService);

    function githubService($http) {
        var client_id = '4baf5db08718ca02f3d8';
        var client_secret = '9b6cae2642a5a9887a22e2cbdc8db141458773e8';
        var baseUrl = 'https://api.github.com';

        this.getIssues = getIssues;
        this.getRepos = getRepos;
        this.getWatchers = getWatchers;
        this.getTotalIssues = getTotalIssues;


        // /issues?page=1&per_page=25&q=+repo:+type:issues+state:open&sort=&order=&client_id=4baf5db08718ca02f3d8&client_secret=9b6cae2642a5a9887a22e2cbdc8db141458773e8
        function getIssues(repoName, params) {
            var filter = 'state:' + params.filterBy;
            var q = 'repo:' + repoName + ' ' + 'type:issues' + ' ' + filter;

            var sortValues = params.sortValue.split(' ');
            var sortCommand = sortValues[0];
            var order = sortValues[1];

            return $http.get(baseUrl + '/search/' + 'issues', {
                params: {
                    client_id: client_id,
                    client_secret: client_secret,
                    page: params.page || 1,
                    per_page: 25,
                    sort: sortCommand,
                    order: order,
                    q: q
                }
            })
                .then(function (result) {
                    return result.data.items;
                });
        }

        // /repositories?page=1&per_page=25&q=+repo:+type:issues+state:open&sort=&order=&client_id=4baf5db08718ca02f3d8&client_secret=9b6cae2642a5a9887a22e2cbdc8db141458773e8
        function getRepos() {
            return $http.get(baseUrl + '/search/' + 'repositories', {
                params: {
                    client_id: client_id,
                    client_secret: client_secret,
                    sort: 'stars',
                    order: 'desc',
                    q: 'language:javascript'
                }
            })
                .then(function (result) {
                    return result.data.items.slice(0, 5);
                });
        }

        // 'https://api.github.com/repos/' + repoName + '?'+ credentials;
        function getWatchers(repoName) {
            return $http.get(baseUrl + '/repos/' + repoName, {
                params: {
                    client_id: client_id,
                    client_secret: client_secret,
                }
            })
        }

        //https://api.github.com/search/issues?q=repo:freeCodeCamp/freeCodeCamp/users/connorcodes/subscriptions
        function getTotalIssues(repoName) {
            return $http.get(baseUrl + '/search/issues', {
                params: {
                    q: 'repo:' + repoName + '/' + repoName + '/users/connorcodes/',
                    client_id: client_id,
                    client_secret: client_secret,
                }
            })
        }
    }
})();
