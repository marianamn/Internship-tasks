(function() {
    'use strict';

    angular
        .module('app')
        .factory('GithubIssueModel', GithubIssueModel);

    function GithubIssueModel() {
        function GithubIssue(config) {
            this.title = config.title;
            this.number = config.number;
            this.comments = config.comments;
            this.state = config.state;
            this.closed_at = config.closed_at;
            this.created_at = config.created_at;
        }

        return GithubIssue;
    }
})();
