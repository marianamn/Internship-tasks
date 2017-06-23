(function () {
    'use strict';

    angular
        .module('app')
        .component('header', {
            templateUrl: 'app/header/header.component.html',
            controller: Header
        });

    function Header(authenticationService, $state, $scope) {
        var $ctrl = this;
        $ctrl.isAuthenticated = authenticationService.isAuthenticated();
        $ctrl.logout = logout;

        function logout() {
            localStorage.removeItem('user');

            $state.go('login');
        }

        $scope.$on("$stateChangeStart", function() {
            $ctrl.isAuthenticated = authenticationService.isAuthenticated();
        })
    }
}());