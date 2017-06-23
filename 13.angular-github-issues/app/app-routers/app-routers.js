(function () {
    'use strict';

    angular
        .module('app')
        .config(config)
        .run(loggedIn);

    function loggedIn($rootScope, authenticationService, $state) {
        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            if (toState.authenticate && !authenticationService.isAuthenticated()) {
                $state.go("login");
                event.preventDefault();
            }
        });
    }

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('header', {
                template: '<header></header>',
                abstract: true
            })
            .state('home', {
                url: '/home',
                template: '<div><h1>Welcome to GutHub issues!</h1></div>'
            })
            .state('issues', {
                url: '/issues',
                template: '<github-app></github-app>',
                authenticate: true
            })
            .state('login', {
                url: '/login',
                template: '<login></login>'
            });

        $urlRouterProvider.otherwise('/home');
    }
})();