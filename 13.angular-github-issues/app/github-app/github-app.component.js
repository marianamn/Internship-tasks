(function () {
    'use strict';

    angular
        .module('app')
        .component('githubApp', {
            templateUrl: 'app/github-app/github-app.component.html',
            controller: GithubApp
        });

    function GithubApp(githubService) {
        var $ctrl = this;

        $ctrl.issues = [];
        $ctrl.repos = [];
        $ctrl.selectedRepo = null;
        $ctrl.isDisabled = false;
        $ctrl.page = 1;

        $ctrl.changeRepo = changeRepo;
        $ctrl.filterIssues = filterIssues;
        $ctrl.sortIssues = sortIssues;
        $ctrl.loadMoreIssues = loadMoreIssues;

        $ctrl.$onInit = $onInit;

        function $onInit() {
            githubService.getRepos()
                .then(function (repos) {
                    $ctrl.repos = repos;
                    $ctrl.selectedRepo = $ctrl.repos[0];

                    getWatchersAndIssuesStatistic($ctrl.selectedRepo.full_name);

                    _getIssues();
                })
        }

        function changeRepo(repo) {
            $ctrl.selectedRepo = repo;

            getWatchersAndIssuesStatistic($ctrl.selectedRepo.full_name);

            $ctrl.page = 1;
            $ctrl.issues = [];
            $ctrl.selectedFilter = '';
            $ctrl.selectedSort = '';

            _getIssues();
        }

        function getWatchersAndIssuesStatistic(repoName) {
            githubService.getWatchers(repoName)
                .then(function (result) {
                    $ctrl.selectedRepo.watch = result.data.subscribers_count;
                })

            githubService.getTotalIssues(repoName)
                .then(function (result) {
                    $ctrl.selectedRepo.totalIssues = result.data.total_count;
                    $ctrl.selectedRepo.closed = $ctrl.selectedRepo.totalIssues - $ctrl.selectedRepo.open_issues;
                })
        }

        function filterIssues(selectedFilter) {
            console.log('Filter the selected repo by', selectedFilter);

            $ctrl.selectedFilter = selectedFilter;
            $ctrl.issues = [];
            $ctrl.page = 1;
            _getIssues($ctrl.selectedFilter, $ctrl.selectedSort);
        }

        function sortIssues(selectedSort) {
            console.log('Sort the selected repo by', selectedSort);

            $ctrl.selectedSort = selectedSort;
            $ctrl.issues = [];
            $ctrl.page = 1;
            _getIssues($ctrl.selectedFilter, $ctrl.selectedSort);
        }

        function loadMoreIssues() {
            $ctrl.page++;

            _getIssues();
        }

        function _getIssues() {
            $ctrl.isDisabled = true;
            var params = {
                page: $ctrl.page, 
                filterBy: $ctrl.selectedFilter || '', 
                sortValue: $ctrl.selectedSort || ''
            }

            return githubService.getIssues($ctrl.selectedRepo.full_name, params)
                .then(function (issues) {
                    $ctrl.issues = $ctrl.issues.concat(issues);
                })
                .finally(function () {
                    $ctrl.isDisabled = false;
                });
        }
    }
})();
