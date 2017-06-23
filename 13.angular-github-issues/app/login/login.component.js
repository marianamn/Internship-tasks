(function () {
    'use strict';

    angular
        .module('app')
        .component('login', {
            templateUrl: 'app/login/login.component.html',
            controller: Login
        });

    function Login($state) {
        var $ctrl = this;
        $ctrl.login = login;

        function login() {
            var user = {
                name: $ctrl.userName,
                password: $ctrl.password
            }

            localStorage.setItem('user', JSON.stringify(user));

            $state.go('home');
        }
    }
}());