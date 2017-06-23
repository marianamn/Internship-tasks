(function () {
    'use strict';

    // Module definition
    angular.module('app', ['ui.router']);

    // When the DOM is ready...
    angular.element(document).ready(function () {

        // ... kickstart everything
        angular.bootstrap(document, ['app']);
    });
})();
