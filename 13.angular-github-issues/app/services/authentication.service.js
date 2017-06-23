(function () {
    'use strict';

    angular
        .module('app')
        .service('authenticationService', authenticationService);

    function authenticationService() {
        this.isAuthenticated = isAuthenticated;

        function isAuthenticated() {
            if (localStorage.getItem('user') !== null) {
                return true;
            } else {
                return false;
            }
        }
    }
}());