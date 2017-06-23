(function () {
    'use strict';

    angular
        .module('app')
        .component('relativeTime', {
            templateUrl: 'app/relative-time/relative-time.component.html',
            bindings: {
                time: '<'
            },
            controller: GetRelativeTime
        });

    function GetRelativeTime(relativeTimeService) {
        this.formatedDate = null;
        this.getTime = getTime;

        this.$onInit = function(){
            this.formatedDate = getTime(this.time);
        }
        
        function getTime(time){
            let date = new Date(time);
            return relativeTimeService.getTimeDifference(date);
        }
    }
})();
